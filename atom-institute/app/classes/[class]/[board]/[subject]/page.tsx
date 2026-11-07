import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BoardTag, Breadcrumbs } from "@/components/learning-hub"
import { classes, getClassById } from "@/lib/data"
import { batchHref, batchName, boardFromSlug, boardSlug, chapterHref, courses, getCourse } from "@/lib/syllabus"

interface PageProps {
  params: Promise<{ class: string; board: string; subject: string }>
}

export function generateStaticParams() {
  return courses.map((c) => ({
    class: String(classes.find((k) => k.classNumber === c.classNumber)?.id),
    board: boardSlug(c.board),
    subject: c.subjectSlug,
  }))
}

async function resolve(params: PageProps["params"]) {
  const { class: classParam, board: boardParam, subject } = await params
  const classInfo = getClassById(Number(classParam))
  const board = boardFromSlug(boardParam)
  const course = classInfo && board ? getCourse(classInfo.classNumber, board, subject) : undefined
  return course ? { classInfo: classInfo!, board: board!, course } : undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = await resolve(params)
  if (!found) return { title: "Subject Not Found" }
  const { course } = found
  const name = `Class ${course.classNumber} ${course.board} ${course.subject}`
  return {
    title: name,
    description: `All ${course.chapters.length} chapters of ${name} with notes, PPTs, solved questions and MCQ tests.`,
  }
}

export default async function SubjectPage({ params }: PageProps) {
  const found = await resolve(params)
  if (!found) notFound()
  const { course } = found
  const batch = batchName(course.classNumber, course.board)

  return (
    <main className="page max-w-4xl">
      <div>
        <Breadcrumbs
          items={[
            { label: "Classes", href: "/classes" },
            { label: batch, href: batchHref(course.classNumber, course.board) },
            { label: course.subject },
          ]}
        />
        <BoardTag board={course.board} />
        <h1 className="page-title mt-3">{course.subject}</h1>
        <p className="page-lead mb-8 mt-3">
          {batch} · {course.chapters.length} chapters
        </p>
        <ol className="row-list">
          {course.chapters.map((chapter, i) => (
            <li key={chapter.slug}>
              <Link href={chapterHref(course, chapter)} className="row-link">
                <span className="w-6 text-sm text-muted-foreground">{i + 1}</span>
                <span className="font-medium text-foreground">{chapter.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
