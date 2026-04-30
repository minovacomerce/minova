# Minova Commerce — Brand & Project Brief

## Brand Colors

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `navy` (primary) | `#011125` | `1, 17, 37` | Dark backgrounds, primary brand color, navy logo |
| `white` | `#FFFFFF` | `255, 255, 255` | Light backgrounds, text on navy |

### Suggested extended palette (derived for UI states)
| Token | Hex | Usage |
|---|---|---|
| `navy-950` | `#011125` | Base brand navy |
| `navy-900` | `#06182E` | Slightly raised surfaces on dark bg |
| `navy-800` | `#0E2138` | Cards / elevated panels on dark bg |
| `navy-700` | `#1A2E47` | Borders, dividers on dark |
| `slate-300` | `#A4AAB1` | Muted text on dark |
| `slate-500` | `#5C6673` | Muted text on light |
| `accent` | `#E8B86D` | Optional warm gold accent for CTAs / highlights — sparingly |

> The accent gold is a suggestion that pairs well with deep navy — typical of premium B2B trading / commodities brands. Skip it if you want a strictly monochrome navy/white look.

---

## Typography

- **Headlines / display:** **Codec Pro** (already in logo) — bold weights for hero, semibold for section heads
- **Body / UI:** **Inter** — modern, neutral, pairs cleanly with Codec Pro's geometric character. Excellent at small sizes, has strong tabular figures (good for B2B numbers).
  - *Alternative if you want more character:* **General Sans** (Fontshare, free) — slightly warmer, very modern feel
  - *Alternative for a stricter look:* **Söhne** or **Neue Haas Grotesk** (paid)

**Recommendation: Codec Pro + Inter.** Inter is free via Google Fonts, renders perfectly on the web, and does not fight Codec Pro for attention.

---

## Logo Assets (in this folder)

| File | Purpose |
|---|---|
| `minova-logo-navy.png` | Full wordmark, navy — for white/light backgrounds |
| `minova-logo-white.png` | Full wordmark, white — for navy/dark backgrounds |
| `minova-logo-navy-header.png` | Header-optimized (80px tall, retina-ready) |
| `minova-logo-white-header.png` | Header-optimized (80px tall, retina-ready) |
| `minova-icon-navy.png` | Icon only (the geometric "M" mark), navy |
| `minova-icon-white.png` | Icon only, white |
| `minova-icon-navy-256.png` | Icon, 256×256 (OG image base, app icons) |
| `minova-icon-white-256.png` | Icon, 256×256 |
| `favicon-16.png` / `favicon-32.png` | Favicons |
| `apple-touch-icon.png` | iOS home screen icon, 180×180 |

All logos are PNG with transparent backgrounds — drop them in directly.

---

## Visual Direction

- **Header:** White background, navy logo, navy text. Minimal, generous whitespace, sticky on scroll with subtle blur backdrop on scroll.
- **Rest of site:** Predominantly navy `#011125` background with white text, broken up by alternating sections (occasional white sections for contrast and to "breathe").
- **Mood:** Premium B2B, global trading, infrastructure-grade. Think: Stripe meets a luxury commodities firm. Clean grids, sharp typography, restrained motion.

### Required interaction quality
- Smooth scroll-driven animations (Framer Motion + Lenis)
- Magnetic / hover-tracking buttons
- Subtle parallax on hero elements
- Animated text reveals (split-text on scroll into view)
- A looping muted hero video or animated WebGL/SVG background (containers, ports, networks, abstract grid)
- Marquee of partner-style logos (placeholders for now)
- Cursor-aware card tilts on key feature blocks
- Page transitions between routes (View Transitions API or framer-motion AnimatePresence)

---

## Recommended Tech Stack

```
Next.js 15 (App Router) + React 19
TypeScript
Tailwind CSS v4
Framer Motion (animations)
Lenis (smooth scroll)
GSAP (heavier scroll-driven sequences if needed)
shadcn/ui (base components, restyled to brand)
next/font for Codec Pro (self-hosted) + Inter (Google)
next/image + next/video for media
```

Deploy target: Vercel. Repo: Git (push only when finished).

---

## Site Structure (proposed)

```
/                     Home — hero, value prop, what we do, partners, CTA
/about                Story, mission, team, network
/services             4–6 service pillars (sourcing, distribution,
                      brokerage, intermediation, logistics support, QC)
/industries           Consumer goods · Lifestyle · Industrial — case-style cards
/network              Global partner & supplier network — animated map / stats
/contact              Contact form, phone (076 425 04 53), location
```

Optional: `/insights` (blog/news) — can be added later.

### Navigation
Mega-menu style on desktop with animated reveal. Full-screen overlay menu on mobile with staggered link animation.

---

## Copy Direction

Brand voice: **Confident, precise, global, understated.** B2B — never salesy. Short sentences. Active verbs. Numbers and specifics over adjectives.

Hero candidates:
1. *"Connecting markets. Moving products. Building partnerships."*
2. *"The link between manufacturers, suppliers, and the world."*
3. *"Trade, distributed."*
4. *"Where global supply meets local demand."*

I'll draft full copy for every page once we start in Claude Code.

---

## What I need from you before we start in Claude Code

Nothing critical — we have everything we need. But these would make the site stronger:

1. **Codec Pro font files** (`.woff2` / `.otf`) — if you have the licensed files, drop them in `/public/fonts/`. If not, I'll set up the loading code with placeholders and you add the files when they arrive.
2. **Hero video / imagery** — do you have any footage (warehouses, ports, products, abstract B2B)? If not, I'll use a high-quality stock/CC0 placeholder and you swap later.
3. **Real partner logos** (if any) — otherwise placeholders.
4. **Contact details to confirm:** Phone `076 425 04 53` ✓. Email? Address? LinkedIn link (`linkedin.com/company/minova-commerce`) ✓.

None of this blocks us starting.
