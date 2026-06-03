# Erudi Website - SEO Guide

This document is the single source of truth for how SEO works on the Erudi site. Read it before touching anything that affects metadata, routing, or the build. Keep it up to date when you change the SEO setup.

---

## 1. Principles (the basis we work from)

1. **Every route is independent.** Each page owns a unique `<title>`, meta description, canonical URL, Open Graph + Twitter tags, and (where relevant) JSON-LD. No two pages share a title or description.
2. **Tags are baked into static HTML at build time.** The site is a Vite + React SPA, but we prerender each route to a real static `.html` file so non-JS crawlers (LinkedIn, Facebook, X/Twitter, Slack) get correct per-page link previews - not just Googlebot.
3. **One canonical domain:** `https://www.erudi.app`. All canonical/OG/sitemap URLs use it. Defined once as `SITE_URL` in `src/components/Seo.tsx`.
4. **`index.html` is static-only.** It holds invariant head elements (charset, viewport, favicon, manifest, fonts, theme-color) plus a fallback `<title>`. All variable, per-page SEO is owned by the `<Seo>` component via `react-helmet-async`. Do **not** put page-specific meta back into `index.html`.
5. **Two distinct products - keep their SEO separate.**
   - **Erudi (B2B)** - bespoke, turnkey AI consulting for SMEs/mid-market. Home `/`.
   - **Erudi Desktop** - free, open-source, no-code *local* LLM fine-tuning desktop app. `/opensource`, `/download`.

---

## 2. Architecture at a glance

```
Page component  →  <Seo title description path jsonLd … />   (react-helmet-async)
                          │  injects head tags at runtime
                          ▼
npm run build  →  vite build  →  postbuild: scripts/prerender.mjs
                          │  headless Puppeteer visits each route,
                          │  waits for Helmet to flush, snapshots the DOM
                          ▼
dist/<route>/index.html   ← static HTML with per-page tags baked in
                          │
                          ▼
Upload dist/ to Hostinger (Apache, domain root https://www.erudi.app/)
```

---

## 3. Key files

| File | Role |
|------|------|
| `src/components/Seo.tsx` | Reusable Helmet wrapper. Exports `SITE_URL`. Single place that defines the tag set. |
| `src/main.tsx` | Wraps the app in `<HelmetProvider>` (required for Helmet to work). |
| `scripts/prerender.mjs` | Build-time prerender. Serves `dist/`, drives Puppeteer over the route list, writes per-route static HTML. |
| `index.html` | Static head only + fallback `<title>`. |
| `public/robots.txt` | Allows all crawlers, points to sitemap. |
| `public/sitemap.xml` | Lists indexable routes with `lastmod`/`changefreq`/`priority`. |
| `public/site.webmanifest` | PWA manifest (name, colors, icon). |
| `public/og-image.png` | 1200×630 social share card (green "erudi" wordmark on `#050a0f`). |
| `public/icon.png` | Favicon / apple-touch-icon (512×512 square). |
| `package.json` | `build` + `postbuild` (prerender) scripts. |

---

## 4. The `<Seo>` component

`src/components/Seo.tsx`. Drop one at the top of a page's returned JSX.

### Props

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `title` | string | ✅ | Aim ~50-60 chars. Shown in tab + search result + OG/Twitter title. |
| `description` | string | ✅ | Aim ~150-160 chars. Used for meta description + OG/Twitter description. |
| `path` | string | ✅ | Route path with leading slash, e.g. `"/opensource"`. Use `"/"` for home. Builds canonical + `og:url`. |
| `image` | string | - | Path or absolute URL to the social image. Defaults to `/og-image.png`. Relative paths are absolute-ized against `SITE_URL`. |
| `type` | `'website' \| 'article'` | - | Defaults to `website`. |
| `noindex` | boolean | - | `true` emits `robots: noindex, nofollow`. Use for thank-you/confirmation pages you don't want indexed. |
| `jsonLd` | object \| object[] | - | One or more JSON-LD blocks. Stringified into `<script type="application/ld+json">`. |

