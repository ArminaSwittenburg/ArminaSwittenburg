# Girl Code Campaign — The Code Maxi

Ten UGC-style Facebook ads for **The Code Maxi** by Girl Code Couture, each
featuring a different model, all under one idea:

> **Girl code says: when you find THE dress, you tell your girls.**

Every ad is a different woman letting her friends in on the secret — a
confession/recommendation format that feels native to the feed (talk-to-camera,
mirror check, get-ready-with-me, street style) instead of a polished studio ad.

## The product

**The Code Maxi** — black ribbed/crinkle-knit sleeveless bodycon maxi dress.
V-neckline, adjustable spaghetti straps, body-skimming stretch fit, side slit.
Dresses up with heels and gold jewelry, dresses down with sneakers and a
headwrap. This exact description is locked into every AI image prompt so the
dress stays consistent across all ten models.

## The ten ads

| # | File | Persona | Angle |
|---|---|---|---|
| 01 | `ads/ad-01-college-girl.md` | Jasmine, 21, college senior | Dorm mirror check, budget-friendly baddie |
| 02 | `ads/ad-02-nine-to-five.md` | Maya, 28, marketing manager | Desk-to-drinks, one dress two lives |
| 03 | `ads/ad-03-new-mom.md` | Brianna, 32, new mom | Feel like yourself again, zero effort |
| 04 | `ads/ad-04-curvy-confidence.md` | Tiana, 26, curvy creator | Hugs every curve, made for MY body |
| 05 | `ads/ad-05-fifty-plus.md` | Denise, 54, ageless chic | Style has no expiration date |
| 06 | `ads/ad-06-travel-girl.md` | Alexis, 29, travel content creator | Wrinkle-proof carry-on hero |
| 07 | `ads/ad-07-date-night.md` | Camille, 30, date-night glam | The "he can't focus" dress |
| 08 | `ads/ad-08-brunch-crew.md` | Kayla, 24, brunch bestie | The group chat found the dress |
| 09 | `ads/ad-09-gym-to-street.md` | Simone, 27, fitness girl | Gym-to-street, sneakers styling |
| 10 | `ads/ad-10-petite.md` | Nia, 25, petite 5'1" | Finally a maxi that fits petite |

Each ad file contains: the model persona, a 15–30 second UGC video script,
Facebook ad copy (primary text / headline / description / CTA), and an AI
image-generation prompt for that model in the dress.

## Files

- `ads/ad-NN-*.md` — one file per ad (persona, script, copy, image prompt)
- `facebook-ads-copy.csv` — all copy in one sheet for Meta Ads Manager
- `preview.html` — Facebook-feed-style mockup of all ten ads for review

## How to use

1. **Images:** paste each ad's image prompt into Higgsfield / Midjourney /
   Canva AI (4:5 ratio for feed). Or hand the video script to a real UGC
   creator matching the persona.
2. **Copy:** find-and-replace `[PRICE]` and `[SHOP LINK]`, then paste the
   copy fields into Meta Ads Manager (or import from the CSV).
3. **Review:** open `preview.html` in a browser to see all ten ads as feed
   cards.

## Campaign hashtags

`#GirlCodeCouture` `#ThatsTheCode` `#TheCodeMaxi` `#GirlCode` `#CodedToElevate`

## Brand guardrails

Follow the repo-root `CLAUDE.md`: Couture Pink `#EC008C` accents, black/white
base, gold `#C9A227` for elevated moments; confident girl's-girl voice;
sign-off "That's the code." on every ad.
