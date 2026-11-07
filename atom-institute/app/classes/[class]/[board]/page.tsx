import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { BoardTag, Breadcrumbs, hubCardClass } from "@/components/learning-hub"
import { boards, classes, getClassById, getDriveLink } from "@/lib/data"
import { boardFromSlug, boardSlug, courseHref, getBatch, resourceCount } from "@/lib/syllabus"

interface PageProps {
  params: Promise<{ class: string; board: string }>
}

export function generateStaticParams() {
  return classes.flatMap((c) => boards.map((b) => ({ class: String(c.id), board: boardSlug(b) })))
}

async function resolve(params: PageProps["params"]) {
  const { class: classParam, board: boardParam } = await params
  const classInfo = getClassById(Number(classParam))
  const board = boardFromSlug(boardParam)
  const batch = classInfo && board ? getBatch(classInfo.classNumber, board) : undefined
  return classInfo && board && batch ? { classInfo, board, batch } : undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = await resolve(params)
  if (!found) return { title: "Batch Not Found" }
  return {
    title: found.batch.name,
    description: `Subjects, chapters, notes, PPTs, solved questions and MCQ tests for ${found.batch.name}.`,
  }
}

export default async function BatchPage({ params }: PageProps) {
  const found = await resolve(params)
  if (!found) notFound()
  const { classInfo, board, batch } = found
  const driveUrl = getDriveLink(classInfo.classNumber, board)

  return (
    <main className="page max-w-4xl">
      <div>
        <Breadcrumbs items={[{ label: "Classes", href: "/classes" }, { label: batch.name }]} />
        <BoardTag board={board} />
        <h1 className="page-title mt-3">{batch.name}</h1>
        <p className="page-lead mb-6 mt-3">Pick a subject to see its chapters.</p>
        {driveUrl && (
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-link underline-offset-4 hover:underline"
          >
            All study material (Drive folder)
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {batch.courses.map((course) => {
            const resources = resourceCount(course)
            return (
              <Link key={course.subjectSlug} href={courseHref(course)} className={hubCardClass}>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{course.subject}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.chapters.length} chapters · {resources} {resources === 1 ? "resource" : "resources"}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
