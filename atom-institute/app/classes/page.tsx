"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export default function ClassesPage() {
  const classes = [10, 11, 12]

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
    <main className="flex min-h-screen flex-col items-center py-12 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            Select Your Class
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            Choose your class to access study materials organized by board and subject
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {classes.map((classNum) => (
            <motion.div key={classNum} variants={item}>
              <Link href={`/classes/${classNum}`}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="rounded-full bg-blue-100 p-6 w-24 h-24 flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-900">{classNum}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900">Class {classNum}</h3>
                      <p className="text-gray-600">Access all study materials for Class {classNum}</p>
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
