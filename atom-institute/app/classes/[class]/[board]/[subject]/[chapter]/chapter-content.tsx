"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BoardTag, Breadcrumbs } from "@/components/learning-hub"
import {
  batchHref,
  batchName,
  chapterHref,
  courseHref,
  type Chapter,
  type Course,
  type LinkResource,
  type ResourceKind,
} from "@/lib/syllabus"
import { cn } from "@/lib/utils"

const tabs: { kind: ResourceKind; label: string; badge: string; empty: string }[] = [
  { kind: "notes", label: "Notes", badge: "PDF", empty: "notes" },
  { kind: "ppt", label: "PPT", badge: "PPT", empty: "PPTs" },
  { kind: "solved", label: "Solved Qs", badge: "Q&A", empty: "solved questions" },
  { kind: "mcq", label: "MCQ Tests", badge: "MCQ", empty: "MCQ tests" },
]

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

interface ChapterContentProps {
  course: Course
  chapter: Chapter
  number: number
  previous: Chapter | null
  next: Chapter | null
}

export default function ChapterContent({ course, chapter, number, previous, next }: ChapterContentProps) {
  const param = useSearchParams().get("tab")
  const active = tabs.find((t) => t.kind === param) ?? tabs[0]
  const batch = batchName(course.classNumber, course.board)
  const base = chapterHref(course, chapter)

  const rows: { key: string; title: string; sub: string; href: string; external: boolean }[] =
    active.kind === "mcq"
      ? (chapter.mcq ?? []).map((m) => ({
          key: m.code,
          title: m.title,
          sub: `Code ${m.code}`,
          href: `/tests?code=${encodeURIComponent(m.code)}`,
          external: false,
        }))
      : ((chapter[active.kind] ?? []) as LinkResource[]).map((r) => ({
          key: r.url,
          title: r.title,
          sub: hostOf(r.url),
          href: r.url,
          external: true,
        }))

  return (
    <main className="page max-w-4xl">
      <div>
        <Breadcrumbs
          items={[
            { label: "Classes", href: "/classes" },
            { label: batch, href: batchHref(course.classNumber, course.board) },
            { label: course.subject, href: courseHref(course) },
            { label: `Ch ${number}. ${chapter.title}` },
          ]}
        />
        <BoardTag board={course.board} />
        <h1 className="page-title mt-3 text-balance">
          Ch {number}. {chapter.title}
        </h1>
        <p className="page-lead mb-8 mt-3">
          {batch} · {course.subject}
        </p>

        <div role="tablist" className="glass mb-5 flex w-full gap-1 overflow-x-auto rounded-full p-1 sm:inline-flex sm:w-auto">
          {tabs.map((t) => (
            <Link
              key={t.kind}
              role="tab"
              aria-selected={t.kind === active.kind}
              href={`${base}?tab=${t.kind}`}
              replace
              scroll={false}
              className={cn(
                "flex min-h-10 flex-1 items-center justify-center whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors",
                t.kind === active.kind
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-foreground/5",
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="glass px-4 py-10 text-center text-muted-foreground">
            No {active.empty} for this chapter yet. Contact Mr. Arpan Pradhan.
          </p>
        ) : (
          <ul className="row-list">
            {rows.map((row) => (
              <li key={row.key}>
                <Link
                  href={row.href}
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="row-link"
                >
                  <span className="w-12 shrink-0 rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium text-accent-foreground">
                    {active.badge}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-foreground">{row.title}</span>
                    <span className="block text-xs text-muted-foreground">{row.sub}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {active.kind === "mcq" && (
          <p className="mt-4 text-sm text-muted-foreground">
            Have a test code?{" "}
            <Link href="/tests" className="font-medium text-link underline-offset-4 hover:underline">
              Take a test →
            </Link>
          </p>
        )}

        <div className="mt-10 flex items-center justify-between gap-4 text-sm">
          {previous ? (
            <Link href={chapterHref(course, previous)} className="glass flex min-h-10 items-center gap-1 rounded-full px-4 font-medium text-link hover:underline">
              <ChevronLeft className="h-4 w-4" />
              Previous chapter
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={chapterHref(course, next)} className="glass flex min-h-10 items-center gap-1 rounded-full px-4 font-medium text-link hover:underline">
              Next chapter
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  )
}
