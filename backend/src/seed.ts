import { promises as fs } from "node:fs";
import path from "node:path";
import { createStore } from "./storage.js";

const dir = path.resolve(process.cwd(), "seed");
const store = createStore();
for (const f of (await fs.readdir(dir)).filter((n) => n.endsWith(".json"))) {
  const data = await fs.readFile(path.join(dir, f), "utf8");
  JSON.parse(data);
  await store.write(`tests/${f}`, data);
  console.log(`seeded tests/${f}`);
}
