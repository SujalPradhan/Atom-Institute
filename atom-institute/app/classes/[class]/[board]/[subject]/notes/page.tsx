"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, FileText, Download, Eye, BookOpen } from "lucide-react"

interface NotesPageProps {
  params: {
    class: string
    board: string
    subject: string
  }
}

export default function NotesPage({ params }: NotesPageProps) {
  const classNum = params.class
  const board = params.board.toUpperCase()
  const subject = params.subject.replace("-", " ")
  const [selectedNote, setSelectedNote] = useState<number | null>(null)

  // This would typically come from a database or CMS
  const notes = [
    { id: 1, title: "Chapter 1: Introduction", description: "Fundamental concepts and principles" },
    { id: 2, title: "Chapter 2: Core Concepts", description: "Essential theories and applications" },
    { id: 3, title: "Chapter 3: Advanced Topics", description: "In-depth analysis and problem solving" },
    { id: 4, title: "Chapter 4: Practical Applications", description: "Real-world examples and case studies" },
    { id: 5, title: "Chapter 5: Exam Preparation", description: "Practice questions and revision notes" },
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
            <Link href={`/classes/${classNum}/${params.board}`}>
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Subjects
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            {subject.charAt(0).toUpperCase() + subject.slice(1)} Notes
          </h1>
          <p className="mt-2 text-gray-600 md:text-xl">
            Class {classNum} • {board} Board
          </p>

          <div className="flex items-center space-x-2 mt-4">
            <BookOpen className="h-5 w-5 text-blue-900" />
            <div className="text-sm text-blue-900 font-medium">Study Materials</div>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <div className="text-sm text-blue-900 font-medium">
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </div>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <div className="text-sm text-blue-900 font-medium">{board}</div>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <div className="text-sm text-blue-900 font-medium">Class {classNum}</div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {notes.map((note) => (
            <motion.div key={note.id} variants={item}>
              <Card
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border border-gray-200 ${
                  selectedNote === note.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedNote(note.id === selectedNote ? null : note.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-blue-100 p-2 flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-900" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-medium">{note.title}</h3>
                      <p className="text-sm text-gray-600">{note.description}</p>

                      <AnimatePresence>
                        {selectedNote === note.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pt-4"
                          >
                            <div className="text-sm text-gray-600 mb-4">
                              This chapter covers essential concepts that form the foundation of {subject} for Class{" "}
                              {classNum} {board} curriculum.
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="group">
                                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                                Download PDF
                              </Button>
                              <Button size="sm" className="group">
                                <Eye className="mr-2 h-4 w-4" />
                                View Online
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
