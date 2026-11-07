import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { classes, getClassById } from "@/lib/data"
import { boardFromSlug, boardSlug, courses, getChapter, getCourse } from "@/lib/syllabus"
import ChapterContent from "./chapter-content"

interface PageProps {
  params: Promise<{ class: string; board: string; subject: string; chapter: string }>
}

export function generateStaticParams() {
  return courses.flatMap((c) =>
    c.chapters.map((ch) => ({
      class: String(classes.find((k) => k.classNumber === c.classNumber)?.id),
      board: boardSlug(c.board),
      subject: c.subjectSlug,
      chapter: ch.slug,
    })),
  )
}

async function resolve(params: PageProps["params"]) {
  const { class: classParam, board: boardParam, subject, chapter: chapterParam } = await params
  const classInfo = getClassById(Number(classParam))
  const board = boardFromSlug(boardParam)
  const course = classInfo && board ? getCourse(classInfo.classNumber, board, subject) : undefined
  const found = course ? getChapter(course, chapterParam) : undefined
  return course && found ? { classInfo: classInfo!, course, ...found } : undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = await resolve(params)
  if (!found) return { title: "Chapter Not Found" }
  const { course, chapter } = found
  const context = `Class ${course.classNumber} ${course.board} ${course.subject}`
  return {
    title: `${chapter.title} · ${context}`,
    description: `Notes, PPTs, solved questions and MCQ tests for ${chapter.title}, ${context}.`,
  }
}

export default async function ChapterPage({ params }: PageProps) {
  const found = await resolve(params)
  if (!found) notFound()
  const { course, chapter, index } = found

  return (
    <Suspense>
      <ChapterContent
        course={course}
        chapter={chapter}
        number={index + 1}
        previous={course.chapters[index - 1] ?? null}
        next={course.chapters[index + 1] ?? null}
      />
    </Suspense>
  )
}
