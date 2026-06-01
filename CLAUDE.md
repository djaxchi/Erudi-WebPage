# Erudi Website — CLAUDE.md

## Project Overview

Marketing/product website for **Erudi**, a company with two offerings:
1. **Erudi (B2B)** — Bespoke enterprise AI solutions (on-premise, sovereign, GDPR-compliant). Main landing page at `/`.
2. **Erudi Desktop** — A no-code local LLM fine-tuning desktop app. Landing page at `/desktop`.

**Deployed to Hostinger** at `https://www.erudi.app` — automatically via GitHub Actions (`.github/workflows/deploy.yml`): on every push to `main` it runs `npm run build` and FTP-uploads `dist/` to the Hostinger web root. (The legacy `gh-pages` / `build:github` / `homepage` config remains in the repo but is **not** the live deploy path.)

## Tech Stack

- **Framework**: React 18 + TypeScript (Vite 6)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3 + custom CSS (`src/styles/`)
- **Animations**: Framer Motion v12
- **Icons**: Lucide React
- **Carousel**: framer-motion (custom deck in `ScreenshotCarousel`; Swiper is not used)
- **Deploy**: `gh-pages` via `npm run deploy`

## Project Structure

```
src/
  App.tsx                    # Root — BrowserRouter + all routes
  main.tsx                   # Entry point
  pages/
    HomePage.tsx             # B2B landing page (route: /)
    LandingPage.tsx          # Erudi Desktop landing (route: /desktop)
    DownloadPage.tsx         # Download / early access (route: /download)
    AboutPage.tsx            # About page (route: /about)
    ContactPage.tsx          # Contact form (route: /contact)
    WaitlistPage.tsx         # Waitlist signup (route: /waitlist)
  components/
    Navbar.tsx               # Fixed top nav — links: Home, Erudi Desktop, Contact Us
    PageLayout.tsx           # Shared layout: Navbar + grid background + radial gradients
    Footer.tsx               # Site footer
    AnimatedOrb.tsx          # Global animated orb (fixed, z-index 1, pointer-events-none)
    ChatSimulation.tsx       # Animated chat demo widget used on Home and Desktop pages
    GradientBox.tsx          # Reusable gradient card
    ScreenshotCarousel.tsx   # framer-motion deck carousel for screenshots
  assets/
    animatedSection.tsx      # AnimatedSection wrapper (intersection-observer fade-in)
    useIntersectionObserver.tsx
  utils/
    assetPath.ts             # getAssetPath() — prepends /Erudi/ in github mode
    imageOptimization.ts     # preloadImages() helper + CRITICAL_IMAGES list
  styles/
    styles.css               # Global custom styles (grid-background, animate-scroll, etc.)
    performance.css          # Performance-related CSS
```

## Routing & Base URL

- Dev (`npm run dev`): `base = /`
- GitHub Pages (`npm run build:github`): `base = /Erudi/`
- `BrowserRouter` reads `import.meta.env.BASE_URL` at runtime for `basename`.
- Asset paths use `getAssetPath()` from `src/utils/assetPath.ts` — always use this for static assets in `/public`.

## Design System

- **Background**: `#050a0f` (near-black navy)
- **Primary accent**: Emerald — `emerald-400` / `emerald-500` / `emerald-600`
- **Text**: White, `white/70`, `gray-300`, `gray-400`
- **Cards**: `white/[0.04]` background, `white/[0.06]` on hover, `white/[0.1]` borders
- **Animated grid**: `.grid-background` class defined in `styles.css`
- **Glow shadows**: `shadow-[0_0_40px_rgba(0,193,124,0.4)]` for CTA buttons

## Common Patterns

- All pages wrap content in `<PageLayout activePage="...">` which renders `Navbar` + background layers.
- Scroll animations use `framer-motion` `whileInView` with `viewport={{ once: true }}`.
- `AnimatedSection` is a lightweight wrapper that uses `useIntersectionObserver` for fade-in.
- Chat simulation (`ChatSimulation`) cycles through `ChatScenario[]` — pass `scenarios` prop for custom content.

## Dev Commands

```bash
npm run dev          # Start local dev server (localhost:5173)
npm run build        # Production build
npm run build:github # Build for GitHub Pages (base=/Erudi/)
npm run deploy       # Build + push to gh-pages branch
npm run lint         # ESLint
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | All routes defined here |
| `src/components/Navbar.tsx` | Nav items — edit here to add/remove links |
| `src/pages/HomePage.tsx` | B2B hero, pain points, solution cards, CTA |
| `src/pages/LandingPage.tsx` | Desktop app hero, features grid, CTA |
| `src/utils/assetPath.ts` | Must use for all `/public` asset references |
| `tailwind.config.js` | Tailwind config — custom animations (`animate-scroll`) defined here |

## SEO

> Full reference: **[SEO.md](./SEO.md)** — component API, prerender pipeline, per-page metadata, sitemap/robots, and the checklist for adding SEO to a new route.

- **Canonical domain**: `https://www.erudi.app` (constant `SITE_URL` in `src/components/Seo.tsx`).
- **Per-page meta**: each page renders `<Seo .../>` (via `react-helmet-async`, provider wired in `src/main.tsx`). It owns `<title>`, meta description, canonical, Open Graph, Twitter Card and optional JSON-LD. Props: `{ title, description, path, image?, type?, noindex?, jsonLd? }`. `path` is the route (e.g. `/desktop`); canonical/og:url are derived as `SITE_URL + path`.
- **index.html** holds only static head (charset, viewport, theme-color, favicon, manifest, fonts) plus a fallback `<title>`. All variable/social tags are Helmet-owned to avoid duplicates in prerendered output.
- **JSON-LD**: Home = Organization + WebSite; `/desktop` & `/download` = SoftwareApplication (free, macOS/Windows/Linux); `/contact` = ContactPage.
- **Prerendering**: `npm run build` runs a `postbuild` step (`scripts/prerender.mjs`) that serves `dist/` with `sirv`, drives Puppeteer (headless Chromium, Apple-Silicon safe) over each route in `ROUTES` (`/`, `/desktop`, `/download`, `/team`, `/contact`, `/waitlist` — `/about` excluded as it redirects), and writes per-route static HTML (`dist/<route>/index.html`) with the correct Helmet head baked in. This is what gives non-JS crawlers (LinkedIn/Facebook/X) correct per-page link previews.
- `build:github` (base `/Erudi/`) intentionally does NOT prerender. **Deploy is automated**: pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` (base `/`, incl. prerender) and FTP-uploads `dist/` to Hostinger. The prerender (`scripts/prerender.mjs`) runs headless in CI, so it must not depend on third-party network (it uses `domcontentloaded` + waits for `#root` to mount, and aborts external font requests — do not reintroduce `networkidle0`).
