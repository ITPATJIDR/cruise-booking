# Case file: C Level Hideout (portfolio)

- **URL:** https://c-level-hideout.soravithok.workers.dev/
- **Direction:** Warm Paper
- **Physical object it evokes:** a studio's printed portfolio — project cards laid out on a warm desk
- **Analysed:** 2026-10-28

## Tokens

| Token | Value | Note |
|---|---|---|
| Fonts | Google Sans (400/500/600/700) + IBM Plex Sans (Thai fallback) | One visible family; Thai handled by a second family in the stack |
| Body | 16px, `#1f1d1a` on `#f4f1ea` | Warm near-black on warm paper, never #000/#fff |
| Display | H2 40px / 44px, weight 600, tracking −0.8px (−0.02em) | Tight leading, slight negative tracking |
| Type sizes in use | 10 · 12–15 · 18 · 21 · 32 · 40 | Small UI sizes, one card-title size (21px), one display size |
| Colour roles | `--bg #f4f1ea` · `--surface #fbf9f5` · `--text #1f1d1a` · `--muted #55504a` · `--line #e3ded3` · `--line-strong #d4cec2` · `--ink #1e1c1a` · `--ink-pressed #121110` · `--on-ink #fffdf9` | A complete *role-based* palette, all warm-tinted |
| Extra tokens | `--chrome-bar #f1efeb` · `--chrome-line #e4e1db` · `--chrome-url #7a756d` | Dedicated tokens for the fake browser frame — the frame is treated as a designed component, not decoration |
| Radius | `--radius: 16px` cards · pill controls · 6px small chips · 10px 10px 0 0 browser frame top | A system: pills for controls, 16px for cards |
| Shadows | `rgba(31,29,26,.12) 0 8px 24px` · `rgba(31,29,26,.08) 0 8px 24px` · `0 0 0 .5px rgba(30,28,26,.06), 0 1px 2px rgba(30,28,26,.14)` | Tinted with the text colour; hairline + micro-shadow for small controls |
| Container | 760px / 612px / 504px max-widths | Narrow, reading-width layout; the carousel breaks out of it |
| Motion | card transform 0.42s with a `linear()` spring curve (overshoots to ~1.09, settles) · colours 0.15s | Physical motion uses a spring; colour transitions are short and property-specific |

## Signature moves

1. **Projects as a fanned 3D deck of browser windows.** Each project is a card containing a screenshot inside a designed browser frame (URL bar, warm chrome); the active card sits forward, neighbours fan back and rotate. Pager "1 / 11" with round arrow buttons.
2. **Giant outlined monogram watermark** — the CLHW letters, huge and faint, sit along the bottom of the page as texture that is also brand.
3. **Floating pill nav with segmented controls** — logo tile, tabs with a dark ink active pill, and an EN/TH segmented switch.
4. **Filters with counts** ("ทั้งหมด 11", "เว็บไซต์และเว็บแอป 6", "ออกแบบ UI/UX 3") plus a view toggle (ตาราง / หมุนดู — grid vs rotate).
5. **Bilingual by design** — Thai-first copy with a real Latin/Thai font pairing.

## Why it works

- The work is the hero. A portfolio's reader wants to see projects; here they see them immediately, and browsing them is pleasurable (the spring makes the deck feel like real cards).
- The browser frame tells you "these are websites" without a label, and its dedicated tokens keep it consistent with the page.
- Warm tinted neutrals + tinted shadows make it feel like paper and craft rather than a SaaS template.
- Counts and a view toggle respect the reader: they know the size of the archive and can switch to a scannable grid.

## How to adapt

- Render the thing being shown as a physical object the reader can handle (deck, stack, shelf, sheet).
- Give "decorative" components their own tokens so they are designed, not improvised.
- Build a role-based palette (bg/surface/text/muted/line/ink/on-ink) all leaning the same hue.
- Use a brand mark at enormous scale and low contrast as the one texture on the page.
- Offer a calm fallback view (grid) next to any showy one (carousel).

## Watch-outs

- Fanned carousels hide most of the work at once; the grid toggle is what makes this acceptable — keep it.
- On phones the 3D fan needs a simpler form (swipe stack) and must stay usable without hover.
