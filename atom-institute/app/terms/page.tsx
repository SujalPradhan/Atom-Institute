import type { Metadata } from "next"
import { contact } from "@/lib/data"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Atom Institute website.",
}

export default function TermsPage() {
  return (
    <main className="page max-w-3xl">
      <div className="glass p-6 sm:p-10">
        <h1 className="page-title mb-2">
          Terms of Service
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="space-y-8 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">Use of this website</h2>
            <p>
              This website provides educational information and study materials for students of
              classes 10, 11, and 12. You may use it for personal, non-commercial, educational
              purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">Content</h2>
            <p>
              We strive to keep the information on this site accurate and up to date, but we make no
              warranties about its completeness or accuracy. Study materials are provided as-is and
              may be updated or removed at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">Third-party resources</h2>
            <p>
              Some materials link to third-party services such as Google Drive. We are not
              responsible for the content or availability of those external resources.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
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
