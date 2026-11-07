import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BoardTag, Breadcrumbs, hubCardClass } from "@/components/learning-hub"
import { boardInfo, boards, classes, getClassById } from "@/lib/data"
import { boardSlug } from "@/lib/syllabus"

interface PageProps {
  params: Promise<{ class: string }>
}

export function generateStaticParams() {
  return classes.map((c) => ({ class: String(c.id) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { class: classParam } = await params
  const classInfo = getClassById(Number(classParam))

  if (!classInfo) {
    return { title: "Class Not Found" }
  }

  return {
    title: `${classInfo.name} - Select Board`,
    description: `Choose your board to open ${classInfo.name} chapters, notes, PPTs, solved questions and MCQ tests.`,
  }
}

export default async function BoardPage({ params }: PageProps) {
  const { class: classParam } = await params
  const classInfo = getClassById(Number(classParam))

  if (!classInfo) {
    notFound()
  }

  return (
    <main className="page max-w-4xl">
      <div>
        <Breadcrumbs items={[{ label: "Classes", href: "/classes" }, { label: classInfo.name }]} />
        <h1 className="page-title">{classInfo.name}</h1>
        <p className="page-lead mb-8 mt-3">Choose your board.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {boards.map((board) => (
            <Link key={board} href={`/classes/${classInfo.id}/${boardSlug(board)}`} className={hubCardClass}>
              <BoardTag board={board} />
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{classInfo.name} · {board}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{boardInfo[board].fullName}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
