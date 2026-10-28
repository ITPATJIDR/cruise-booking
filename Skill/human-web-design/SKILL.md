---
name: human-web-design
description: Design and build websites, landing pages, portfolios and web UI that look deliberately designed by a person, not AI-generated, with clear content hierarchy instead of cluttered, scattered sections. Use this skill whenever the user asks to design, build, redesign, restyle or "make nicer" any web page, landing page, homepage, portfolio, marketing site, product page or web app UI, or complains that a page looks generic, templated, cluttered, messy, "AI-ish", like shadcn defaults or like every other SaaS site, even if they never say the word "design".
---

# Human Web Design

Pages look AI-generated for two reasons:

1. **Nobody made a decision.** Every value is a default: Inter, `rounded-2xl`, a purple-to-blue gradient, a centred hero followed by three icon cards.
2. **Everything is shown at once.** Every section gets an eyebrow label, heading, subheading, cards, icons, badges, stats and two buttons, all at similar weight. The eye has nowhere to land, so the content feels scattered.

The second problem is the more common one, and adding "design details" makes it worse. **Restraint is the main skill here**: decide what matters, show less, and make the order obvious. Then give what remains a deliberate look.

Work in six passes. Do not skip to code — the first three passes take minutes and decide most of the result.

## Pass 1 — Write the brief

Write these answers in a few lines (in your reasoning or as a comment at the top of the CSS). If the user gave little context, infer reasonable answers and state them to the user in one line rather than stopping to ask.

1. **Who reads this, and what is the one thing they should do?** One reader, one primary action.
2. **What is the real thing being sold or shown?** A product screenshot, its output, the work, the food. This is the hero material.
3. **If this page were a physical object, what would it be?** An annual report, a hardware manual, a gallery label, a menu. This decides type, colour and texture better than "modern and clean".
4. **Voice in three words** (e.g. "dry, exact, warm").
5. **One signature idea** — the single thing someone would describe to a friend. One, not several; the rest of the page stays quiet so it can be seen.

## Pass 2 — Edit the content (before any layout)

Read `references/content-and-hierarchy.md` (its "Targets from real sites" table gives concrete limits measured on well-ordered sites). Then:

1. Write the whole page as a **plain-text outline**: every heading, sentence, number and button label, in order, no styling.
2. **Cut 30–50%.** Remove repetition, claims without proof, features that are the same feature twice, sections that answer no reader question.
3. **Mark each item P1 / P2 / P3.** Exactly one P1 per section. P3 goes small, muted, or off the page.
4. **Pick the container** each group needs (prose, list, table, one visual) — cards only for separately clickable objects.

Read the headings alone, in order: they should tell the story. If they don't, rewrite them; don't add labels to compensate.

## Pass 3 — Choose a direction and set tokens

Read `references/directions.md` and pick **one** direction that fits the brief's physical object. Read 1–2 matching files in `references/case-files/` to see how real sites execute it — study the decisions, never copy their assets, names or copy.

Define tokens as CSS custom properties before writing components, starting from `assets/starter-tokens.css` and changing values deliberately:

- **Type** (`references/typography.md`): at most two families; few sizes (5–7) with big jumps between hierarchy levels; per-size line-height and tracking. Thai needs a Thai-capable font and taller line-height.
- **Colour** (`references/color-and-surface.md`): tinted neutrals, one accent with one job, palette derived from the object or the product's imagery.
- **Shape**: a radius system with a reason, not one radius for everything.
- **Space and grid** (`references/layout-and-rhythm.md`): a spacing scale where space between groups is clearly larger than space inside them, and one strong alignment edge per section.

## Pass 4 — Build

- Lead with the real thing. Real screenshots, outputs, numbers. If assets are missing, build a faithful UI fragment in HTML/CSS rather than an illustration or emoji.
- Build the signature idea first and properly.
- Follow the content outline from pass 2 exactly. Do not add elements during build that weren't in the outline — no extra eyebrow labels, badges, stat rows, icons, decorative numbers or "NEW" tags to "make it feel designed".
- One primary action per screen. Secondary actions are quiet text links.
- Keep alignment simple: one left edge (or one centre axis) per section; don't mix centred and left-aligned text in a group.
- Vary rhythm across sections through scale and density (see layout-and-rhythm.md), not by adding more elements.
- Copy in the brief's voice: concrete nouns, numbers, names. No emoji in headings.
- Craft lives in what people touch: hover, focus, transitions, empty/loading states (`references/motion-and-detail.md`). Not in decoration.
- Decide what the signature idea becomes at 375px instead of just stacking.

## Pass 5 — Kill the tells and the clutter

Read `references/anti-patterns.md` — especially **"Clutter: the over-filled page"** — and check the build. Then run the **removal test**: for every element that isn't P1 or P2, delete it in your head. If nothing is lost, delete it for real.

A tell is acceptable only when the brief gives a concrete reason for it (e.g. multi-colour type on StockGen is earned because the colours come from the product's own art). "Looks modern" or "feels premium" is not a reason.

## Pass 6 — Critique like a design lead

Render the page (screenshot it if you have a browser). If you can run JavaScript in the page, run `scripts/extract-structure.js` and compare each section against the targets table in `references/content-and-hierarchy.md`. Then answer honestly:

- **Squint test**: blurred, is there exactly one focal point per screen, and does the eye go P1 → P2 → action?
- **Count test**: per screen, how many distinct things compete for attention? More than ~5 means cut or group.
- **Edge test**: per section, how many different left edges does text start on? More than 3 reads as scattered.
- **Logo test**: cover the logo — could this be any other company's site? If yes, strengthen the signature idea (not by adding things).
- **Default test**: list values you didn't consciously choose (font, radius, shadow, easing, grey). Choose them.
- **Copy test**: headings alone tell the story in the brief's voice.
- **Phone test**: at 375px, is it still ordered and is the signature idea still there?

Fix what fails, then deliver. Tell the user the direction and signature idea in one or two sentences so they can push back on the concept, not just pixels.

## Reverse-engineering more references

To add a case file from a live site, run `scripts/extract-tokens.js` (style) and `scripts/extract-structure.js` (content layout) in the page (DevTools console or a browser tool), take screenshots, and fill in `references/case-files/_template.md`. Record the **why** and how to adapt it, not just numbers. `references/case-files/further-reading.md` lists more sites and galleries.

## Reference map

| File | Read when |
|---|---|
| `references/content-and-hierarchy.md` | Pass 2, always |
| `references/directions.md` | Pass 3, always |
| `references/typography.md` | Setting type tokens; any Thai or multilingual page |
| `references/color-and-surface.md` | Setting colour, shadows, backgrounds |
| `references/layout-and-rhythm.md` | Planning sections, grid, alignment |
| `references/motion-and-detail.md` | Interactions, hover, transitions |
| `references/anti-patterns.md` | Pass 5, always |
| `references/case-files/structure-benchmarks.md` | Pass 2, when planning sections — real section skeletons from well-ordered sites |
| `references/case-files/*.md` (others) | After choosing a direction |
