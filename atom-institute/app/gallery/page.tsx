"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"

export default function GalleryPage() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  // Static gallery images
  const galleryImages = [
    { id: 1, title: "Entrance", image: "/images/teacher1.jpg", description: "Our Main Campus" },
    { id: 2, title: "Physics Class", image: "/placeholder.jpg", description: "Modern Physics Laboratory" },
    { id: 3, title: "Computer Class", image: "/placeholder.jpg", description: "Computer Science Lab" },
    { id: 4, title: "Chemistry Class", image: "/placeholder.jpg", description: "Chemistry Experiments" },
    { id: 5, title: "Biology Class", image: "/placeholder.jpg", description: "Well-stocked Library" },
    { id: 6, title: "Building", image: "/placeholder.jpg", description: "Interactive Classroom" },
  ]

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
            Explore images from our campus, facilities, and activities
          </p>
        </motion.div>

        {/* Gallery Grid */}
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
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square relative">
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}