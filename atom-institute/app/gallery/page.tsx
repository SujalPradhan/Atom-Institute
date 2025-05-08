"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"

// Sample image data - replace with your actual images
const galleryImages = [
  { src: "/placeholder.jpg", alt: "Institute Building", caption: "Our Main Campus" },
  { src: "/placeholder.jpg", alt: "Physics Lab", caption: "Modern Physics Laboratory" },
  { src: "/placeholder.jpg", alt: "Computer Lab", caption: "Computer Science Lab" },
  { src: "/placeholder.jpg", alt: "Chemistry Lab", caption: "Chemistry Experiments" },
  { src: "/placeholder.jpg", alt: "Library", caption: "Well-stocked Library" },
  { src: "/placeholder.jpg", alt: "Classroom", caption: "Interactive Classroom" },
  { src: "/placeholder.jpg", alt: "Sports", caption: "Sports Activities" },
  { src: "/placeholder.jpg", alt: "Science Fair", caption: "Annual Science Fair" },
  { src: "/placeholder.jpg", alt: "Students", caption: "Student Activities" },
]

export default function GalleryPage() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <main className="flex min-h-screen flex-col items-center py-12 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            Our Gallery
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            Explore images from our campus, classes, events, and student activities
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}