# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **standalone, static Next.js 15 (App Router) + React 19 + TypeScript** marketing/education site for Atom Institute. There is **no backend** — all content is static data compiled into the app. The single application lives in `atom-institute/`; run all commands from there.

## Commands (run from `atom-institute/`)

```bash
npm install
npm run dev          # dev server on http://localhost:3000
npm run build        # production build — runs strict TS + ESLint checks
npm start            # serve production build
npm run lint         # next lint
```

There is no test suite. The build is the main correctness gate: `next.config.mjs` does **not** suppress TypeScript or ESLint errors (unlike the original scaffold), so `npm run build` must pass clean.

## Architecture

### Single source of content: `lib/data.ts`
All site content — `classes`, `boards`, `subjects`, `faculty`, `testimonials`, `gallery`, `contact`, `socialLinks`, and the `driveLinks` map — is exported as typed constants from `atom-institute/lib/data.ts`. Pages import directly from it; rendering is fully synchronous (no `fetch`, no env vars, no async data layer). To change site content, edit this file.

- **Class IDs vs class numbers:** `classes` uses a route `id` (1, 2, 3) distinct from the displayed `classNumber` (10, 11, 12). URLs use the id (`/classes/1`); UI and Drive keys use `classNumber`. `getClassById(id)` resolves one to the other.
- **Study-material links:** `driveLinks` is keyed `"${classNumber}-${BOARD}"` (board uppercased, e.g. `"10-CBSE"`), all empty placeholders by default. `getDriveLink(classNumber, board)` returns the URL or `null`. On the board page, a real URL opens in a new tab; `null` shows a `sonner` "coming soon" toast. Extend to per-subject by lengthening the key scheme.

### Page pattern: server wrapper + client content
React client components cannot export `metadata`, so each route that needs animation (framer-motion) is split:
- `app/<route>/page.tsx` — a small **server** component that exports `metadata` (or `generateMetadata` for the dynamic `[class]` route) and renders the client component.
- `app/<route>/<name>-content.tsx` — the `"use client"` component with the actual UI.

Follow this pattern when adding pages. The dynamic route `app/classes/[class]/page.tsx` resolves `params: Promise<{ class: string }>`, validates via `getClassById`, calls `notFound()` for invalid ids, and uses `generateStaticParams` to pre-render the three valid classes.

### Conventions
- UI is **shadcn/ui**: Radix primitives + `class-variance-authority` in `components/ui/`. `lib/utils.ts` exports `cn()`. Icons via `lucide-react`. Toasts via **sonner** (`components/ui/sonner.tsx`, mounted once in `app/layout.tsx`).
- Import alias `@/*` → project root.
- **Light theme only** — there is no dark mode or theme toggle; pages use explicit light colors (`bg-white`, `text-blue-900`, etc.). Don't reintroduce `next-themes`/dark-mode wording.
- SEO: `app/layout.tsx` sets `metadataBase` and a `%s | Atom Institute` title template; per-page `metadata` fills in the rest.
- Custom `app/not-found.tsx` and `app/error.tsx` handle 404s and runtime errors.
