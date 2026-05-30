import type { Metadata } from "next"
import GalleryContent from "./gallery-content"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery showcasing Atom Institute's campus, facilities, events, and activities.",
}

export default function GalleryPage() {
  return <GalleryContent />
}
