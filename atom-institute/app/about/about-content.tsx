"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { faculty } from "@/lib/data"

export default function AboutContent() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <main className="page">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 space-y-3 text-center"
      >
        <h1 className="page-title">About Atom Institute</h1>
        <p className="page-lead mx-auto">Excellence in education since 2010</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mb-20 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
      >
        <div className="glass relative aspect-video overflow-hidden p-0">
          <Image
            src="/placeholder.jpg"
            alt="Atom Institute Building"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our Mission</h2>
            <p className="text-muted-foreground">
              At Atom Institute, we strive to provide quality education that nurtures curiosity, critical thinking, and a lifelong love for learning.
              Our mission is to prepare students not just for exams but for the challenges of the future.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision creating an educational environment where students can discover their potential,
              develop their skills, and grow into responsible citizens who contribute positively to society.
            </p>
          </div>
        </div>
      </motion.div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-10 space-y-3 text-center"
        >
          <h2 className="section-title">Our Faculty</h2>
          <p className="page-lead mx-auto">Meet our team of experienced educators dedicated to student success</p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {faculty.map((member) => (
            <motion.div
              key={member.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="h-full overflow-hidden">
                <CardContent className="flex h-full flex-col p-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-3 p-6">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">{member.name}</h3>
                      <p className="font-medium text-link">{member.position}</p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Qualifications:</span> {member.qualifications}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Experience:</span> {member.experience}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Specialization:</span> {member.specialization}
                      </p>
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
