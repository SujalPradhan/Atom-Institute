"use client"
import React, { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getBoardsByClass, getClassById, Class } from "@/lib/api"

// Define the notes_links mapping for redirection
const notes_links = {
  "cbse10": "https://www.class10cbse.com",
  "cbse11": "https://www.class11cbse.com",
  "cbse12": "https://www.class12cbse.co",
  "icse10": "https://www.class10icse.com",
  "icse11": "https://www.class11icse.com",
  "icse12": "https://www.class12icse.com",
  "madhyamik10": "https://www.class10madhyamik.com",
  "madhyamik11": "https://www.class11madhyamik.com",
  "madhyamik12": "https://www.class12madhyamik.com"
}

interface BoardPageProps {
  params: {
    class: string
  }
}

export default function BoardPage({ params }: BoardPageProps) {
  const unwrappedParams = React.use(params as any);
  const classId = parseInt(unwrappedParams.class, 10);
  const [classData, setClassData] = useState<Class | null>(null)
  const [boards, setBoards] = useState<string[]>([])
  const [loading, setLoading] = useState({
    class: true,
    boards: true,
  })
  const [invalidClass, setInvalidClass] = useState(false)
  
  useEffect(() => {
    if (classId < 1 || classId > 3) {
      setInvalidClass(true)
      const timer = setTimeout(() => {
        window.location.href = '/classes'
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [classId])

  const fetchClassData = useCallback(async () => {
    if (invalidClass) return;
    
    try {
      const data = await getClassById(classId)
      setClassData(data)
    } catch (error) {
      console.error(`Failed to fetch class ${classId}:`, error)
    } finally {
      setLoading(prev => ({ ...prev, class: false }))
    }
  }, [classId, invalidClass]);

  const fetchBoards = useCallback(async () => {
    if (invalidClass) return;
    
    try {
      const data = await getBoardsByClass(classId)
      if (data && data.length > 0) {
        setBoards(data)
      } else {
        console.warn(`No boards returned for class ${classId}, using fallback data`)
        setBoards(["CBSE", "ICSE", "Madhyamik"])
      }
    } catch (error) {
      console.error(`Failed to fetch boards for class ${classId}:`, error)
      setBoards(["CBSE", "ICSE", "Madhyamik"])
    } finally {
      setLoading(prev => ({ ...prev, boards: false }))
    }
  }, [classId, invalidClass]);

  useEffect(() => {
    fetchClassData()
    fetchBoards()
  }, [fetchClassData, fetchBoards])

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

  const classNum = classData ? parseInt(classData.name.replace("Class ", ""), 10) : (classId >= 1 && classId <= 3 ? [10, 11, 12][classId-1] : 10)

  if (invalidClass) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-white">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900 mb-6">
            Invalid Class Selected
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mb-8">
            Redirecting you to the classes page...
          </p>
          <Button asChild>
            <Link href="/classes">
              Go to Classes
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col py-12 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Button variant="outline" asChild className="mb-8 group border-blue-200 text-blue-700 hover:text-blue-800 hover:bg-blue-50">
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
            {loading.class ? (
              <span className="inline-block w-40 h-10 bg-gray-100 animate-pulse rounded"></span>
            ) : (
              `${classData?.name || `Class ${classNum}`} - Select Board`
            )}
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
          {loading.boards ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div key={index} variants={item}>
                <Card className="overflow-hidden h-52 bg-gray-100 animate-pulse">
                  <CardContent className="p-6"></CardContent>
                </Card>
              </motion.div>
            ))
          ) : boards.length > 0 ? (
            boards.map((board) => {
              const boardKey = `${board.toLowerCase()}${classNum}`;
              const redirectUrl = notes_links[boardKey as keyof typeof notes_links];
              
              return (
                <motion.div key={board} variants={item}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="rounded-full bg-blue-100 p-4 w-20 h-20 flex items-center justify-center">
                          <span className="text-xl font-bold text-blue-900">{board}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900">{board}</h3>
                        <p className="text-gray-600">
                          Access all {board} board materials for {classData?.name || `Class ${classNum}`}
                        </p>
                        <Button 
                          className="mt-4 group"
                          onClick={() => {
                            if (redirectUrl) {
                              window.open(redirectUrl, "_blank");
                            } else {
                              window.location.href = `/classes/${classId}/${board.toLowerCase()}`;
                            }
                          }}
                        >
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500">No boards available for this class.</p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
