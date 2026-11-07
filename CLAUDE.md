# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Two apps:
- `atom-institute/`: **Next.js 15 (App Router) + React 19 + TypeScript** site for Atom Institute (www.atomkpg.in). Content is static data compiled into the app.
- `backend/`: small **Hono** service on **Google Cloud Run** for MCQ tests. Tests and attempts are JSON objects in a Cloud Storage bucket (no database).

## Commands

Frontend (run from `atom-institute/`):

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build, strict TS + ESLint
npm start            # serve production build
npm run lint
```

Backend (run from `backend/`):

```bash
npm install
STORAGE_DIR=./data TEACHER_KEY=secret npm run seed   # local storage mode
STORAGE_DIR=./data TEACHER_KEY=secret npm run dev
./deploy.sh <GCP_PROJECT_ID> [REGION]               # idempotent per-client deploy
```

There is no test suite. `npm run build` must pass clean (TS/ESLint errors are not suppressed).

## Architecture

### Content: `lib/data.ts` and `lib/syllabus.ts`
- `lib/data.ts`: `classes`, `boards`, `subjects`, `faculty`, `testimonials`, `gallery`, `contact`, `socialLinks`, `driveLinks`. Rendering is synchronous.
- `lib/syllabus.ts`: the Learning Hub catalogue. `courses` (class × board × subject) with `chapters`, each holding optional `notes`, `ppt`, `solved` (Notion/Drive links) and `mcq` (`{ title, code }`). Add a resource by adding one entry to a chapter.
- **Class IDs vs class numbers:** route `id` (1, 2, 3) vs displayed `classNumber` (10, 11, 12). `getClassById(id)` resolves.
- `driveLinks` is keyed `"${classNumber}-${BOARD}"`; `getDriveLink` returns the URL or `null`. A set URL shows on the batch page.

### Routes
- `/classes` Learning Hub home (search + batch cards) → `/classes/[class]` board picker → `/classes/[class]/[board]` subjects → `/[subject]` chapters → `/[chapter]?tab=notes|ppt|solved|mcq`. All dynamic routes validate, `notFound()` on bad params, and use `generateStaticParams`.
- `/tests` student MCQ flow (name + class/board + code; `?code=` prefills). `/tests/results` teacher view (code + teacher key).

### MCQ backend wiring
- The browser calls same-origin `/api/mcq/*`; `next.config.mjs` rewrites it to `MCQ_API_URL` (read at **build time**; set in Vercel Production env). `lib/mcq.ts` is the typed client.
- API: `GET /tests/:code` (no answers), `POST /tests/:code/attempts` (server-side marking), `GET /tests/:code/attempts` (header `x-teacher-key`). Health: `/health` (`/healthz` is intercepted on Cloud Run).
- Each client gets its own GCP project via `deploy.sh`; `ALLOWED_ORIGINS` env overrides the default atomkpg.in origins. The teacher key lives only in Cloud Run env, never in the repo.

### Page pattern: server wrapper + client content
- `app/<route>/page.tsx`: **server** component exporting `metadata`/`generateMetadata`, renders the client component.
- `app/<route>/<name>-content.tsx`: `"use client"` UI. Components using `useSearchParams` are wrapped in `Suspense`.

### Conventions
- UI is **shadcn/ui** in `components/ui/`, `cn()` from `lib/utils.ts`, icons from `lucide-react`, toasts via **sonner** (mounted once in `app/layout.tsx`, follows the theme).
- Import alias `@/*` → project root.
- **Light + dark themes**: Tailwind `darkMode: ["class"]`. `components/theme-provider.tsx` (light/dark/system, persisted as `atom-theme`, no `next-themes`) plus an inline init script in `<head>` to avoid a flash. Colours come from CSS variables in `app/globals.css` (`:root` and `.dark`); use token classes (`text-foreground`, `text-muted-foreground`, `bg-primary`, `text-link`, `bg-success`, `bg-danger`) rather than raw palette classes.
- Glass look: reuse `.glass`, `.glass-hover`, `.page`, `.page-title`, `.page-lead`, `.section-title`, `.field`, `.field-label`, `.row-link` from `globals.css`. Avoid nested `backdrop-blur`.
- Brand: `components/atom-mark.tsx` is the vector logo (orbits use `currentColor`, lighten in dark mode). Static assets in `public/brand/`; favicon/app icons are `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/manifest.ts`.
- SEO: `app/layout.tsx` sets `metadataBase` and a `%s | Atom Institute` title template.
- Custom `app/not-found.tsx` and `app/error.tsx`.

## Deployment
- Frontend: Vercel project `sujals-projects-930e531c/atom-institute`, not Git-connected. Deploy from `atom-institute/` with `npx vercel deploy --prod` (preview: `npx vercel deploy --build-env MCQ_API_URL=<url>`).
- Backend: `backend/deploy.sh` (Cloud Run service `atom-mcq`, bucket `atom-mcq-<PROJECT_ID>`).
