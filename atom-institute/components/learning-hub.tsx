import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Board } from "@/lib/data"

export function BoardTag({ board }: { board: Board }) {
  return (
    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-link ring-1 ring-accent-foreground/15">
      {board}
    </span>
  )
}

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
          {item.href ? (
            <Link href={item.href} className="inline-flex min-h-8 items-center rounded-md hover:text-link hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export const hubCardClass = "glass glass-hover block p-5 sm:p-6"
