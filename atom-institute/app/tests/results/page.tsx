import type { Metadata } from "next"
import ResultsContent from "./results-content"

export const metadata: Metadata = {
  title: "Test Results",
  description: "Teacher view of MCQ test attempts.",
  robots: { index: false },
}

export default function ResultsPage() {
  return <ResultsContent />
}