### What it renders
`<title>`, `meta name="title"`, `meta description`, `meta robots`, `link canonical`, full Open Graph set (`og:type/site_name/url/title/description/image` + `og:image:width 1200` / `og:image:height 630` / `og:locale en_US`), Twitter `summary_large_image` set (`twitter:card/url/title/description/image`), and any `jsonLd` blocks.

### Example

```tsx
import Seo from '../components/Seo';

const DownloadPage = () => (
  <PageLayout activePage="download">
    <Seo
      path="/download"
      title="Download Erudi Desktop - Free & Open Source"
      description="Download Erudi Desktop for macOS, Windows and Linux. No-code local LLM fine-tuning, 100% on your machine. Free forever, fully open source."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Erudi Desktop',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'macOS, Windows, Linux',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      }}
    />
    {/* page content */}
  </PageLayout>
);
```

---

## 5. Current per-page metadata

| Route | Page | Title | JSON-LD |
|-------|------|-------|---------|
| `/` | HomePage | Erudi - Bespoke, Turnkey AI Solutions for Your Business | Organization + WebSite |
| `/opensource` | OpenSourcePage | Erudi Desktop - No-Code Local LLM Fine-Tuning | SoftwareApplication |
| `/download` | DownloadPage | Download Erudi Desktop - Free & Open Source | SoftwareApplication |
| `/team` | TeamPage | The Erudi Team - AI Engineers & Researchers | - |
| `/contact` | ContactPage | Contact Erudi - Talk to Our AI Team | ContactPage |
| `/waitlist` | WaitlistPage | Join the Erudi Waitlist | - |
| `/about` | → redirects to `/opensource` | (not prerendered, excluded) | - |

> When you change a page's purpose or copy, update its `<Seo>` title/description to match. Stale or generic descriptions are the most common SEO regression.

---

## 6. Prerender pipeline

`scripts/prerender.mjs`, run automatically by the `postbuild` npm hook (i.e. after `npm run build`).

- Serves the freshly built `dist/` over a local HTTP server. Static assets are served by `sirv`; every *navigation* request returns the **pristine build shell** (the un-rendered `index.html`) so React mounts cleanly with `createRoot`.
- Launches headless Puppeteer (`--no-sandbox`), visits each route in `ROUTES`, waits for `networkidle0` + 400 ms so `react-helmet-async` can flush its head tags, then snapshots `document.documentElement.outerHTML` and writes it to `dist/<route>/index.html`.
- `ROUTES` (line ~13): `['/', '/opensource', '/download', '/team', '/contact', '/waitlist']`. `/about` is intentionally excluded because it's a redirect.

**Why Puppeteer instead of SSG/react-snap:** the site uses WebGL (`FluidShader`), framer-motion and Swiper. Running components in Node (true SSG) would crash on missing `window`/WebGL. A real headless browser renders the actual DOM, so everything works and we just snapshot the result. (react-snap was rejected - it pins an ancient Puppeteer that fails on Apple Silicon.)

---

## 7. Static SEO assets

- **`public/robots.txt`** - `Allow: /` for all agents + `Sitemap: https://www.erudi.app/sitemap.xml`.
- **`public/sitemap.xml`** - one `<url>` per indexable route. **Maintenance:** when you add/remove a route, update this file; bump `<lastmod>` (YYYY-MM-DD) when a page's content meaningfully changes.
- **`public/site.webmanifest`** - PWA manifest; `theme_color`/`background_color` = `#050a0f`.
- **`public/og-image.png`** - 1200×630 default social card. Override per page via the `image` prop if a page warrants a custom card.
- **`public/icon.png`** - favicon + apple-touch-icon, 512×512 square (a multiple-of-48 size Google is happy with). Everything references `/icon.png`.

---

## 8. Build & deploy

