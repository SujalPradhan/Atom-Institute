import { Suspense } from "react"
import type { Metadata } from "next"
import TestsContent from "./tests-content"

export const metadata: Metadata = {
  title: "MCQ Tests",
  description: "Take an MCQ test with your test code and see your score instantly.",
}

export default function TestsPage() {
  return (
    <Suspense>
      <TestsContent />
    </Suspense>
  )
}
