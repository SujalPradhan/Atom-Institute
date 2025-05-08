"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BoardPageProps {
  params: Promise<{
    class: string
  }>
}

export default function BoardPage({ params }: BoardPageProps) {
  // Properly unwrap the params Promise
  const resolvedParams = React.use(params)
  const classNum = resolvedParams.class
  const boards = ["ICSE", "CBSE", "Madhyamik"]

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
            Class {classNum} - Select Board
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
          {boards.map((board) => (
            <motion.div key={board} variants={item}>
              <Link href={`/classes/${classNum}/${board.toLowerCase()}`}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="rounded-full bg-blue-100 p-4 w-20 h-20 flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-900">{board}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900">{board}</h3>
                      <p className="text-gray-600">
                        Access all {board} board materials for Class {classNum}
                      </p>
                      <Button className="mt-4 group">
                        Continue
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
