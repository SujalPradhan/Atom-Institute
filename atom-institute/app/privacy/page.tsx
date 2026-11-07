import type { Metadata } from "next"
import { contact } from "@/lib/data"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Atom Institute handles the information of visitors to this website.",
}

export default function PrivacyPage() {
  return (
    <main className="page max-w-3xl">
      <div className="glass p-6 sm:p-10">
        <h1 className="page-title mb-2">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="space-y-8 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">Overview</h2>
            <p>
              Atom Institute respects your privacy. This website is an informational platform that
              shares study materials and details about our institute. We aim to collect as little
              personal information as possible.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">Information we collect</h2>
            <p>
              This site does not require you to create an account and does not run a backend that
              stores personal data. We do not sell or share personal information. If you contact us
              directly (for example by email or phone), we use that information only to respond to you.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">External links</h2>
            <p>
              Study materials may be hosted on third-party services such as Google Drive. When you
              follow those links you are subject to the privacy policies of those services.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">Contact</h2>
            <p>
              If you have any questions about this policy, reach us at{" "}
              <a href={`mailto:${contact.email}`} className="text-link underline-offset-4 hover:underline">
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
