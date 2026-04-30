# Minova Commerce

Modern bilingual (EN / DE) B2B marketing site for Minova Commerce — a Swiss
trading and distribution practice. Connects manufacturers, suppliers and
customers across consumer, lifestyle and industrial markets.

## Stack

- **Next.js 16** (App Router, Turbopack) — React 19, TypeScript strict
- **Tailwind CSS v4** with custom design tokens
- **next-intl** — locale-prefixed routing (`/en`, `/de`) with translated pathnames
- **Framer Motion** + **Lenis** — scroll-driven animations and smooth scroll
- **react-globe.gl** + **three.js** — interactive 3D globe on `/network` and home
- **Codec Pro** (display) + **Inter** (body) via `next/font/local` & `next/font/google`
- **Zod** — server-side form validation

## Routes

| Locale | Pathnames |
|---|---|
| `en` | `/en`, `/en/about`, `/en/services`, `/en/industries`, `/en/network`, `/en/contact`, `/en/imprint`, `/en/privacy`, `/en/terms` |
| `de` | `/de`, `/de/ueber-uns`, `/de/leistungen`, `/de/branchen`, `/de/netzwerk`, `/de/kontakt`, `/de/impressum`, `/de/datenschutz`, `/de/agb` |

Root `/` redirects to the user's preferred locale (Accept-Language detection,
defaults to `en`).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values when integrating
the contact form with a transactional email provider.

```bash
cp .env.example .env.local
```

## Project structure

```
src/
  app/
    [locale]/          # all localized pages
      layout.tsx       # NextIntlClientProvider, header + footer + cookie banner
      page.tsx         # home
      about, services, industries, network, contact,
      imprint, privacy, terms, not-found
    api/contact        # POST endpoint (zod-validated, honeypot, rate-limited)
    not-found.tsx      # global fallback
    sitemap.ts, robots.ts, fonts.ts, globals.css
  components/
    layout/            # header, footer, language-switcher, cookie-banner, logo
    sections/          # hero, what-we-do, global-reach, how-we-work, …
    ui/                # button, reveal, count-up, hero-video-background, custom-cursor
    providers/         # smooth-scroll
  hooks/               # use-cookie-consent
  i18n/
    routing.ts         # locales, defaultLocale, pathnames map
    navigation.ts      # locale-aware Link, useRouter, getPathname
    request.ts         # server-side message loader
    messages/{en,de}.json
  lib/                 # site constants (SITE, LEGAL, NAV)
  proxy.ts             # next-intl middleware (Next 16 naming)
```

## Security

The build serves these headers (configured in `next.config.ts`):

- `Content-Security-Policy` (scoped to known asset hosts)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (deny camera, mic, geolocation, FLoC)
- `poweredByHeader: false`

The contact form additionally uses a hidden honeypot field, client-side and
in-memory IP rate-limiting (5 / minute / IP), HTML-tag stripping and Zod
schema validation on the server.

## Deployment

Optimised for Vercel. Push to the `main` branch; Vercel picks up
`next.config.ts` (including security headers) automatically. Configure the
env vars from `.env.example` in the Vercel project settings before going
live.

## License

© Minova Commerce Midzan. All rights reserved. This repository is private —
unauthorized reproduction or distribution is prohibited.
