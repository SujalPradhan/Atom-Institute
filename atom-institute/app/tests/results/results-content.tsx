"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { classBoardLabel, getAttempts, type McqAttempts } from "@/lib/mcq"

const fieldClass = "field"

export default function ResultsContent() {
  const [code, setCode] = useState("")
  const [key, setKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<McqAttempts | null>(null)

  async function load(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setData(null)
    setLoading(true)
    try {
      const res = await getAttempts(code.trim(), key)
      if (res.ok) setData(res.data)
      else if (res.status === 401) setError("Wrong teacher key.")
      else if (res.status === 404) setError("No test found.")
      else toast.error("Something went wrong. Please try again.")
    } catch {
      toast.error("Could not reach the server. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page max-w-3xl">
      <div>
        <div className="mb-8 flex flex-col items-center space-y-3 text-center">
          <h1 className="page-title">Test Results</h1>
          <p className="page-lead">Enter the test code and teacher key to view attempts</p>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-6">
            <form onSubmit={load} className="space-y-4">
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
              </div>
              <div className="space-y-2">
                <label htmlFor="key" className="field-label">
                  Teacher key
                </label>
                <input
                  id="key"
                  type="password"
                  className={fieldClass}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  required
                  autoComplete="off"
                />
                {error && (
                  <p role="alert" className="text-sm font-medium text-danger-foreground">
                    {error}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading || !code.trim() || !key}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Loading" : "View results"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {data && (
          <div className="mt-8 space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{data.title}</h2>
              <p className="text-sm text-muted-foreground">
                {data.attempts.length} {data.attempts.length === 1 ? "attempt" : "attempts"}
              </p>
            </div>
            {data.attempts.length > 0 && (
              <div className="glass overflow-x-auto rounded-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-accent text-accent-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Name</th>
                      <th scope="col" className="px-4 py-3 font-medium">Class</th>
                      <th scope="col" className="px-4 py-3 font-medium">Score</th>
                      <th scope="col" className="px-4 py-3 font-medium">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10 text-foreground">
                    {data.attempts.map((a, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3">{a.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{classBoardLabel(a.classBoard)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {a.score} / {a.total}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{new Date(a.submittedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
