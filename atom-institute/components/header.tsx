"use client"

import { useState } from "react"
import Link from "next/link"
import { AtomMark } from "@/components/atom-mark"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="glass mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full px-3 pl-4 sm:px-4">
        <Link href="/" className="flex items-center gap-2.5 rounded-full">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="rounded-full"
          >
            <AtomMark className="h-9 w-9" />
          </motion.div>
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Atom Institute</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
                    : "flex h-10 items-center rounded-full px-4 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                }
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-1">
        <ThemeToggle className="hidden md:inline-flex" />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" aria-describedby={undefined}>
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <nav className="mt-10 flex flex-col gap-1">
              {navigation.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "flex min-h-12 items-center rounded-xl bg-primary px-4 text-lg font-medium text-primary-foreground"
                        : "flex min-h-12 items-center rounded-xl px-4 text-lg font-medium text-foreground transition-colors hover:bg-foreground/5"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <ThemeToggle className="mt-4" />
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  )
}
