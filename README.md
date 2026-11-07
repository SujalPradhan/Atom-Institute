# Atom Institute

A standalone educational website for students of classes 10, 11, and 12 across the ICSE, CBSE, and Madhyamik boards.

## Overview

- **`atom-institute/`**: Next.js site with a light/dark glass UI. The **Classes** section is a Learning Hub: batches (class × board), subjects, and chapters with Notes, PPT, Solved Qs and MCQ Tests tabs. Notes and PPTs are Notion or Google Drive links kept in [`lib/syllabus.ts`](atom-institute/lib/syllabus.ts). Other content lives in [`lib/data.ts`](atom-institute/lib/data.ts).
- **`backend/`**: MCQ test service (Hono on Google Cloud Run, JSON in Cloud Storage). Students take a test with a code at `/tests`; teachers see scores at `/tests/results` with a teacher key. See [`backend/README.md`](backend/README.md).

## Project structure

```
atom-institute/
  app/             # App Router pages (classes hub, tests, ...)
  components/      # Header, footer, theme, logo, shadcn/ui primitives
  lib/
    data.ts        # Site content
    syllabus.ts    # Learning Hub chapters and resources
    mcq.ts         # MCQ API client
  public/brand/    # Logo (SVG, PNG, WebP) and app icons
backend/
  src/             # Hono app, storage (GCS or local dir)
  seed/            # Test definitions (e.g. DEMO10.json)
  deploy.sh        # Per-client Cloud Run deploy
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or higher
- npm (the repo is standardized on npm; a `package-lock.json` is committed)

## Getting started

```bash
cd atom-institute
npm install
npm run dev          # http://localhost:3000
```

## Common commands

Run all commands from the `atom-institute/` directory.

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server                 |
| `npm run build` | Production build (strict TS + ESLint checks) |
| `npm start`     | Serve the production build                   |
| `npm run lint`  | Run ESLint                                    |

## Editing content

- **Notes, PPTs, solved questions**: add `{ title, url }` to the chapter in `atom-institute/lib/syllabus.ts`.
- **MCQ tests**: add a JSON file to `backend/seed/`, run `backend/deploy.sh`, then add `{ title, code }` to the chapter's `mcq` list.
- **Classes, faculty, testimonials, gallery, contact, Drive folders**: `atom-institute/lib/data.ts`.

## Deployment

Merging a PR into `main` deploys automatically via [GitHub Actions](.github/workflows/ci-cd.yml): every PR builds both apps; on `main`, the backend deploys to Cloud Run (when `backend/` changed, keyless GCP auth via Workload Identity), then the site deploys to Vercel production and is smoke-tested. Requires the repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Manual deploys still work:

- Frontend: Vercel. Set `MCQ_API_URL` (the Cloud Run URL) in the Production environment, then `npx vercel deploy --prod` from `atom-institute/`.
- Backend: `cd backend && ./deploy.sh <GCP_PROJECT_ID> [REGION]`.

## License

[MIT License](LICENSE)

## Contact

For inquiries, reach out to contact@atominstitute.edu
