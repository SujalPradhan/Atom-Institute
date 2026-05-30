import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
      <p className="text-6xl font-bold text-blue-900">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-gray-600">
        Sorry, we couldn&apos;t find the page you were looking for. It may have been moved or never existed.
      </p>
      <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/classes">Browse Classes</Link>
        </Button>
      </div>
    </main>
  )
}
