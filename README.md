# Atom Institute

A standalone educational website for students of classes 10, 11, and 12 across the ICSE, CBSE, and Madhyamik boards.

## Overview

Atom Institute is a fully static **Next.js** frontend — there is **no backend or database**. All content (classes, subjects, faculty, testimonials, gallery, and study-material links) lives in a single typed data module, [`atom-institute/lib/data.ts`](atom-institute/lib/data.ts). Editing that file is all it takes to update the site's content.

The site features:

- Home, Classes, Gallery, Testimonials, and About pages
- A class → board flow that links to Google Drive study-material folders
- Responsive design (mobile nav included), built with Tailwind CSS and shadcn/ui
- Per-page SEO metadata, a custom 404, and an error boundary

## Project structure

```
atom-institute/
  app/             # Next.js App Router pages
  components/      # Header, Footer, and shadcn/ui primitives
  lib/
    data.ts        # All site content (edit here to update the site)
    utils.ts       # cn() helper
  public/images/   # Logo and photos
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

Everything the site renders is in `atom-institute/lib/data.ts`:

- **Classes / subjects / faculty / testimonials / gallery** — edit the exported arrays.
- **Study-material links** — fill in the `driveLinks` map with Google Drive folder URLs, keyed by `"${classNumber}-${BOARD}"` (e.g. `"10-CBSE"`). An empty value shows a friendly "coming soon" message instead of a broken link.
- **Contact details / social links** — edit the `contact` and `socialLinks` objects. Empty social URLs are hidden automatically.

## Deployment

The site is a standard Next.js app and deploys cleanly to any Node host (e.g. **Vercel**):

```bash
npm run build && npm start
```

## License

[MIT License](LICENSE)

## Contact

For inquiries, reach out to contact@atominstitute.edu
