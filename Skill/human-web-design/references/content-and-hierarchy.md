# Content and hierarchy

Most "AI-looking" pages are not badly styled — they are **over-filled and unordered**. Every section gets an eyebrow label, a heading, a subheading, three cards, icons, badges, stats and two buttons, and all of it is roughly the same visual weight. The eye has nowhere to land, so the page reads as noise.

A designer's first job is deciding what *not* to show, then making the rest obviously ordered. Do this before choosing fonts or colours.

## 1. Write the content as plain text first

Before any HTML, write the whole page as a plain outline: every heading, sentence, number, button label, in order. No styling. Then:

1. **Cut 30–50%.** Delete anything that repeats, anything the reader didn't ask, every adjective that isn't proof, every "feature" that is really the same feature twice.
2. **Give every remaining item a priority:**
   - **P1** — the one thing per section the reader must get. Exactly one per section.
   - **P2** — supports P1 (a sentence of explanation, a key number, the main action).
   - **P3** — reference detail (meta, fine print, secondary links).
3. **Group by meaning.** Items that answer the same question live in the same group. If a group has more than ~5–7 items, it is a list or table, not cards.

If you cannot pick the P1 for a section, the section shouldn't exist.

## 2. Map priority to visual weight

| Priority | How it looks | How many per screen |
|---|---|---|
| P1 | Largest size or strongest contrast on that screen; generous space around it | **1** |
| P2 | Body size, full-contrast text, or the primary button | 2–4 |
| P3 | Small, muted, or tucked away (footer, disclosure, tooltip, second page) | as needed, but quiet |

Hierarchy comes from **contrast between levels**, so the gaps must be big: if P1 is 40px and P2 is 32px, there is no hierarchy. Pick two or three levers (size, weight, colour, space) and make the difference obvious.

Only **one primary action per screen**. Secondary actions are text links or quiet buttons.

## 3. Proximity and alignment (why things feel "scattered")

Scattered layouts usually break these:

- **Proximity**: space *inside* a group must be clearly smaller than space *between* groups (rule of thumb: between ≥ 2× within). A heading belongs to the text under it — less space below a heading than above it.
- **Few alignment edges**: per section use one strong left edge (or one centre axis), not both. Count the distinct x-positions where text starts; more than 3 in one section looks chaotic.
- **Don't mix centred and left-aligned** in the same group. Centred text works for one short line; anything longer than two lines is left-aligned.
- **Consistent widths**: text columns share one measure (e.g. 65ch); media share one container. Random widths read as random.
- **No floating extras**: badges, decorative numbers, stickers and tags that are not attached to anything pull the eye away from P1. Delete them or attach them to the thing they describe.

## 4. Density budget

Give each section a budget and stay inside it:

- One heading. Optional: one short line under it — not both an eyebrow label above *and* a subheading below.
- One block of content: a paragraph, *or* a list, *or* a visual, *or* a table. Two at most.
- One action, if the section needs one at all.

A section that needs more is two sections — or the content should move to a dedicated page.

## 5. Choose the right container for the content

| Content | Use | Avoid |
|---|---|---|
| 3–7 comparable items with the same attributes | Table or definition list | Card grid |
| A sequence or process | Numbered list with real steps, or one diagram | Cards with arrows between them |
| One strong proof | One big number with its source, or one quote with a name | A row of four stats |
| Many items to browse | List with filters, or a scroller of real artefacts | Bento grid |
| Explanation | Paragraph prose | Bullet fragments with icons |

Cards are for things that are separately clickable objects. If nothing in the card is clickable or independent, it doesn't need a card — plain text on the background is calmer.

## 6. Reading path

Sketch (mentally or as ASCII) where the eye goes on each screen: P1 → P2 → action. If the path zig-zags across the page or has two competing starts, rearrange. Reading paths for left-to-right languages (including Thai) start top-left; a P1 placed elsewhere must be much heavier to win.

## 7. Targets from real sites

Measured on Apple, Things, GOV.UK, Basecamp and Aesop (details in `case-files/structure-benchmarks.md`). Use these as defaults; break one only with a reason.

| Measure | Target |
|---|---|
| Type levels on the page | 2–3 (section heading, item title, body). Hero may add one more |
| Section heading size | **The same on every section** (e.g. all 36–48px); only the hero is larger |
| Hero | 1 heading + ≤ 1 sentence (≈ 10–30 words) + 1 action |
| Words per section | 20–80 typical. Longer only as one block of prose or a grid of identical tiles |
| Primary buttons | ≤ 1 per screen; everything else is a text link ("See features ›") |
| Left alignment edges per section | 1–3 |
| Centred text | Only blocks ≤ ~40 words at a narrow measure |
| Section padding | One consistent value is fine (Apple 144px, Things 81px) |
| Headings | Short plain sentences ("Explore the lineup.", "Popular on GOV.UK"), never category labels |

### Patterns worth reusing

- **Link index instead of feature cards** (Basecamp hero): a short list where each line is a link + em dash + a few words — "Pricing — a free plan and paid upgrades". Scannable, honest, no icons needed.
- **Task links as content** (GOV.UK): write links as the reader's task ("Check your State Pension forecast"), not as nouns ("Pensions").
- **Heading → one paragraph → one text link → one real visual** (Things): a complete section in four elements.
- **Identical tiles** (Apple lineup): many items stay calm when every tile has exactly the same structure in the same order.
- **Prose for persuasion** (Basecamp's signed letter): one honest letter beats six bullet benefits.
- **Two-level hierarchy** (Aesop): ~30px section headings, ~15px item titles, nothing in between.

## 8. Checks before styling

- Can you read only the headings and understand the page? (If not, rewrite headings, don't add labels.)
- Does every section have exactly one P1?
- Is there any element whose removal loses nothing? Remove it.
- Is anything on the page there "to fill space" or "to look premium"? Remove it.
