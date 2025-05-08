"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Atom, Calculator, FlaskRoundIcon as Flask, Microscope, Laptop } from "lucide-react"

interface SubjectPageProps {
  params: {
    class: string
    board: string
  }
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const classNum = params.class
  const board = params.board.toUpperCase()

  const subjects = [
    { name: "Physics", icon: <Atom className="h-8 w-8" /> },
    { name: "Mathematics", icon: <Calculator className="h-8 w-8" /> },
    { name: "Chemistry", icon: <Flask className="h-8 w-8" /> },
    { name: "Biology", icon: <Microscope className="h-8 w-8" /> },
    { name: "Computer Science", icon: <Laptop className="h-8 w-8" /> },
  ]

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

  return (
    <main className="flex min-h-screen flex-col py-12 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Button variant="ghost" asChild className="mb-8 group">
            <Link href={`/classes/${classNum}`}>
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Class {classNum} Boards
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
            Class {classNum} - {board} Board
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">Select a subject to access study materials</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {subjects.map((subject) => (
            <motion.div key={subject.name} variants={item}>
              <Link href={`/classes/${classNum}/${params.board}/${subject.name.toLowerCase().replace(" ", "-")}/notes`}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="rounded-full bg-blue-100 p-4 w-20 h-20 flex items-center justify-center text-blue-900">
                        {subject.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900">{subject.name}</h3>
                      <p className="text-gray-600">
                        Access {subject.name} study materials for Class {classNum} {board} board
                      </p>
                      <Button className="mt-4 group">
                        View Notes
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
