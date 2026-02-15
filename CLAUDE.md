# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Next.js dev server (localhost:3000, uses Turbopack)
pnpm build        # Build Next.js application
pnpm lint         # Run ESLint (flat config, core-web-vitals + typescript)
pnpm cf-build     # Build for Cloudflare Workers (runs next build + opennextjs-cloudflare)
pnpm preview      # Preview Cloudflare Workers build locally
pnpm deploy       # Deploy to Cloudflare Workers
```

No test suite is configured.

## Architecture

**Stack**: Next.js 16 (App Router) + React 19 + TypeScript, deployed to Cloudflare Workers via `@opennextjs/cloudflare`. Styled with Tailwind CSS v4 and shadcn/ui (New York style). Package manager is pnpm.

**Key features enabled in next.config.ts**: React Compiler (auto-memoization), Turbopack, View Transitions API.

### Layout

The root layout (`app/layout.tsx`) wraps all pages with:
- `CanvasProvider` — React context managing generative art parameters
- `CanvasBackground` — full-page p5.js terrain visualization (dynamically imported, client-only)
- `TopNav` — fixed header with navigation and social links
- `ViewTransition` — wraps page content for fade transitions between routes
- `SettingsToggle` — opens a drawer to adjust canvas parameters

Dark mode is always on (`<html className="dark">`). Font is Plus Jakarta Sans.

### Routes

- `/` — Landing page with animated typewriter subtitle
- `/experience` — Professional history with role cards and a scroll-tracking sidebar nav (`StripeNav`, desktop-only)

### Directory Layout

- `app/` — Next.js App Router pages and layouts
- `components/` — React components; `components/ui/` contains shadcn/ui primitives
- `lib/` — Utilities and data: `experience-data.ts` (career roles array), `canvas-types.ts` (CanvasParams interface), `utils.ts` (cn() helper for class merging)

### Canvas System

The generative art background uses p5.js with a grid-based terrain and Perlin noise. State flows through React context (`CanvasProvider` → `useCanvas` hook). The `SettingsDrawer` lets users adjust parameters (seed, peaks, noise, contours, wave properties, color palette) which update the canvas in real-time via a mutable ref (`paramsRef`).

### Deployment

Cloudflare Workers via `wrangler.jsonc`. CI/CD is GitHub Actions (`.github/workflows/deploy.yml`) — pushes to `main` trigger `cf-build` then deploy. Custom domains: lucashomer.com and www.lucashomer.com.

## Conventions

- `"use client"` directives on components that need browser APIs (canvas, intersection observer, animations)
- Path alias `@/*` maps to the project root
- The `gh` CLI is installed — use it for GitHub operations
- No emojis in code or commit messages
- Use `knip` to remove unused code when making large changes

### Code Style

- Only create an abstraction if it's actually needed
- Prefer clear function/variable names over inline comments
- Avoid helper functions when a simple inline expression would suffice

### React

- React Compiler is enabled — skip manual `useMemo`/`useCallback`
- Avoid massive JSX blocks; compose smaller components
- Colocate code that changes together
- Avoid `useEffect` unless absolutely needed

### Tailwind

- Mostly use built-in values, occasionally allow dynamic values, rarely globals
- Always use v4 + global CSS file format + shadcn/ui
- shadcn/ui components live in `components/ui/` and are added via the `shadcn` CLI
- OKLch CSS custom properties are defined in `globals.css`

### Next.js

- Content pages use MDX
- Prefer fetching data in RSC (page can still be static)
- Use `next/font` + `next/script` when applicable
- For above-the-fold images, use `priority` on `next/image`
- Be mindful of serialized prop size for RSC -> child components

### TypeScript

- Don't unnecessarily add try/catch
- Don't cast to `any`
