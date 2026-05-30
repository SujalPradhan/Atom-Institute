import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { classes, getClassById } from "@/lib/data"
import BoardContent from "./board-content"

interface PageProps {
  params: Promise<{ class: string }>
}

// Pre-render the three valid class routes at build time.
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
    description: `Choose your board to access ${classInfo.name} study materials across CBSE, ICSE, and Madhyamik.`,
  }
}

export default async function BoardPage({ params }: PageProps) {
  const { class: classParam } = await params
  const classInfo = getClassById(Number(classParam))

  if (!classInfo) {
    notFound()
  }

  return <BoardContent classInfo={classInfo} />
}
