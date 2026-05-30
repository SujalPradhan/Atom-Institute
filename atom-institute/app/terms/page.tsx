import type { Metadata } from "next"
import { contact } from "@/lib/data"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Atom Institute website.",
}

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col py-12 bg-white">
      <div className="container max-w-3xl px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Use of this website</h2>
            <p>
              This website provides educational information and study materials for students of
              classes 10, 11, and 12. You may use it for personal, non-commercial, educational
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Content</h2>
            <p>
              We strive to keep the information on this site accurate and up to date, but we make no
              warranties about its completeness or accuracy. Study materials are provided as-is and
              may be updated or removed at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Third-party resources</h2>
            <p>
              Some materials link to third-party services such as Google Drive. We are not
              responsible for the content or availability of those external resources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${contact.email}`} className="text-blue-700 hover:underline">
                {contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
