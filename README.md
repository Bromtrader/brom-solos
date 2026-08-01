<div align="center">

# BROM ▍Frontend Developer Portfolio

**Dark. Glassmorphic. Motion-first.**
A self-taught frontend developer's portfolio, built to feel expensive.

[![Made with](https://img.shields.io/badge/made%20with-HTML%2FCSS%2FJS-6C63FF?style=flat-square)](#)
[![No build step](https://img.shields.io/badge/build%20step-none-00E5FF?style=flat-square)](#)
[![Reduced motion](https://img.shields.io/badge/prefers--reduced--motion-respected-FF4D9D?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-00FF88?style=flat-square)](#license)

</div>

<br>

<div align="center">
  <table>
    <tr><td width="100%" align="center">
      <sub>Background <code>#050505</code></sub> ▪
      <sub>Primary <code>#6C63FF</code></sub> ▪
      <sub>Secondary <code>#00E5FF</code></sub> ▪
      <sub>Accent <code>#FF4D9D</code></sub> ▪
      <sub>Success <code>#00FF88</code></sub>
    </td></tr>
  </table>
</div>

<br>

## Overview

This is the source for **brom.dev** — a single-page portfolio for BROM, a self-taught
frontend developer based in Nairobi, Kenya. The brief was simple: it should look like
it belongs on Awwwards, not like a template. Every interaction — the cursor, the
particle field, the reveal timing — is built to serve that.

No framework, no build step, no dependencies beyond two CDN scripts for scroll
animation. Open `index.html` and it runs.

<br>

## ✦ Features

<table>
<tr>
<td width="50%" valign="top">

**Visual language**
- Aurora-glow hero with animated gradient wordmark
- Glassmorphism throughout — cards, nav, forms, modals
- Custom mouse-reactive particle canvas
- Custom cursor (dot + lagging ring) with hover states
- Noise texture overlay for depth
- Full dark mode, no light theme to maintain

**Motion**
- GSAP + ScrollTrigger entrance sequence on the hero
- Section reveal-on-scroll (vanilla `IntersectionObserver`)
- Magnetic buttons, 3D tilt on project cards
- Animated stat counters, skill bars, typing effect
- Infinite marquee strip

</td>
<td width="50%" valign="top">

**Product details**
- ⌘K / Ctrl+K command palette for section jumps
- Project filtering by category
- Working scroll-progress bar + back-to-top
- Loading screen with simulated progress
- Contact form with client-side validation
- Responsive nav with animated mobile drawer

**Engineering**
- Semantic HTML5, ARIA labels, visible focus states
- `prefers-reduced-motion` disables all non-essential motion
- Cursor/magnetic/tilt effects auto-disabled on touch
- Meta, Open Graph, Twitter Card tags + JSON-LD `Person` schema
- Zero layout shift, zero external UI framework

</td>
</tr>
</table>

<br>

## Quickstart

No install, no build. Pick one:

```bash
# Just open it
open index.html

# Or serve it (recommended, avoids any local file:// quirks)
python3 -m http.server 8080
# → http://localhost:8080
```

<br>

## Project structure

```
brom-portfolio/
├── index.html      Markup for every section — hero, about, skills, projects,
│                    journey, services, testimonials, contact, footer
├── style.css        Full design system: tokens → layout → components → responsive
├── script.js         Loader, cursor, particle canvas, reveals, typing effect,
│                    magnetic buttons, tilt cards, filtering, command palette,
│                    contact form handling
├── assets/          Drop screenshots, an OG image, and a headshot here
└── README.md         You are here
```

<br>

## Design system

| Role | Token | Value |
|---|---|---|
| Background | `--bg` | `#050505` |
| Elevated surface | `--bg-elevated` | `#0b0b10` |
| Primary | `--primary` | `#6C63FF` |
| Secondary | `--secondary` | `#00E5FF` |
| Accent | `--accent` | `#FF4D9D` |
| Success | `--success` | `#00FF88` |
| Text | `--text` / `--text-dim` / `--text-faint` | `#F5F5F7` → `#6b6b78` |

**Type**
| Role | Family |
|---|---|
| Display | `Space Grotesk` |
| Body | `Manrope` |
| Mono / labels | `JetBrains Mono` |

All tokens live at the top of `style.css` as CSS custom properties — change a value
once, it propagates everywhere (gradients, glows, borders, text).

<br>

## Before you launch

A few things are intentionally placeholders — swap these out:

| # | What | Where |
|---|---|---|
| 1 | Real portrait | `.hero-photo` in `index.html` (currently an icon placeholder) |
| 2 | Project repo / demo links | `href="#"` on each `.project-card`'s GitHub/demo buttons |
| 3 | Contact form backend | `script.js` — form only validates client-side today; wire to Formspree, a serverless function, or EmailJS |
| 4 | Testimonials | Marked as sample content in `#testimonials` — replace with real quotes |
| 5 | Social links | GitHub / LinkedIn / Instagram / email in `#contact` and the footer |
| 6 | OG image | Add `assets/og-cover.png` at 1200×630 for link previews |

<br>

## Notes on the build

- **Motion is progressive, not required.** GSAP/ScrollTrigger load from cdnjs and
  enhance the hero entrance and parallax; every other animation (reveals, counters,
  skill bars, marquee, typing) is dependency-free vanilla JS and works even if the
  CDN is blocked.
- **Accessibility is load-bearing, not decorative.** `prefers-reduced-motion` turns
  off the loader animation, cursor, particle field, and all GSAP entrances. Focus
  states are visible everywhere, not just on inputs.
- **Touch devices get a different, not worse, experience.** Custom cursor, magnetic
  buttons, and card tilt are disabled via a pointer/hover media query rather than
  faked with touch events.

<br>

## License

MIT — use it, fork it, make it yours. Attribution appreciated but not required.

<br>

<div align="center">
<sub>Designed &amp; built from Nairobi, Kenya 🇰🇪</sub>
</div>
