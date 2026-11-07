import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider, themeInitScript } from "@/components/theme-provider"
import MotionProvider from "@/components/motion-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <MotionProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </MotionProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
