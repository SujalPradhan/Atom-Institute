import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { timingSafeEqual, createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import type { Store } from "./storage.js";

const CLASS_BOARDS = [
  "10-CBSE", "10-ICSE", "10-MADHYAMIK",
  "11-CBSE", "11-ICSE", "11-MADHYAMIK",
  "12-CBSE", "12-ICSE", "12-MADHYAMIK",
] as const;

interface Question { id: string; text: string; options: string[]; answer: number }
interface TestDoc { code: string; title: string; classBoard?: string; questions: Question[] }
interface Attempt { name: string; classBoard: string; answers: number[]; score: number; total: number; submittedAt: string }

const bodySchema = z.object({
  name: z.string().trim().min(1).max(60),
  classBoard: z.enum(CLASS_BOARDS),
  answers: z.array(z.number().int()),
});

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

const FAIL_LIMIT = 10;
const FAIL_WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; since: number }>();

function clientIp(c: Context) {
  return c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isLocked(ip: string) {
  const f = failures.get(ip);
  if (!f) return false;
  if (Date.now() - f.since > FAIL_WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return f.count >= FAIL_LIMIT;
}

function recordFailure(ip: string) {
  const f = failures.get(ip);
  if (!f || Date.now() - f.since > FAIL_WINDOW_MS) failures.set(ip, { count: 1, since: Date.now() });
  else f.count += 1;
}

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30) || "anon";
}

export function createApp(store: Store) {
  const app = new Hono();

  const origins = [
    "http://localhost:3000",
    ...(process.env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  ];
  app.use("*", cors({
    origin: (o) => (origins.includes(o) ? o : null),
    allowHeaders: ["content-type", "x-teacher-key"],
    allowMethods: ["GET", "POST", "OPTIONS"],
  }));
  app.use("*", bodyLimit({
    maxSize: 16 * 1024,
    onError: (c) => c.json({ error: "payload_too_large" }, 413),
  }));

  const health = (c: Context) => c.json({ ok: true });
  app.get("/healthz", health);
  app.get("/health", health);

  const loadTest = async (raw: string): Promise<TestDoc | null> => {
    const code = raw.toUpperCase();
    if (!/^[A-Z0-9]{4,12}$/.test(code)) return null;
    const data = await store.read(`tests/${code}.json`);
    return data ? (JSON.parse(data) as TestDoc) : null;
  };

  app.get("/tests/:code", async (c) => {
    const test = await loadTest(c.req.param("code"));
    if (!test) return c.json({ error: "not_found" }, 404);
    return c.json({
      code: test.code,
      title: test.title,
      questions: test.questions.map((q) => ({ id: q.id, text: q.text, options: q.options })),
    });
  });

  app.post("/tests/:code/attempts", async (c) => {
    const test = await loadTest(c.req.param("code"));
    if (!test) return c.json({ error: "not_found" }, 404);

    let json: unknown;
    try {
      json = await c.req.json();
    } catch {
      return c.json({ error: "invalid", details: "malformed JSON" }, 400);
    }
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) return c.json({ error: "invalid", details: parsed.error.flatten() }, 400);
    const { name, classBoard, answers } = parsed.data;

    const qs = test.questions;
    if (answers.length !== qs.length) {
      return c.json({ error: "invalid", details: `answers must have length ${qs.length}` }, 400);
    }
    const bad = answers.findIndex((a, i) => a !== -1 && (a < 0 || a >= qs[i].options.length));
    if (bad !== -1) {
      return c.json({ error: "invalid", details: `answers[${bad}] out of range` }, 400);
    }

    const results = qs.map((q, i) => ({ id: q.id, correct: answers[i] === q.answer, correctIndex: q.answer }));
    const score = results.filter((r) => r.correct).length;
    const submittedAt = new Date().toISOString();
    const attempt: Attempt = { name, classBoard, answers, score, total: qs.length, submittedAt };
    const key = `attempts/${test.code}/${submittedAt}-${slug(name)}-${randomBytes(3).toString("hex")}.json`;
    await store.write(key, JSON.stringify(attempt));
    return c.json({ score, total: qs.length, results });
  });

  app.get("/tests/:code/attempts", async (c) => {
    const ip = clientIp(c);
    if (isLocked(ip)) return c.json({ error: "too_many_attempts" }, 429);
    const expected = process.env.TEACHER_KEY;
    const provided = c.req.header("x-teacher-key");
    if (!expected || !provided || !safeEqual(provided, expected)) {
      recordFailure(ip);
      return c.json({ error: "unauthorized" }, 401);
    }
    failures.delete(ip);
    const test = await loadTest(c.req.param("code"));
    if (!test) return c.json({ error: "not_found" }, 404);

    const keys = await store.list(`attempts/${test.code}/`);
    const docs = await Promise.all(keys.map((k) => store.read(k)));
    const attempts = docs
      .filter((d): d is string => d !== null)
      .map((d) => JSON.parse(d) as Attempt)
      .map(({ name, classBoard, score, total, submittedAt }) => ({ name, classBoard, score, total, submittedAt }))
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    return c.json({ code: test.code, title: test.title, attempts });
  });

  app.notFound((c) => c.json({ error: "not_found" }, 404));
  app.onError((err, c) => {
    console.error(err);
    return c.json({ error: "internal" }, 500);
  });

  return app;
}
