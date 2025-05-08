import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.jpeg" alt="Atom Institute Logo" width={30} height={30} />
          <span className="text-sm font-medium text-gray-600">
            © {new Date().getFullYear()} Atom Institute. All rights reserved.
          </span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/privacy"
            className="text-xs sm:text-sm font-medium text-gray-600 transition-colors hover:text-blue-900"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs sm:text-sm font-medium text-gray-600 transition-colors hover:text-blue-900"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-xs sm:text-sm font-medium text-gray-600 transition-colors hover:text-blue-900"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}
