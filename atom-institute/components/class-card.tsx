"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

interface ClassCardProps {
  classNumber: number
  description: string
  boards: string[]
}

export default function ClassCard({ classNumber, description, boards }: ClassCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-blue-900">{classNumber}</span>
          </motion.div>
          <h3 className="text-xl font-bold text-blue-900">Class {classNumber}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {boards.map((board) => (
              <Badge key={board} variant="secondary" className="transition-all duration-300 hover:bg-blue-200">
                {board}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-center">
        <Button asChild className="group">
          <Link href={`/classes/${classNumber}`}>
            View Materials
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
