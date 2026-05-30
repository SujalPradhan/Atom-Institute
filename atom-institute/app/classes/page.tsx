import type { Metadata } from "next"
import ClassesContent from "./classes-content"

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Select your class to access study materials for Class 10, 11, and 12 across CBSE, ICSE, and Madhyamik boards.",
}

export default function ClassesPage() {
  return <ClassesContent />
}
