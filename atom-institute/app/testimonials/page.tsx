"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Sample testimonial data - replace with your actual testimonials
const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    image: "/placeholder-user.jpg",
    testimonial: "The teachers at Atom Institute helped me understand complex physics concepts in a simple way. Their guidance was instrumental in my board exam success.",
    class: 12,
    board: "CBSE"
  },
  {
    id: 2,
    name: "Priya Patel",
    image: "/placeholder-user.jpg",
    testimonial: "The study materials and practice questions provided by Atom Institute were comprehensive and helped me score well in my exams.",
    class: 10,
    board: "ICSE"
  },
  {
    id: 3,
    name: "Aditya Roy",
    image: "/placeholder-user.jpg",
    testimonial: "The interactive teaching method and personal attention from teachers made learning enjoyable. I improved my grades significantly after joining.",
    class: 11,
    board: "Madhyamik"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    image: "/placeholder-user.jpg",
    testimonial: "Atom Institute provided me with a strong foundation in mathematics. The concepts I learned here helped me excel in competitive exams as well.",
    class: 12,
    board: "CBSE"
  },
  {
    id: 5,
    name: "Arjun Singh",
    image: "/placeholder-user.jpg",
    testimonial: "The chemistry lab experiments at Atom Institute made the subject practical and easy to understand. The teachers are supportive and knowledgeable.",
    class: 10,
    board: "ICSE"
  },
  {
    id: 6,
    name: "Nandini Das",
    image: "/placeholder-user.jpg",
    testimonial: "I appreciate how the teachers at Atom Institute focus on building concepts rather than just memorization. This approach helped me develop analytical thinking.",
    class: 11,
    board: "Madhyamik"
  },
]

export default function TestimonialsPage() {
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
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-blue-100">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-blue-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        Class {testimonial.class} ({testimonial.board})
                      </p>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <blockquote className="text-gray-600 italic relative">
                      <span className="text-3xl absolute -top-2 -left-2 text-blue-200">"</span>
                      <p className="pl-4 pt-1">
                        {testimonial.testimonial}
                      </p>
                      <span className="text-3xl absolute -bottom-4 right-0 text-blue-200">"</span>
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