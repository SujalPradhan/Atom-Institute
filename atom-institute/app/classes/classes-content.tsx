"use client"

import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"
import { BoardTag, hubCardClass } from "@/components/learning-hub"
import { boards, classes } from "@/lib/data"
import { batchHref, batchName, chapterHref, getBatch, resourceCount, searchChapters } from "@/lib/syllabus"

export default function ClassesContent() {
  const [query, setQuery] = useState("")
  const trimmed = query.trim()
  const searching = trimmed.length >= 2
  const results = searching ? searchChapters(trimmed) : []

  return (
    <main className="page max-w-4xl">
      <div>
        <div className="mb-10 space-y-3 text-center">
          <h1 className="page-title">Learn. Practise. Score.</h1>
          <p className="page-lead mx-auto">
            Chapter-wise notes, PPTs, solved questions and MCQ tests for every Atom Institute batch.
          </p>
        </div>

        <div className="relative mx-auto mb-10 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a chapter… e.g. Electricity, Quadratic"
            aria-label="Search chapters"
            className="field rounded-full pl-10 pr-4"
          />
        </div>

        {searching ? (
          <section aria-live="polite">
            {results.length === 0 ? (
              <p className="text-center text-muted-foreground">No chapter matches “{trimmed}”.</p>
            ) : (
              <>
                <p className="mb-3 text-sm text-muted-foreground">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
                <ul className="row-list">
                  {results.map(({ course, chapter, number }) => (
                    <li key={`${course.classNumber}-${course.board}-${course.subjectSlug}-${chapter.slug}`}>
                      <Link href={chapterHref(course, chapter)} className="row-link">
                        <span className="w-6 text-sm text-muted-foreground">{number}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-foreground">{chapter.title}</span>
                          <span className="block text-xs text-muted-foreground">
                            {batchName(course.classNumber, course.board)} · {course.subject}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ) : (
          <section>
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">Choose your batch</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {classes.flatMap((c) =>
                boards.map((board) => {
                  const batch = getBatch(c.classNumber, board)
                  if (!batch) return []
                  const resources = resourceCount(batch)
                  return [
                    <Link key={batch.name} href={batchHref(c.classNumber, board)} className={hubCardClass}>
                      <BoardTag board={board} />
                      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{batch.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {batch.courses.length} subjects · {resources} {resources === 1 ? "resource" : "resources"}
                      </p>
                    </Link>,
                  ]
                }),
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
