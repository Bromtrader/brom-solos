# BROM — Portfolio

A dark, glassmorphic, motion-driven portfolio site for BROM, a self-taught frontend
developer based in Nairobi, Kenya.

## Structure

```
index.html      Markup for every section (hero, about, skills, projects, journey,
                 services, testimonials, contact, footer)
style.css       Full design system — tokens, layout, components, responsive rules
script.js       Loader, custom cursor, aurora/particle canvas, scroll reveals,
                 typing effect, magnetic buttons, tilt cards, project filtering,
                 command palette (Ctrl/Cmd+K), contact form handling
README.md       This file
assets/         Drop real project screenshots, an OG image (assets/og-cover.png),
                 and a professional photo here
```

## Design tokens

| Token       | Value     |
|-------------|-----------|
| Background  | `#050505` |
| Primary     | `#6C63FF` |
| Secondary   | `#00E5FF` |
| Accent      | `#FF4D9D` |
| Success     | `#00FF88` |

Fonts: **Space Grotesk** (display), **Manrope** (body), **JetBrains Mono** (labels/data).

## What to swap before launch

1. **Photo** — replace the placeholder in `.hero-photo` with a real portrait.
2. **Project links** — the GitHub/live-demo buttons on each project card point to `#`;
   wire them to real repos and deployed URLs.
3. **Contact form** — `script.js` currently just validates and shows a confirmation
   message client-side. Connect it to a real endpoint (Formspree, a serverless
   function, EmailJS, etc.) to actually deliver messages.
4. **Testimonials** — clearly marked as sample content; replace with real quotes once
   you have them.
5. **Social links** — GitHub, LinkedIn, Instagram, and email links in the contact
   section and footer are placeholders (`#`) — point them at real profiles.
6. **OG image** — add `assets/og-cover.png` (1200×630) for link-preview cards.

## Notes

- Respects `prefers-reduced-motion`: the loader, cursor, particle canvas, and GSAP
  entrance animations all fall back to static/instant states.
- Custom cursor and magnetic/tilt effects are automatically disabled on touch devices.
- GSAP + ScrollTrigger are loaded from cdnjs for the hero entrance and parallax;
  everything else (reveals, counters, skill bars, marquee, typing effect) is
  dependency-free vanilla JS.
- No build step — open `index.html` directly or serve the folder with any static
  file server.
