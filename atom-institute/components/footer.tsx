import Link from "next/link"
import { AtomMark } from "@/components/atom-mark"
import { Mail, MapPin, Phone } from "lucide-react"
import { contact, socialLinks } from "@/lib/data"

const socials = [
  {
    name: "Facebook",
    url: socialLinks.facebook,
    path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z",
  },
  {
    name: "Instagram",
    url: socialLinks.instagram,
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z",
  },
  {
    name: "YouTube",
    url: socialLinks.youtube,
    path: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z",
  },
].filter((s) => s.url)

const linkClass = "inline-flex min-h-10 items-center text-sm text-foreground transition-colors hover:text-link"

export default function Footer() {
  return (
    <footer className="px-3 pb-4 pt-12 sm:px-4">
      <div className="glass mx-auto max-w-5xl rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1.4fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AtomMark className="h-9 w-9" />
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Atom Institute</h3>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Providing quality education for classes 10, 11, and 12 across ICSE, CBSE, and Madhyamik boards.
            </p>
            {socials.length > 0 && (
              <div className="flex gap-1">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 hover:text-link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col">
              <Link href="/" className={linkClass}>Home</Link>
              <Link href="/about" className={linkClass}>About Us</Link>
              <Link href="/classes" className={linkClass}>Our Classes</Link>
              <Link href="/gallery" className={linkClass}>Gallery</Link>
              <Link href="/testimonials" className={linkClass}>Testimonials</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Contact Us</h4>
            <div className="flex flex-col">
              <div className="flex min-h-10 items-center gap-3 text-sm text-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-accent-foreground" aria-hidden />
                <span>{contact.location}</span>
              </div>
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className={`${linkClass} gap-3`}>
                <Phone className="h-4 w-4 shrink-0 text-accent-foreground" aria-hidden />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className={`${linkClass} gap-3`}>
                <Mail className="h-4 w-4 shrink-0 text-accent-foreground" aria-hidden />
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-1 border-t border-foreground/10 pt-4 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Atom Institute. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="inline-flex min-h-10 items-center hover:text-link">Privacy Policy</Link>
            <Link href="/terms" className="inline-flex min-h-10 items-center hover:text-link">Terms of Service</Link>
          </div>
          <div>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/sujal-raj-pradhan-a85043242/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-link hover:underline"
            >
              Sujal Raj Pradhan
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
