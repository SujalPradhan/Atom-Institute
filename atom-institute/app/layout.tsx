import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://atominstitute.edu"),
  title: {
    default: "Atom Institute - Redefining Education",
    template: "%s | Atom Institute",
  },
  description:
    "Educational institute providing quality study materials for classes 10, 11, and 12 across ICSE, CBSE, and Madhyamik boards.",
  openGraph: {
    title: "Atom Institute - Redefining Education",
    description:
      "Quality education and study materials for classes 10, 11, and 12 across ICSE, CBSE, and Madhyamik boards.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
