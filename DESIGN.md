# Swittenburg & Company — Visual Identity

**This is the canonical brand reference for all AI branding videos in this workspace.**
Every composition must trace its palette, typography, motion, and copy choices back to this file.

---

## Brand Context

**Company:** Swittenburg & Company
**Tagline:** *Strategic Clarity. Scalable Execution.*
**Secondary tagline:** *Move Different. Scale Different.*
**Mission:** AI tools for leaders and everyday people.
**Creator:** Armina Swittenburg — @swittenburgco · @arminaswittenburg

**Video scope for this workspace:** AI branding videos only.
- Everyday AI™ Playbook promos
- Executive Prompt Playbook™ promos
- Everyday AI™ 3X Challenge content
- Everyday AI™ Tribe — 10K by 2026 content
- General Swittenburg & Company brand content

*(Fashion brand videos → separate session/workspace)*

---

## Style Prompt

Premium executive energy meets everyday accessibility — deep black canvas, warm gold authority, crisp white clarity. The brand sits at the intersection of Wall Street discipline and AI empowerment: polished enough for C-suite leaders, approachable enough for everyday people reinventing themselves. Compositions feel like a high-end business book coming to life — thin gold rules, spaced serif caps, confident stillness punctuated by precise motion. Never loud. Always intentional.

---

## Colors

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0D0D0D` | Primary background (near-black — used in all brand assets) |
| `--surface` | `#1A1A1A` | Cards, panels, overlay surfaces |
| `--border` | `#2A2A2A` | Hairlines, dividers |
| `--gold` | `#C4962A` | Primary accent — logo, headlines, CTAs, rules, badges |
| `--gold-light` | `#D4A940` | Lighter gold for gradients, shimmer highlights |
| `--gold-glow` | `rgba(196,150,42,0.35)` | Gold halo — drop-shadow and text-shadow on hero text |
| `--text` | `#FFFFFF` | Primary text |
| `--text-dim` | `#AAAAAA` | Secondary/meta text, fine print |

**Rule:** Never use more than these colors in a single video. Gold owns one idea per scene.

---

## Typography

### Headline — Cormorant Garamond
Elegant luxury serif. The "old money + new thinking" voice.
- Weights: Regular 400 (italic for flowing titles like *Everyday*), SemiBold 600, Bold 700
- Use for: hero text, book/product title reveals, big statements
- Tracking: tight to normal (`letter-spacing: -0.02em` to `0`)
- The italic weight mirrors the *Everyday* script treatment on the book cover

### Display / Subtitles / Captions — Playfair Display
High-contrast editorial serif. Consistent across all Everyday AI brand assets.
- Weights: Regular 400, Bold 700
- Use for: captions, lower-thirds, chapter labels, pull quotes, CTA sub-copy
- Tracking: slightly open on all-caps labels (`letter-spacing: 0.08em`)

### Spaced Caps Labels — Cinzel or Playfair Display SC
Matches the spaced-cap treatment on "SWITTENBURG & COMPANY" and "THE DIGITAL PLAYBOOK" in the brand assets.
- Use for: company name lockups, section labels, badge text
- Always uppercase, wide tracking (`letter-spacing: 0.15em–0.25em`)

### Accent font — pick per project
Swap in one accent typeface when the subject benefits:
- Data / AI metrics / dashboard content → `Space Mono` (terminal precision)
- High-energy / challenge / momentum content → `Barlow Condensed` (kinetic urgency)
- Leadership / executive content → `EB Garamond` (institutional gravitas)
- Never use more than 3 typefaces total in one video.

