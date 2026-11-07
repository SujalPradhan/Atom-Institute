"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/lib/data"

export default function TestimonialsContent() {
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
        <h1 className="page-title">Student Testimonials</h1>
        <p className="page-lead mx-auto">
          Hear what our students have to say about their learning experience at Atom Institute
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <blockquote className="flex-grow text-foreground">
                  <p>&ldquo;{testimonial.testimonial}&rdquo;</p>
                </blockquote>
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Class {testimonial.classNumber} ({testimonial.board})
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </main>
  )
}
