# Armina Swittenburg — Visual Identity

**Fill this file in before building any compositions.** Every video in this workspace must trace its palette, typography, and motion choices back to this file. See `DESIGN.ais-example.md` for a fully worked example of the expected format.

---

## Style Prompt

Precision meets reinvention — deep black canvas, warm gold authority, clean white clarity. The vibe is New Wall Street: old money discipline crossed with Web3 momentum. Compositions feel like a financial terminal coming to life with confidence and purpose.

---

## Colors

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0D0D0D` | Primary background |
| `--surface` | `#1A1A1A` | Cards, panels, surfaces |
| `--accent` | `#C4962A` | Primary accent — gold highlights, CTAs, numbers |
| `--accent-glow` | `rgba(196,150,42,0.4)` | Gold halo glow (drop-shadow, text-shadow) |
| `--text` | `#FFFFFF` | Primary text |
| `--text-dim` | `#888888` | Secondary/meta text |
| `--border` | `#2A2A2A` | Borders, dividers, hairlines |

---

## Typography

- **Headline font — Cormorant Garamond (SemiBold 600 / Bold 700)** — luxury editorial serif. Use for: hero text, scene titles, big statements, logo lockups. The "old money" voice.
- **Display / Subtitles — Playfair Display (Regular 400 / Bold 700)** — high-contrast editorial serif. Use for: captions, lower-thirds, chapter titles, pull quotes. Ties directly to the Everyday AI Playbook, Executive Prompt Playbook, 3X Challenge, and Facebook Group promo brand.
- **Accent fonts — pick per project** based on subject matter to give key words more meaning. Examples:
  - Fintech / data / charts → `Space Mono` or `JetBrains Mono` (terminal precision)
  - Web3 / crypto energy → `Orbitron` or `Exo 2` (forward-looking tech)
  - Authority / legal / contracts → `EB Garamond` (institutional gravitas)
  - Movement / urgency → `Barlow Condensed` or `Bebas Neue` (kinetic punch)

**Pairing rule:** Cormorant Garamond headline above a Playfair Display subtitle is the house pattern. Accent font replaces the mono layer only when the subject calls for it — never use more than 3 typefaces in one video.

**Google Fonts import (include in every composition):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

---

## Logo

- File: `assets/logo.png` or `assets/logo.svg` — _[describe: wordmark? symbol? color?]_
- Glow treatment: _[e.g. `filter: drop-shadow(0 0 40px rgba(255,200,0,0.6))`]_
- Clearspace: _[e.g. half a logo-height on all sides]_
- Never recolor. Never stretch.

**[TODO — add your logo file to `assets/` and describe it here]**

---

## Motion Rules

- **Entrance only** — every element animates in via `gsap.from()`. Transitions handle exits.
- **Easing palette:** `power3.out` (entrances), `expo.out` (hero reveals), `sine.inOut` (ambient loops)
- **Duration bands:** snap 0.3–0.5s, headline 0.5–0.8s, ambient 2–4s
- **Text stagger:** 0.04–0.08s/character for display, 0.12–0.18s/word for body

**[TODO — adjust easing and timing to match your brand energy]**

---

## Transitions

| Scene change | Transition | Duration | Ease |
|---|---|---|---|
| Default | Push slide left | 0.35s | `power2.inOut` |
| Opener | Zoom through | 0.35s | `power4.inOut` |
| Outro | Blur crossfade | 0.5s | `sine.inOut` |

**[TODO — pick transitions from the MOTION_PHILOSOPHY.md recipe list]**

---

## What NOT to Do

1. **No flat-color backgrounds** — always add a localized radial glow behind focal elements.
2. **No generic system fonts** — only the fonts specified above.
3. **No `Math.random()` or `Date.now()`** — render determinism.
4. **No exit animations** on any scene except the final — transitions handle exits.
5. **No stretching the logo.**

---

## File References

- `assets/logo.png` — _[add your logo]_
- `assets/brand-tokens.css` — CSS `:root` vars (copy from workspace `assets/brand-tokens.css` and update)
