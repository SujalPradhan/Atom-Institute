"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import ClassCard from "@/components/class-card"

export default function Home() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-white py-12 md:py-24">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <Image src="/images/logo.jpeg" alt="Atom Institute Logo" width={200} height={200} className="mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-blue-900"
            >
              Welcome to Atom Institute
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mx-auto max-w-[700px] text-gray-600 md:text-xl"
            >
              Providing quality education for classes 10, 11, and 12 across ICSE, CBSE, and Madhyamik boards.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col gap-2 min-[400px]:flex-row"
          >
            <Button asChild size="lg" className="group">
              <Link href="/classes">
                Browse Study Materials
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/about">About Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="w-full bg-white py-12 md:py-24" ref={ref}>
        <div className="container px-4 md:px-6">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">Our Achievements</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Celebrating excellence in education
              </p>
            </div>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white border border-gray-200 p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-blue-900 mb-3">95%</div>
              <p className="text-gray-600">Students scored above 90% in board exams</p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white border border-gray-200 p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-blue-900 mb-3">80+</div>
              <p className="text-gray-600">Students qualified for national-level competitions</p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white border border-gray-200 p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-blue-900 mb-3">10+</div>
              <p className="text-gray-600">Years of academic excellence</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
