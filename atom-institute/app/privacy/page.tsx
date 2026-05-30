import type { Metadata } from "next"
import { contact } from "@/lib/data"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Atom Institute handles the information of visitors to this website.",
}

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col py-12 bg-white">
      <div className="container max-w-3xl px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Overview</h2>
            <p>
              Atom Institute respects your privacy. This website is an informational platform that
              shares study materials and details about our institute. We aim to collect as little
              personal information as possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Information we collect</h2>
            <p>
              This site does not require you to create an account and does not run a backend that
              stores personal data. We do not sell or share personal information. If you contact us
              directly (for example by email or phone), we use that information only to respond to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">External links</h2>
            <p>
              Study materials may be hosted on third-party services such as Google Drive. When you
              follow those links you are subject to the privacy policies of those services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Contact</h2>
            <p>
              If you have any questions about this policy, reach us at{" "}
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
