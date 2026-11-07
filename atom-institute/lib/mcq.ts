import { boards, classes } from "@/lib/data"

export interface McqQuestion {
  id: string
  text: string
  options: string[]
}

export interface McqTest {
  code: string
  title: string
  questions: McqQuestion[]
}

export interface McqResult {
  id: string
  correct: boolean
  correctIndex: number
}

export interface McqScore {
  score: number
  total: number
  results: McqResult[]
}

export interface McqAttempt {
  name: string
  classBoard: string
  score: number
  total: number
  submittedAt: string
}

export interface McqAttempts {
  code: string
  title: string
  attempts: McqAttempt[]
}

export type McqApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string }

export const classBoardOptions = classes.flatMap((c) =>
  boards.map((b) => ({
    value: `${c.classNumber}-${b.toUpperCase()}`,
    label: `Class ${c.classNumber} · ${b}`,
  })),
)

export function classBoardValue(classNumber: number, board: string): string {
  return `${classNumber}-${board.toUpperCase()}`
}

export function classBoardLabel(value: string): string {
  return classBoardOptions.find((o) => o.value === value)?.label ?? value
}

async function request<T>(path: string, init?: RequestInit): Promise<McqApiResult<T>> {
  const res = await fetch(`/api/mcq${path}`, { cache: "no-store", ...init })
  let body: unknown = null
  try {
    body = await res.json()
  } catch {
    body = null
  }
  if (res.ok) return { ok: true, data: body as T }
  const error =
    body && typeof body === "object" && "error" in body ? String((body as { error: unknown }).error) : "error"
  return { ok: false, status: res.status, error }
}

export function getTest(code: string) {
  return request<McqTest>(`/tests/${encodeURIComponent(code)}`)
}

export function submitAttempt(code: string, payload: { name: string; classBoard: string; answers: number[] }) {
  return request<McqScore>(`/tests/${encodeURIComponent(code)}/attempts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export function getAttempts(code: string, password: string) {
  return request<McqAttempts>(`/tests/${encodeURIComponent(code)}/attempts`, {
    headers: { "x-teacher-key": password },
  })
}
