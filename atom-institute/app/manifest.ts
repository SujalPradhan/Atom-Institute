import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atom Institute",
    short_name: "Atom",
    description:
      "Chapter-wise notes, PPTs, solved questions and MCQ tests for classes 10, 11 and 12 across ICSE, CBSE and Madhyamik.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B3A66",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
