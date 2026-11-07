"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Check, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { classBoardOptions, getTest, submitAttempt, type McqScore, type McqTest } from "@/lib/mcq"

const STORAGE_KEY = "atom-mcq-student"
const fieldClass = "field"

export default function TestsContent() {
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  const [classBoard, setClassBoard] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [test, setTest] = useState<McqTest | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [current, setCurrent] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<McqScore | null>(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null")
      if (saved && typeof saved === "object") {
        if (typeof saved.name === "string") setName(saved.name)
        if (typeof saved.classBoard === "string") setClassBoard(saved.classBoard)
      }
    } catch {}
  }, [])

  useEffect(() => {
    const prefill = searchParams.get("code")
    if (prefill) setCode(prefill.toUpperCase())
  }, [searchParams])

  async function start(e: React.FormEvent) {
    e.preventDefault()
    setFormError("")
    setLoading(true)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: name.trim(), classBoard }))
    } catch {}
    try {
      const res = await getTest(code.trim())
      if (res.ok) {
        setTest(res.data)
        setAnswers(res.data.questions.map(() => -1))
        setCurrent(0)
      } else if (res.status === 404) {
        setFormError("No test found for that code.")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch {
      toast.error("Could not reach the server. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  async function submit() {
    if (!test) return
    const unanswered = answers.filter((a) => a === -1).length
    if (unanswered > 0 && !window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return
    setSubmitting(true)
    try {
      const res = await submitAttempt(test.code, { name: name.trim(), classBoard, answers })
      if (res.ok) setResult(res.data)
      else toast.error(res.status === 400 ? "Could not submit. Check your details." : "Something went wrong. Please try again.")
    } catch {
      toast.error("Could not reach the server. Check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setTest(null)
    setResult(null)
    setAnswers([])
    setCurrent(0)
    setCode("")
    setFormError("")
  }

  return (
    <main className="page max-w-2xl">
      <div>
        <div className="mb-8 flex flex-col items-center space-y-3 text-center">
          <h1 className="page-title">MCQ Test</h1>
          {!test && <p className="page-lead">Enter your details and test code to begin</p>}
        </div>

        {!test && (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={start} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="field-label">
                    Name
                  </label>
                  <input
                    id="name"
                    className={fieldClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={60}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="classBoard" className="field-label">
                    Class &amp; board
                  </label>
                  <select
                    id="classBoard"
                    className={fieldClass}
                    value={classBoard}
                    onChange={(e) => setClassBoard(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select class and board
                    </option>
                    {classBoardOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="code" className="field-label">
                    Test code
                  </label>
                  <input
                    id="code"
                    className={`${fieldClass} uppercase`}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                    autoCapitalize="characters"
                    autoComplete="off"
                  />
                  {formError && (
                    <p role="alert" className="text-sm font-medium text-danger-foreground">
                      {formError}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading || !name.trim() || !classBoard || !code.trim()}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Loading" : "Start test"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">Don&apos;t have a code? Ask Mr. Arpan Pradhan.</p>
              </form>
            </CardContent>
          </Card>
        )}

        {test && !result && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{test.title}</p>
                <p className="field-label" aria-live="polite">
                  Question {current + 1} of {test.questions.length}
                </p>
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{test.questions[current].text}</h2>
              <div className="space-y-3" role="radiogroup" aria-label="Options">
                {test.questions[current].options.map((opt, i) => {
                  const selected = answers[current] === i
                  return (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      disabled={submitting}
                      onClick={() => setAnswers((a) => a.map((v, idx) => (idx === current ? i : v)))}
                      className={`min-h-12 w-full rounded-xl border p-3.5 text-left text-sm transition-colors disabled:opacity-50 ${
                        selected
                          ? "border-primary bg-accent font-medium text-accent-foreground ring-2 ring-primary/50"
                          : "border-input bg-card/60 text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              <div className="flex justify-between gap-3">
                <Button variant="outline" disabled={current === 0 || submitting} onClick={() => setCurrent((c) => c - 1)}>
                  Previous
                </Button>
                {current < test.questions.length - 1 ? (
                  <Button onClick={() => setCurrent((c) => c + 1)} disabled={submitting}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={submit} disabled={submitting}>
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? "Submitting" : "Submit"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {test && result && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">{test.title}</p>
                <p className="text-5xl font-semibold tracking-tight text-link">
                  {result.score} / {result.total}
                </p>
                <p className="text-muted-foreground">Your score</p>
              </CardContent>
            </Card>
            <ol className="space-y-4">
              {test.questions.map((q, qi) => {
                const r = result.results.find((x) => x.id === q.id)
                const chosen = answers[qi]
                const correct = r?.correct ?? false
                return (
                  <li key={q.id}>
                    <Card>
                      <CardContent className="p-4 space-y-3">
                        <p className="font-medium text-foreground">
                          {qi + 1}. {q.text}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt, oi) => {
                            const isCorrect = r?.correctIndex === oi
                            const isWrongChoice = chosen === oi && !correct
                            const style = isCorrect
                              ? "border-success-border bg-success text-success-foreground"
                              : isWrongChoice
                                ? "border-danger-border bg-danger text-danger-foreground"
                                : "border-foreground/10 text-foreground"
                            return (
                              <div key={oi} className={`flex items-start gap-2 rounded-xl border p-2.5 text-sm ${style}`}>
                                {isCorrect ? (
                                  <Check className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                                ) : isWrongChoice ? (
                                  <X className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                                ) : (
                                  <span className="w-4 shrink-0" />
                                )}
                                <span>
                                  {opt}
                                  {chosen === oi && <span className="ml-2 font-medium">(Your answer)</span>}
                                  {isCorrect && <span className="sr-only"> Correct answer</span>}
                                </span>
                              </div>
                            )
                          })}
                          {chosen === -1 && <p className="text-sm text-muted-foreground">Not answered</p>}
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                )
              })}
            </ol>
            <Button className="w-full" onClick={reset}>
              Take another test
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
