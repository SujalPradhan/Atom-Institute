"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the error for debugging / monitoring.
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-gray-600">
        An unexpected error occurred. Please try again, or head back to the home page.
      </p>
      <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  )
}