### Google Fonts import (include in every composition `<head>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Playfair+Display:wght@400;700&family=Cinzel:wght@400;600&display=swap" rel="stylesheet">
```

---

## Logo & Brand Marks

| Asset | File | Usage |
|---|---|---|
| Primary logo | `assets/swittenburg-logo.png` | Outros, lower-thirds, watermarks |
| S monogram badge | Extract from logo | Corner badges, mid-scene callbacks |

**Logo treatment:**
- On black: use as-is — the gold already glows against dark backgrounds
- CSS glow: `filter: drop-shadow(0 0 30px rgba(196,150,42,0.5))`
- Clearspace: minimum half a logo-height on all sides
- Never recolor. Never stretch. Never rotate.
- The tagline "STRATEGIC CLARITY. SCALABLE EXECUTION." travels with the logo on outros.

**Thin gold rule** (`border-top: 1px solid #C4962A`) — a signature brand element. Use as dividers above/below the company name and between sections.

---

## Brand Products (reference for copy and visuals)

| Product | Key copy |
|---|---|
| **Everyday AI™ Playbook** | "The CEO of Your Life Has a New Chief of Staff" / "Move Different. Scale Different." |
| **Executive Prompt Playbook™** | "The AI-Powered Manager's Guide to Reclaiming 10+ Hours a Week" / "Real Workflows. Strategic Execution." / Features: R.A.P.I.D. Prompt Framework™ |
| **Everyday AI™ 3X Challenge** | "3 Prompts × 3 Days a Week = 3x Your Day" / Mon · Wed · Fri / Free Starter Kit |
| **Everyday AI™ Tribe — 10K by 2026** | "AI tools for leaders & everyday people. You in?" / "One Goal: 10K by 2026" |

---

## Motion Rules

- **Entrance only** — every element animates in via `gsap.from()`. Transitions handle exits.
- **Gold first** — the first thing that glows or moves in any scene is always gold.
- **Easing palette:** `power3.out` (text entrances), `expo.out` (logo reveals), `sine.inOut` (ambient gold shimmer loops)
- **Duration bands:** label snaps 0.3–0.5s · headline reveals 0.6–0.9s · ambient drifts 2–4s
- **Text stagger:** 0.05–0.08s/character for display type · 0.15s/word for body
- **Gold rule lines:** animate width from 0 → 100% on `power2.out`, 0.4–0.6s. A signature Swittenburg motion beat.
- **Stillness is intentional** — hold a fully composed frame for at least 0.5s before the next entrance.

---

## Transitions

| Scene change | Transition | Duration | Ease |
|---|---|---|---|
| Default | Push slide left | 0.35s | `power2.inOut` |
| Opener / brand reveal | Cinematic zoom through | 0.4s | `power4.inOut` |
| Book/product showcase | Whip pan | 0.3s | `expo.in` into `expo.out` |
| Outro / CTA hold | Blur crossfade | 0.5s | `sine.inOut` |

---

## Copy Voice

- **Confident, not arrogant.** Commands attention without shouting.
- **Short sentences. Strong verbs.** "Move Different. Scale Different." Not "A different approach to scaling."
- **Numbered/structured benefits** — the brand loves 3s: 3 prompts, 3 days, 3x your day.
- **Tagline callbacks** — end every video with "Strategic Clarity. Scalable Execution." or "Move Different. Scale Different."

---

## What NOT to Do

1. **No flat-color backgrounds** — always add a subtle radial gold glow behind focal elements.
2. **No generic sans-serif fonts** — only the typefaces specified above.
3. **No neon colors, no purples, no blues** — the palette is black + gold + white only.
4. **No exit animations** except on the final scene — transitions handle exits.
5. **No `Math.random()` or `Date.now()`** — render determinism.
6. **No stretching or recoloring the logo.**
7. **No hard cuts** — every scene change has a motion bridge (whip, push, zoom, blur).

---

## File References

- `assets/swittenburg-logo.png` — primary logo (gold on black)
- `assets/everyday-ai-playbook-cover.jpg` — Everyday AI Playbook book cover
- `assets/executive-prompt-playbook-cover.png` — Executive Prompt Playbook cover
- `assets/everyday-ai-challenge-banner.png` — 3X Challenge promo banner
- `assets/everyday-ai-tribe-10k-banner.png` — Tribe 10K mission banner
- `assets/brand-tokens.css` — CSS `:root` vars — import in every composition