```bash
npm run build      # tsc + vite build (base "/") + postbuild prerender
```

**Deploy is automated.** Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` on a CI runner and FTP-uploads `dist/` to the Hostinger web root. You normally don't deploy by hand - just push to `main`.

> ⚠️ Because the prerender runs headless on CI, `scripts/prerender.mjs` must not depend on third-party network. It uses `waitUntil: 'domcontentloaded'`, waits for `#root` to mount, and aborts external (font) requests. Do **not** switch back to `networkidle0` - Google Fonts requests never settle on CI and the build hangs/fails.

- **Production = `npm run build`.** It uses Vite's default base `/`, which matches the Hostinger root deployment, and triggers the prerender via `postbuild`.
- **Do NOT use `build:github` for erudi.app.** It builds with base `/Erudi/` (GitHub Pages subpath) and would break all root-absolute asset and SEO paths. The `gh-pages`/`build:github`/`homepage` entries in `package.json` are legacy/secondary.
- The live site runs on **Hostinger (Apache)** at the domain root; `public/.htaccess` provides the SPA rewrite and is copied into `dist/`.

After deploying SEO changes, in **Google Search Console**: submit/ping `sitemap.xml` and request re-indexing of changed URLs so cached snippets refresh.

---

## 9. How to add SEO for a new page

1. Add the route in `src/App.tsx`.
2. Add a `<Seo …/>` at the top of the page component with a unique title + description (and JSON-LD if it represents an entity like software, an article, or an organization).
3. **Add the path to `ROUTES` in `scripts/prerender.mjs`** - otherwise it won't be prerendered to static HTML.
4. Add a `<url>` entry to `public/sitemap.xml`.
5. Run `npm run build` and confirm `dist/<route>/index.html` exists with the right `<title>`/description.

> Pages you do NOT want indexed (e.g. confirmation pages): pass `noindex` to `<Seo>` and leave them out of `sitemap.xml` (and usually out of `ROUTES`).

---

## 10. Conventions & copy guidelines

- **Titles:** ~50-60 chars, `Page Topic - Erudi context`. Front-load the keyword.
- **Descriptions:** ~150-160 chars, active voice, one concrete value prop. Match the page's actual content; don't reuse another page's text.
- **Canonical:** always `SITE_URL + path`, no trailing slash except home (`/`). The component handles this - pass a clean `path`.
- **Keep the two products distinct** in wording (see §1.5). Don't describe the B2B consulting offering on Desktop pages or vice-versa.
- **Language:** SEO copy is in the site's default language (English). If/when full i18n SEO is needed, that's a future extension - the `<Seo>` component would take locale-aware copy.

---

## 11. Verifying SEO locally

```bash
npm run build
# titles per route:
grep -o '<title>[^<]*</title>' dist/index.html dist/opensource/index.html dist/contact/index.html
# canonical / og for one route:
grep -oE 'rel="canonical"[^>]*|property="og:title"[^>]*' dist/opensource/index.html
```

Each `dist/<route>/index.html` should contain exactly one head `<title>`, one `description`, one `og:title`, one canonical. (Note: a `<title` grep count above 1 can come from inline SVG `<title>` elements in the body - check it's the head one that's unique.)

---

## 12. Known gotchas

- **Helmet needs `<HelmetProvider>`** in `src/main.tsx` - if it's removed, no tags render.
- **New route not showing custom tags when shared on LinkedIn?** It was probably not added to `ROUTES` in `scripts/prerender.mjs`, so only the JS-rendered (Google-only) version has tags.
- **`npm run lint`** currently reports pre-existing errors unrelated to SEO (generated `.vite/deps/*` files and one unused var in `src/utils/imageOptimization.ts`). Consider adding `.vite/` to ESLint ignores; don't let these mask new errors.
- **Don't reintroduce per-page meta into `index.html`** - it causes duplicate/conflicting tags in the prerendered output.
