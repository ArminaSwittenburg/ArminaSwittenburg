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

- **Headline font** — _[e.g. Druk Wide Bold / Space Grotesk Bold / Syne]_. Use for: hero text, scene titles.
- **Body font** — _[e.g. Inter / DM Sans / Roboto Mono]_. Use for: captions, lower-thirds, body copy.

Pair rule: _[e.g. "Always put the mono label above the display headline"]_

**[TODO — specify your fonts and pairing rule]**

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
