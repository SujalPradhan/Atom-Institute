"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"

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

      {/* What We Offer Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">What We Offer</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Comprehensive study materials across various subjects for ICSE, CBSE, and Madhyamik boards.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-8 max-w-6xl w-full"
          >
            {/* Boards Row */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md border border-blue-200 flex items-center justify-center">
                <h3 className="text-lg font-bold text-white">ICSE</h3>
              </div>
              <div className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md border border-green-200 flex items-center justify-center">
                <h3 className="text-lg font-bold text-white">CBSE</h3>
              </div>
              <div className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-md border border-purple-200 flex items-center justify-center">
                <h3 className="text-lg font-bold text-white">Madhyamik</h3>
              </div>
            </div>
            
            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Physics */}
              <div className="bg-gradient-to-b from-white to-red-50 rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-red-500 h-2 w-full"></div>
                <div className="p-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2v20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Physics</h4>
                  <p className="text-sm text-gray-600 text-center">Mechanics, Thermodynamics, Electronics</p>
                </div>
              </div>
              
              {/* Chemistry */}
              <div className="bg-gradient-to-b from-white to-green-50 rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-green-500 h-2 w-full"></div>
                <div className="p-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M10 2v7.31"></path>
                      <path d="M14 9.3V2"></path>
                      <path d="M8.5 2h7"></path>
                      <path d="M14 9.3a6 6 0 1 1-4 0"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Chemistry</h4>
                  <p className="text-sm text-gray-600 text-center">Organic, Inorganic, Physical Chemistry</p>
                </div>
              </div>
              
              {/* Mathematics */}
              <div className="bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-500 h-2 w-full"></div>
                <div className="p-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M4 20l16-16"></path>
                      <path d="M4 4v16"></path>
                      <path d="M20 4v16"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Mathematics</h4>
                  <p className="text-sm text-gray-600 text-center">Algebra, Calculus, Geometry</p>
                </div>
              </div>
              
              {/* Biology */}
              <div className="bg-gradient-to-b from-white to-yellow-50 rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-yellow-500 h-2 w-full"></div>
                <div className="p-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Biology</h4>
                  <p className="text-sm text-gray-600 text-center">Botany, Zoology, Human Physiology</p>
                </div>
              </div>
              
              {/* Computer Science */}
              <div className="bg-gradient-to-b from-white to-purple-50 rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-purple-500 h-2 w-full"></div>
                <div className="p-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m9 8 3 3-3 3"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Computer Science</h4>
                  <p className="text-sm text-gray-600 text-center">Programming, Data Structures, Algorithms</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2 text-center mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">Our Impact</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Results that speak for themselves
            </p>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden max-w-4xl mx-auto mb-16"
          >
            <div className="bg-blue-900 h-2 w-full"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">Our Achievement Metrics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stat 1: Pass Percentage */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Pass Percentage: </span>
                    <span className="text-blue-900 font-bold">100%</span>
                  </div>
                </div>
                
                {/* Stat 2: 90+ Scorers */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Students Scoring 90% or Above: </span>
                    <span className="text-blue-900 font-bold">124 </span>
                  </div>
                </div>
              </div>
              
              {/* Stat 3: Students Enrolled */}
              <div className="mt-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="text-gray-600 text-sm">Total Students Enrolled</h4>
                    <div className="flex items-end gap-1">
                      <span className="text-blue-900 text-3xl font-bold">350+</span>
                      <span className="text-green-600 text-sm mb-1">Growing</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Contact Us</h3>
            <div className="bg-white rounded-xl shadow-md border border-blue-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Phone */}
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                  <p className="text-gray-600">+91 12345 67890</p>
                </div>
                
                {/* Email */}
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                  <p className="text-gray-600">contact@atominstitute.edu</p>
                </div>
                
                {/* Location */}
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
                  <p className="text-gray-600">Kalimpong, West Bengal, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
