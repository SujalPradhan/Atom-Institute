import type { Metadata } from "next"
import AboutContent from "./about-content"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Atom Institute's mission, faculty, and achievements in providing quality education across ICSE, CBSE, and Madhyamik boards.",
}

export default function AboutPage() {
  return <AboutContent />
}
