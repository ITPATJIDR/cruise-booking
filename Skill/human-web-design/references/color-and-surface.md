# Colour and surface

## Derive the palette, don't pick it

Good palettes come from somewhere. Pick one source and sample from it:

1. **The brief's physical object** — paper, ink, anodised aluminium, terracotta, cardboard, newsprint, a book cloth.
2. **The product's real imagery** — screenshots, generated outputs, photos, game art, book covers. StockGen's lime/purple/cyan/red come straight from its generative art tiles; Stripe Press and Panic let each book or game supply its own colour.
3. **A brand asset that already exists** — logo, packaging, signage.

## Structure

A palette needs roles, not just swatches:

```css
:root {
  --bg:          /* page */
  --surface:     /* cards, inputs — one step off bg */
  --surface-2:   /* optional nested surface */
  --text:        /* primary text */
  --muted:       /* secondary text, ~4.5:1 on bg minimum */
  --faint:       /* tertiary labels, meta (large text only if < 4.5:1) */
  --line:        /* hairlines */
  --line-strong: /* inputs, emphasis borders */
  --ink:         /* solid primary button / inverted block */
  --on-ink:      /* text on ink */
  --accent:      /* ONE job: primary CTA or live/active state */
}
```

## Tinted neutrals

Neutrals should lean toward a hue so the page feels like a material, not a screen:

| Feel | bg | surface | text | muted | line |
|---|---|---|---|---|---|
| Warm paper (C Level Hideout) | `#f4f1ea` | `#fbf9f5` | `#1f1d1a` | `#55504a` | `#e3ded3` |
| Cool graphite (StockGen) | `#0e1012` | `#16191c` | `#f4f5f2` | `#b4b9b5` | `#262b30` |
| Warm dark / book cloth (Stripe Press) | `#201819` | — | `#ffffff` | — | — |
| Clean gallery (Pentagram) | `#ffffff` | `rgba(0,0,0,.07)` | `#1a1a1a` | `#767676` | — |

Notice: muted greys are mixed from the text colour, not from pure grey. A quick way: `color-mix(in oklch, var(--text) 65%, var(--bg))`.

## Accent discipline

- One accent with one job. If it's on the CTA, don't also use it on icons, headings and dividers.
- Multi-colour is allowed when each colour **means** something (categories, product modes, content-owned colour). StockGen gives each generation mode its own colour; that works because the mapping is consistent.
- Check contrast: body text ≥ 4.5:1, large text and UI ≥ 3:1.

## Shadows and elevation

- Tint shadows with the text colour: `0 8px 24px rgb(31 29 26 / .12)` on warm paper reads like paper; `rgba(0,0,0,.1)` reads like a template.
- Use 2–3 elevation levels with meaning: resting card, raised/hovered card, overlay/modal.
- A crisp near-invisible outline + small shadow often beats a big blur: `0 0 0 .5px rgb(30 28 26 / .06), 0 1px 2px rgb(30 28 26 / .14)`.
- On dark pages, elevation comes from a lighter surface + a 1px hairline, not shadow.

## Backgrounds and texture

Use texture only if it belongs to the object: paper grain for print, a faint grid for a tool, a giant faded monogram as a brand watermark (C Level Hideout uses enormous outlined CLHW letters at the bottom of the page). No floating gradient blobs, no random noise "for depth".

## Dark mode

Design dark as its own palette (re-derive tints), not an inversion. Keep the same hue lean; lower accent saturation slightly; replace shadows with surface steps and hairlines.
