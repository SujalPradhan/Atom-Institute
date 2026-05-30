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
    <main className="flex min-h-screen flex-col py-12 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            Student Testimonials
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            Hear what our students have to say about their learning experience at Atom Institute
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
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border border-gray-200">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 border-l-4 border-blue-500 pl-3">
                    <h3 className="font-semibold text-blue-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">
                      Class {testimonial.classNumber} ({testimonial.board})
                    </p>
                  </div>
                  <div className="flex-grow">
                    <blockquote className="text-gray-600 italic relative">
                      <span className="text-3xl absolute -top-2 -left-2 text-blue-200">&ldquo;</span>
                      <p className="pl-4 pt-1">{testimonial.testimonial}</p>
                      <span className="text-3xl absolute -bottom-4 right-0 text-blue-200">&rdquo;</span>
                    </blockquote>
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
