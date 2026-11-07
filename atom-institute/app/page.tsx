"use client"

import { AtomMark } from "@/components/atom-mark"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Atom, Code2, Dna, FlaskConical, Mail, MapPin, Phone, Sigma, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const subjects = [
  { name: "Physics", blurb: "Mechanics, Thermodynamics, Electronics", Icon: Atom },
  { name: "Chemistry", blurb: "Organic, Inorganic, Physical Chemistry", Icon: FlaskConical },
  { name: "Mathematics", blurb: "Algebra, Calculus, Geometry", Icon: Sigma },
  { name: "Biology", blurb: "Botany, Zoology, Human Physiology", Icon: Dna },
  { name: "Computer Science", blurb: "Programming, Data Structures, Algorithms", Icon: Code2 },
]

const contactItems = [
  { label: "Phone", value: "+91 12345 67890", Icon: Phone },
  { label: "Email", value: "contact@atominstitute.edu", Icon: Mail },
  { label: "Location", value: "Kalimpong, West Bengal, India", Icon: MapPin },
]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <main>
      <section className="page flex flex-col items-center gap-8 pb-12 pt-14 text-center md:pt-24">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-6">
          <div className="glass flex h-28 w-28 items-center justify-center rounded-3xl">
            <AtomMark className="h-20 w-20" />
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Welcome to Atom Institute
          </h1>
          <p className="page-lead mx-auto">
            Providing quality education for classes 10, 11, and 12 across ICSE, CBSE, and Madhyamik boards.
          </p>
        </motion.div>
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-col gap-3 min-[400px]:flex-row"
        >
          <Button asChild size="lg" className="group">
            <Link href="/classes">
              Browse Study Materials
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">About Us</Link>
          </Button>
        </motion.div>
      </section>

      <section className="page flex flex-col items-center gap-10 text-center">
        <div className="space-y-3">
          <h2 className="section-title">What We Offer</h2>
          <p className="page-lead mx-auto">
            Comprehensive study materials across various subjects for ICSE, CBSE, and Madhyamik boards.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["ICSE", "CBSE", "Madhyamik"].map((b) => (
            <h3 key={b} className="glass rounded-full px-5 py-2 text-sm font-semibold text-link">
              {b}
            </h3>
          ))}
        </div>

        <div className="flex w-full flex-wrap justify-center gap-4">
          {subjects.map(({ name, blurb, Icon }) => (
            <div key={name} className="glass glass-hover flex w-full flex-col items-center gap-3 p-6 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)] lg:first:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h4 className="text-lg font-semibold text-foreground">{name}</h4>
              <p className="text-sm text-muted-foreground">{blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page max-w-4xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="section-title">Our Impact</h2>
          <p className="page-lead mx-auto">Results that speak for themselves</p>
        </div>

        <div className="glass p-6 sm:p-8">
          <h3 className="mb-6 text-center text-base font-semibold text-foreground">Our Achievement Metrics</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-link">100%</p>
              <p className="mt-1 text-sm text-muted-foreground">Pass Percentage</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-link">124</p>
              <p className="mt-1 text-sm text-muted-foreground">Students Scoring 90% or Above</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-link">350+</p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" aria-hidden />
                Total Students Enrolled
              </p>
              <p className="text-xs font-medium text-foreground">Growing</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-center text-xl font-semibold tracking-tight text-foreground">Contact Us</h3>
          <div className="glass grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:p-8">
            {contactItems.map(({ label, value, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h4 className="text-sm font-semibold text-foreground">{label}</h4>
                <p className="break-words text-sm text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
