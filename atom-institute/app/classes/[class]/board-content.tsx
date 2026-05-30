"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen, Landmark } from "lucide-react"
import { boards, boardInfo, getDriveLink, type Board, type ClassInfo } from "@/lib/data"

// Per-board visual identity. Full class strings live here (not in lib/data.ts)
// so Tailwind's content scanner picks them up.
const boardStyles: Record<Board, { bar: string; iconBg: string; iconText: string; Icon: typeof GraduationCap }> = {
  CBSE: { bar: "bg-blue-500", iconBg: "bg-blue-100", iconText: "text-blue-600", Icon: BookOpen },
  ICSE: { bar: "bg-emerald-500", iconBg: "bg-emerald-100", iconText: "text-emerald-600", Icon: GraduationCap },
  Madhyamik: { bar: "bg-purple-500", iconBg: "bg-purple-100", iconText: "text-purple-600", Icon: Landmark },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BoardContent({ classInfo }: { classInfo: ClassInfo }) {
  const handleSelectBoard = (board: string) => {
    const url = getDriveLink(classInfo.classNumber, board)
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      toast.info(`Study materials for ${board} Class ${classInfo.classNumber} are coming soon.`, {
        description: "We're putting these together. Please check back shortly.",
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col py-12 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Button
            variant="outline"
            asChild
            className="mb-8 group border-blue-200 text-blue-700 hover:text-blue-800 hover:bg-blue-50"
          >
            <Link href="/classes">
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Classes
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            {classInfo.name} - Select Board
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            Choose your board to access subject-specific study materials
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {boards.map((board) => {
            const info = boardInfo[board]
            const style = boardStyles[board]
            const Icon = style.Icon
            return (
              <motion.div key={board} variants={item}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200">
                  <div className={`h-2 w-full ${style.bar}`} />
                  <CardContent className="p-6 flex h-full flex-col items-center text-center">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full shadow-sm ${style.iconBg}`}>
                      <Icon className={`h-7 w-7 ${style.iconText}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900">{board}</h3>
                    <p className="mt-1 text-sm font-medium text-gray-500">{info.fullName}</p>
                    <p className="mt-3 mb-6 text-gray-600">{info.description}</p>
                    <Button className="mt-auto w-full group" onClick={() => handleSelectBoard(board)}>
                      View Materials
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </main>
  )
}
