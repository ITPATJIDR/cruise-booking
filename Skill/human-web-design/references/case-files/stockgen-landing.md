# Case file: StockGen AI (product landing page)

- **URL:** https://stockgen-landing.soravithok.workers.dev/
- **Direction:** Loud Product
- **Physical object it evokes:** a festival poster / a wall of printed stock samples
- **Analysed:** 2026-10-28

## Tokens

| Token | Value | Note |
|---|---|---|
| Fonts | LINE Seed (Sans + TH) for everything | One family, many weights (400 → 900); Thai-ready |
| Body | 16px / 25.6px (1.6), `#f4f5f2` on `#0e1012` | Off-white with a faint green lean, on cool graphite |
| Display | H1 64px / 64px, weight 900, uppercase, tracking −1.28px (−0.02em) · H2 56px / 56px, 900, uppercase | Leading 1.0 — tight poster setting |
| Sub-heads | H3 20px / 25px, weight 800 | Heavy, not uppercase |
| Type sizes in use | 11–20px for UI (14/16/12/15 most common) · 38 · 56 · 64–72 | Large jump from UI sizes to display — strong contrast |
| Neutrals | bg `#0e1012` · surface `#16191c` · line `#262b30` · text `#f4f5f2` · muted `#b4b9b5` · faint `#8b918d` | Tinted greys (slightly green), elevation by surface step + hairline |
| Colour set | lime `#a0ff42` · purple `#a142fe` · cyan `#43d0ff` · red `#ff4242` · blue `#40a1ff` | Saturated, flat, used across headline words, tags and tiles |
| Radius | pill (dominant: buttons, chips, tabs) · 18px tiles/cards · 6–8px small controls | Two-tier system |
| Borders | 1px `#262b30` hairlines | Dark-mode elevation done right |
| Container | 1440px max | Wide, poster-like |
| Section padding | 96px top/bottom, consistent | Rhythm varies through scale and layout instead |

## Signature moves

1. **Hero = real outputs.** Right half is a masonry wall of generated art (waves, grids, spirals, gradients) — what the product actually makes.
2. **Try-it prompt box in the hero** with mode tabs (Text to Image, Image to Image, Text to Video…) and a Generate button — the CTA is the product.
3. **Poster headline with per-word colour**: "STOCK PREP SYSTEM / AUTOMATED IN THE CLOUD." in 900-weight uppercase, the second line split across the palette colours.
4. **Horizontal scroller of modes** ("Seven ways to make something sellable") — each card is a real sample with a play bar for video, plus a one-line description.
5. **Copy with a voice**: "Ideas to try on day one", "From prompt to portfolio", "Pay as you go. Join by referral, get 15% more for life." — concrete, specific, numbers included.

## Why it works

- A visitor to an AI generator wants to know "what will I get?" — the hero answers with real outputs and lets them try it immediately.
- Heavy uppercase type gives the page a poster voice that matches stock/creator culture and contrasts strongly with the small UI type.
- The bright colours are earned because they are the colours of the generated art; they read as the product's palette, not decoration.
- Tinted graphite neutrals and hairlines keep the dark page calm so the outputs carry the colour.

## How to adapt

- Make the hero show or run the product. A working input beats two CTA buttons.
- If you go loud, go loud in one dimension (type weight + scale) and keep the chrome calm.
- Let colours come from the product's outputs, and map each one consistently (per mode, per category).
- Write section headings as plain, specific sentences with numbers.

## Watch-outs

- This is the direction closest to AI tells: multi-colour headline text and a gradient border on the prompt box are only acceptable because the colours trace back to the art. Without that mapping they become "rainbow AI landing page".
- Uppercase display does not exist in Thai; the Thai version needs heavier weight/size instead and relaxed leading (≥1.15).
- A 7.5k px page with constant 96px padding needs varied section layouts to avoid monotony — keep the scrollers, tables and grids different from each other.
