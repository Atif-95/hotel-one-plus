# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack by default in Next.js 16)
npm run build    # Production build (also Turbopack by default)
npm run start    # Start production server
npm run lint     # Run ESLint
```

There are no tests in this project.

## Next.js 16 Breaking Changes

This project uses **Next.js 16.2.9**. Key breaking changes from prior versions:

**Async Request APIs (fully removed synchronous access):**
- `params` and `searchParams` in pages/layouts are now `Promise` — always `await` them:
  ```tsx
  export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  }
  ```
- Same applies to `cookies()`, `headers()`, `draftMode()`.

**Turbopack is the default** for both `next dev` and `next build`. There is no custom `webpack` config here, so this is fine.

**`revalidateTag` requires a second argument:**
```ts
revalidateTag('posts', 'max')  // second arg is a cacheLife profile
```

**React 19.2** features are available: `ViewTransition`, `useEffectEvent`, `Activity`.

Run `npx next typegen` to auto-generate `PageProps`/`LayoutProps`/`RouteContext` type helpers when adding new dynamic routes.

## Architecture

**Single Next.js app, App Router, all pages are `'use client'`.**

All data lives in `public/db.json` — there is no backend, no API routes, no database. Every page fetches this file on mount:

```ts
useEffect(() => {
  fetch('/db.json').then(r => r.json()).then(setData)
}, [])
```

Admin changes (room edits, booking status) are **in-memory only** — they do not persist to `db.json`.

### Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage (hero, rooms preview, testimonials) |
| `/rooms` | `app/rooms/page.tsx` | Room gallery with type filter + booking modal |
| `/gallery` | `app/gallery/page.tsx` | Photo gallery with lightbox |
| `/about` | `app/about/page.tsx` | Team, values, stats |
| `/contact` | `app/contact/page.tsx` | Contact form (no backend submission) |
| `/admin` | `app/admin/page.tsx` | Login page |
| `/admin/dashboard` | `app/admin/dashboard/page.tsx` | CRM: rooms, bookings, reviews |

Shared layout components (`Navbar`, `Footer`) live in `app/components/`.

### Authentication

Credentials are in `public/db.json` under `admin`. On login, `localStorage.setItem('hop_admin', JSON.stringify({ name, loggedIn: true }))` is set. The dashboard reads this key on mount and redirects to `/admin` if absent.

### Styling

Tailwind CSS v4 (PostCSS). Design tokens are CSS variables defined in `app/globals.css`:
- `--color-navy: #0d1b2a`, `--color-gold: #b8892a`, `--color-cream: #f5f0e8`
- Utility classes: `.btn-gold`, `.btn-outline`, `.gold-divider`, `.card-hover`, `.gold-text`

Pages mix Tailwind classes with inline `style` objects — both are in use, prefer the existing pattern in the file being edited.

### Images

Remote images are served from `images.unsplash.com` (configured in `next.config.ts`). Use the Next.js `<Image>` component with `fill` for those; local assets go in `public/`.