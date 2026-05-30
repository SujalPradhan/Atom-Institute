import type { Metadata } from "next"
import TestimonialsContent from "./testimonials-content"

export const metadata: Metadata = {
  title: "Student Testimonials",
  description: "Read what our students have to say about their learning experience at Atom Institute.",
}

export default function TestimonialsPage() {
  return <TestimonialsContent />
}
