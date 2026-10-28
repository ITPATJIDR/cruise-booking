# Anti-patterns: the tells of a generated page

Each tell below is a default that shows up when nobody decided. A tell is acceptable only when the brief gives a concrete reason for it — write the reason down. "Looks modern" or "users expect it" is not a reason.

## Clutter: the over-filled page (check this first)

These are the most common reason a page "looks like AI made it" even when colours and fonts are fine. They make content feel scattered because everything competes at the same weight.

| Tell | Do instead |
|---|---|
| Eyebrow label above every heading ("FEATURES", "HOW IT WORKS", "✦ WHY US") | No label; let the heading say it. Use a label only where it adds information the heading can't |
| Section numbers / index marks everywhere ("01 —", "02 —", "§3") | Only when the content truly is a sequence the reader follows |
| Heading + subheading + paragraph + bullets + cards in one section | One heading, one content block, at most one action (see content-and-hierarchy.md density budget) |
| A row of 3–4 stat tiles ("10k+ users · 99.9% uptime · 4.9★ · 24/7") | One number that matters, with its source, or none |
| Pills/badges/tags sprinkled on headings, cards and images ("NEW", "Beta", "AI-powered", "v2.0") | Only when they carry state the user needs; never decorative |
| An icon next to every heading, list item and button | Icons only where they speed recognition (navigation, file types, actions) |
| Small monospace meta text everywhere (timestamps, coordinates, version strings, "EST. 2024") | Delete it unless the reader needs it |
| Everything inside a card, cards inside cards | Text directly on the background; cards only for separately clickable objects |
| Checkmark lists of benefits repeated in several sections | Say it once, in the place it answers a question |
| Two or three CTAs per section, plus a sticky CTA, plus a banner | One primary action per screen |
| Floating decorative elements: sparkles, orbs, stickers, rotated labels, grid lines unrelated to content | Remove; put the effort into the real content |
| Mixed alignments in one section (centred heading, left text, right-aligned card) | One edge or one axis per section |
| Same visual weight for everything (headings barely larger, everything bold, everything high contrast) | Clear P1/P2/P3 levels with big jumps (content-and-hierarchy.md) |
| Repeating the hero message in every section ("That's why X is the best way to…") | Each section answers a different question |

## Colour and surface

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Purple→blue or pink→purple gradient on hero, buttons or text | The single most over-produced look of 2023–2025 | Flat colour from the brief's object; if you need a gradient, make it from the product's real imagery |
| Dark background + coloured glow/blur blobs behind content | Decoration standing in for content | Put real content (screenshot, output, photo) where the glow was |
| Glassmorphism cards (`backdrop-blur` + white 10% border) everywhere | Default "premium" trick | Opaque surfaces with a tinted neutral; use blur once, for a sticky nav over content, if at all |
| Pure `#000` text on pure `#fff` | Unconsidered | Tinted pair, e.g. warm `#1f1d1a` on `#f4f1ea`, or cool `#f4f5f2` on `#0e1012` |
| Neutral grey shadows `rgba(0,0,0,.1)` on every card | Default Tailwind `shadow-md` | Shadow tinted with the text colour, used only where elevation means something |
| Accent colour used on everything clickable and also decoratively | Accent stops meaning anything | One accent with one job (primary action, or live state) |

## Type

| Tell | Do instead |
|---|---|
| Inter/system font for everything, weights 400/600 only | Choose a family with character for display, or one family used with real size contrast (see typography.md) |
| Display size barely bigger than body (e.g. 36px vs 16px) | Display ≥ 3× body on desktop, or deliberately tiny headings with hierarchy from something else (Stripe Press) |
| Gradient-filled headline text | Solid colour; if multi-colour, each colour must map to something (StockGen maps to the product's art) |
| Every heading is Title Case, centred, followed by a grey sub-line | Mix alignments; let some sections start with a label, a number or a sentence |
| Emoji as icons or in headings (🚀 ✨ 💡) | A drawn icon set in one stroke weight, or no icon |
| Loose global line-height (1.5) on giant headings | Tighten display to ~1.0–1.1, keep body ~1.5–1.7 (Thai 1.6–1.8) |

## Layout

| Tell | Do instead |
|---|---|
| Centred hero → logo strip → 3 icon cards → alternating image/text rows → testimonials → pricing → CTA | Order sections by the reader's questions; drop sections that answer nothing |
| Three feature cards with icon on top, title, two lines of grey text | A table, a list with real detail, one large demo, or a horizontal scroller of real outputs |
| Every section the same padding and max-width | Vary density: a tight dense section next to a single oversized statement |
| Everything symmetrical and centred | At least one asymmetric split or off-grid element |
| Bento grid of equal-ish tiles with icons | Only if every tile shows a real artefact; otherwise a list |
| Fake browser/phone mockups containing lorem ipsum or blank gradients | Real screenshots, or an HTML-built faithful fragment of the actual UI |

## Shape and detail

| Tell | Do instead |
|---|---|
| `rounded-2xl` on everything, buttons and cards identical radius | A radius system: e.g. pill for controls, 16px for cards, 2–4px for inline/print-like elements |
| Hover = scale(1.05) + shadow on every card | Hover that matches the material: lift for paper cards, underline for text links, colour shift for controls |
| `transition: all 300ms ease` everywhere | Transition specific properties; spring or custom easing for physical motion; 120–180ms for colour |
| Default focus ring or none | Visible, styled focus ring that matches the brand |
| shadcn/ui or Tailwind UI components used unmodified | Keep the behaviour, restyle tokens, spacing and radius to the brief |

## Copy

| Tell | Do instead |
|---|---|
| "Unlock the power of…", "Seamless", "Supercharge", "Revolutionize", "Elevate", "Effortlessly" | Say what it does with a concrete noun and verb: "Turn one prompt into a stock-ready video" |
| Three-word hero + vague subline | A hero line someone would actually say, plus one specific proof (number, name, output) |
| Fake testimonials with stock avatars and "CEO at Company" | Real quotes with names, or none; a usage number or a real customer logo instead |
| Every feature described in exactly two lines | Let length follow importance |
| "Get Started" as the only CTA verb | A verb that names the outcome: "Open the studio", "See the work", "Book a call" |

## The general rule

When in doubt, ask: *would a designer with taste have chosen this on purpose for this product?* If the answer is "it was just there", change it.
