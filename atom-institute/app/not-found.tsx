import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="glass flex w-full max-w-lg flex-col items-center p-8 sm:p-12">
      <p className="text-6xl font-semibold tracking-tight text-link">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
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
      </div>
    </main>
  )
}
