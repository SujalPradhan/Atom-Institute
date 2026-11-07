import type { Metadata } from "next"
import ClassesContent from "./classes-content"

export const metadata: Metadata = {
  title: "Learning Hub",
  description:
    "Chapter-wise notes, PPTs, solved questions and MCQ tests for Class 10, 11 and 12 across CBSE, ICSE and Madhyamik.",
}

export default function ClassesPage() {
  return <ClassesContent />
}
