"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { Class } from "@/lib/api"

interface ClassCardProps {
  classData: Class
  boards?: string[]
}

export default function ClassCard({ classData, boards }: ClassCardProps) {
  const classNumber = parseInt(classData.name.replace("Class ", ""), 10)
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {classData.image && classData.image !== "/placeholder.jpg" ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <Image 
                src={classData.image} 
                alt={classData.name} 
                fill 
                className="object-cover"
              />
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-blue-900">{classNumber}</span>
            </motion.div>
          )}
          <h3 className="text-xl font-bold text-blue-900">{classData.name}</h3>
          <p className="text-sm text-gray-600">{classData.description}</p>
          {boards && boards.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {boards.map((board) => (
                <Badge key={board} variant="secondary" className="transition-all duration-300 hover:bg-blue-200">
                  {board}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-center">
        <Button asChild className="group">
          <Link href={`/classes/${classData.id}`}>
            View Materials
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
