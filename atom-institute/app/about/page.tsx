"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

// Sample faculty data - replace with your actual faculty information
const facultyMembers = [
  {
    id: 1,
    name: "Mr. Arpan Pradhan",
    image: "images/teacher1.jpg",
    position: "Founder &  Educator",
    qualifications: "Msc in Computer Science, Shantiniketan University",
    experience: "2+ years in education",
    specialization: "Computer Science"
  },
  {
    id: 2,
    name: "Prof. Anjali Sharma",
    image: "/placeholder-user.jpg",
    position: "Head of Mathematics Department",
    qualifications: "M.Sc. Mathematics, Calcutta University",
    experience: "12+ years in teaching",
    specialization: "Calculus and Algebra"
  },
  {
    id: 3,
    name: "Dr. Pradeep Banerjee",
    image: "/placeholder-user.jpg",
    position: "Chemistry Faculty",
    qualifications: "Ph.D. in Chemistry, Jadavpur University",
    experience: "10+ years in education",
    specialization: "Organic Chemistry"
  },
  {
    id: 4,
    name: "Prof. Meena Chatterjee",
    image: "/placeholder-user.jpg",
    position: "Biology Faculty",
    qualifications: "M.Sc. Biotechnology, Presidency University",
    experience: "8+ years in teaching",
    specialization: "Molecular Biology"
  },
  {
    id: 5,
    name: "Prof. Sanjay Das",
    image: "/placeholder-user.jpg",
    position: "Computer Science Faculty",
    qualifications: "M.Tech in Computer Science, IIT Kharagpur",
    experience: "9+ years in education",
    specialization: "Programming and Data Structures"
  },
  {
    id: 6,
    name: "Dr. Sunita Roy",
    image: "/placeholder-user.jpg",
    position: "English & Literature Faculty",
    qualifications: "Ph.D. in English Literature, Delhi University",
    experience: "11+ years in teaching",
    specialization: "Modern Literature and Language Skills"
  },
];

export default function AboutPage() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <main className="flex min-h-screen flex-col py-12 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            About Atom Institute
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            Excellence in education since 2010
          </p>
        </motion.div>

        {/* Institute Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/placeholder.jpg" 
                alt="Atom Institute Building" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Atom Institute, we strive to provide quality education that nurtures curiosity, critical thinking, and a lifelong love for learning. 
                Our mission is to prepare students not just for exams but for the challenges of the future.
              </p>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                We envision creating an educational environment where students can discover their potential, 
                develop their skills, and grow into responsible citizens who contribute positively to society.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Faculty Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900">
              Our Faculty
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Meet our team of experienced educators dedicated to student success
            </p>
          </motion.div>

          <motion.div 
            ref={ref}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {facultyMembers.map((faculty) => (
              <motion.div
                key={faculty.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg bg-white border border-gray-200">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative h-64 w-full">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 bg-white flex-grow">
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{faculty.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{faculty.position}</p>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-start">
                          <span className="font-medium mr-2">Qualifications:</span>
                          <span>{faculty.qualifications}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium mr-2">Experience:</span>
                          <span>{faculty.experience}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium mr-2">Specialization:</span>
                          <span>{faculty.specialization}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
}