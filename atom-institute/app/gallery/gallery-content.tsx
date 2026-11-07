"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { gallery } from "@/lib/data"

export default function GalleryContent() {
  const ref = useRef(null)

  return (
    <main className="page">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 space-y-3 text-center"
      >
        <h1 className="page-title">Our Gallery</h1>
        <p className="page-lead mx-auto">Explore images from our campus, facilities, and activities</p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
      >
        {gallery.map((image) => (
          <motion.div
            key={image.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            className="glass group relative overflow-hidden p-0"
          >
            <div className="relative aspect-square">
              <Image
                src={image.image}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-medium text-white">{image.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  )
}
