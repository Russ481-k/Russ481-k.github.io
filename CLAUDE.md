# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (EN/KO) developer portfolio and blog built with Next.js 13 App Router, statically exported to GitHub Pages.

## Commands

```bash
npm run dev           # Start dev server
npm run build         # Production build (runs generate-posts-db.ts as prebuild)
npm run start         # Serve static output from out/
npm run lint          # ESLint (next/core-web-vitals)
npm run deploy        # Build + deploy to GitHub Pages via gh-pages
npm run generate:db   # Regenerate post database (tsx src/scripts/generate-posts-db.ts)
npm run convert:md    # Convert markdowns (tsx src/scripts/convert-markdowns.ts)
```

## Architecture

### Routing

- **Root** (`/`) redirects to `/{lang}` based on detected language
- **`/[lang]`** — dynamic language segment (en, ko) with `generateStaticParams`
- **`/admin`** — admin dashboard with post editor (Lexical rich text editor)
- **API routes**: `GET /api/posts` (all posts), `GET /api/post/[slug]` (single post)

### Content System

- Markdown files live in `/posts/en/` and `/posts/ko/` with YAML front matter (title, date, category, tags, thumbnail, description)
- `gray-matter` parses front matter; `marked`/`remark`/`react-markdown` render HTML
- Pre-build script `generate-posts-db.ts` processes posts into a database before each build
- Categories: all, projects, about, career, architecture, database, backend, frontend

### Key Patterns

- **Static export**: `output: "export"` in next.config.js, images unoptimized
- **i18n**: i18next with browser language detection, resources in `src/app/i18n/`
- **Styling**: SCSS in `src/app/Styles/` — variables in `_variables.scss`, mixins in `_mixins.scss`, responsive breakpoints at 768px/1024px/1280px, dark blue theme (#0e2954) with glass morphism
- **Path alias**: `@/*` maps to `./src/*`
- **State**: React hooks only (no external state library)
- **Modals**: Portal-based pattern via `ModalPortal.tsx`

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages using `gh-pages`.
