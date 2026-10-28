# Structure benchmarks: how well-ordered sites lay out content

Measured 2026-10-28 with `scripts/extract-structure.js` at ~1265px viewport, plus screenshots. These are **content-layout** case files: they ignore colour and fonts and record how much each section holds and how it is ordered. Sites change — re-measure before quoting numbers.

Column key: **H** = headings in section · **words** · **media** = images/video/large SVG · **btn** = button-styled links/buttons · **edges** = distinct left edges of left-aligned text.

---

## Summary: the patterns that repeat

| Rule | Evidence |
|---|---|
| **One section-heading size for the whole page.** Only the hero is bigger. Rhythm comes from the content, not from varying heading sizes. | Apple: every section H2 = 48px, hero 80px · Things: all 36px · Basecamp: all 37px · Aesop: all ~30px |
| **Only 2–3 type levels.** Section heading, then item titles at near-body size. Nothing in between. | Aesop: 30px sections → 14–16px item titles · Apple: 48px → body |
| **Hero = one heading + one sentence + one action.** | Apple hero 22 words · Things hero 27 words + one text link · GOV.UK hero 12 words + one search box |
| **Very few buttons.** Most actions are text links with an arrow or chevron. | Things: 0 button-styled CTAs in content sections · GOV.UK: 1 (search) · Apple: buttons only in hero and lineup |
| **Short sections are the norm; long sections are one block of prose, not fragments.** | Things 39–76 words per section · Apple 20–80 typical; its 215-word "Why Apple" section is a grid of short consistent tiles · Basecamp's 204-word section is one letter |
| **Few alignment edges.** | GOV.UK 1–4 · Things 0–2 (centred) · Apple content sections 2–3 |
| **Consistent section padding is fine.** | Apple 144px everywhere · Things 81px · Basecamp 81px spacer bands between every section |
| **Headings are plain short sentences, not labels.** | "Explore the lineup." · "iPhone essentials." · "Popular on GOV.UK" · "Browse by category" · "Get Things, Get Done" |
| **Centred text only for short, narrow blocks.** | Things centres every section, and every centred block is ≤ ~40 words at a narrow measure |

What none of them do: eyebrow labels on every section, stat-tile rows, badges, an icon beside every heading, or more than one primary button per screen.

---

## Apple — iPhone page (apple.com/iphone)

One message per screen, consistent scale.

| # | Height | Pad | Heading | H | words | media | btn | edges |
|---|---|---|---|---|---|---|---|---|
| 1 | 390 | 0/0 | "iPhone" 80px + product strip | 1 | 22 | — | 0 | centred |
| 2 | 892 | 56/224 | "iPhone Duo" 56px | 2 | 20 | 4 | 6 | 4 |
| 3 | 1042 | 144/0 | "Explore the lineup." 48px | 7 | 211 | 12 | 6 | centred columns |
| 4 | 956 | 144/144 | "Why Apple is the best place to shop iPhone." 48px | 9 | 221 | 16 | 0 | 10 (tile grid) |
| 5 | 922 | 144/0 | "iPhone essentials." 48px | 3 | 59 | 4 | 0 | 2 |
| 6 | 1172 | 144/144 | "Significant others." 48px | 4 | 78 | 12 | 0 | 2 |
| 7 | 813 | 144/144 | "iPhone" 48px (footer index) | 4 | 69 | 0 | 0 | 3 |

**Lessons:** every section opens with the same-size, left-aligned, sentence-style heading; content under it is either one big visual or a grid of identical tiles; buttons cluster only where buying happens. The lineup section packs 200+ words but reads cleanly because every column has the identical structure (image → name → short line → price → link).

## Things (culturedcode.com/things)

Calm, centred, product-first.

| # | Height | Pad | Heading | H | words | media | btn |
|---|---|---|---|---|---|---|---|
| 1 | 1135 | 0/0 | App icon + "Things" + 1 paragraph + "Watch Introduction Video" link | 1 | 27 | 3 | 0 |
| 2 | 1414 | 81/0 | "Simply Powerful" 36px + 1 paragraph + "See features ›" + large Mac/iPhone screenshot | 1 | 39 | 2 | 0 |
| 3 | 888 | 81/240 | "Get Things, Get Done" 36px + 4 platform items | 5 | 76 | 10 | 0 |
| 4 | 986 | 81/81 | "What People Are Saying" 36px | 1 | 133 | 9 | 2 |
| 5 | 2671 | 81/81 | "Read All About It" 36px (press) | 1 | 699 | 12 | 0 |
| 6 | 620 | 81/81 | "Things Newsletter" 36px | 1 | 60 | 1 | 0 |

**Lessons:** each section is icon/heading → one paragraph (~40 words) → one text link → one real screenshot. No button styling at all in the story; the real UI is the visual. Centred works because paragraphs are short and narrow.

## GOV.UK (gov.uk)

Task-first, zero decoration.

| # | Height | Pad | Heading | H | words | btn | edges |
|---|---|---|---|---|---|---|---|
| 1 | 377 | 30/40 | "The best place to find government services and information" 55px + search | 1 | 12 | 1 | 1 |
| 2 | 321 | 60/28 | "Popular on GOV.UK" 36px — 6 task links in 3 columns, arrow icons | 1 | 40 | 0 | 4 |
| 3 | 2770 | 0/0 | "Services and information" 36px — 30 topic headings as links + "Featured" column | 30 | 325 | 0 | 3 |

**Lessons:** the page is basically one action (search) and two indexes. Links *are* the content; each is written as the user's task ("Check your State Pension forecast"). One left edge for the hero, a strict column grid below, heavy rules to separate groups.

## Basecamp (basecamp.com)

Copy-led, persuasive, honest.

| # | Height | Heading / content | H | words | media |
|---|---|---|---|---|---|
| 1 | 638 | Split: product screenshot left · right: link index ("Pricing & sign up — A free plan + paid upgrades", 7 lines) + H1 37px + one sentence | 2 | (index) | screenshot |
| 2 | 958 | A signed letter from the CEO, ~200 words of prose on a paper card | 0 | 204 | photo + signature |
| 3 | 816 | "Take a minute to meet some of…" 37px + video | 1 | 33 | 1 |
| 5 | 584 | "We asked our customers…" 37px — quotes | 1 | 205 | 0 |
| 7 | 789 | "How about a quick demonstration…" 37px + video | 1 | 31 | 1 |
| 9 | 717 | "Big numbers. Highly-trusted…" 37px + one image | 1 | 6 | 1 |
| 14 | 302 | "Want to see a live demo…" 37px | 1 | 42 | 0 |

Sections are separated by identical 163px spacer bands.

**Lessons:** the hero replaces feature cards with an **index of links, each with an em-dash explanation** — scannable and honest. Persuasion is a real letter in prose, not bullet benefits. Every later section = one conversational heading + one thing (video, quotes, image).

## Aesop (aesop.com)

Editorial retail, two-level hierarchy.

- Hero: full-bleed video, centred small kicker + heading + one line + one outlined button.
- Section headings ~30px, left-aligned on one edge ("Browse by category", "An end to aimless searching", "Curated Sets").
- Item titles 14–16px under images — a big jump from 30px, nothing in between.
- Category browse = horizontal row of image + one-word label.
- Gift finder = 50/50 split: short text + one outlined CTA on the left, one large photo on the right.

**Lessons:** two type levels and one left edge make a long retail page feel calm. Each split section has one action.

---

## Not yet measured

stripe.com and plausible.io were on the list but the browser extension did not have permission to open them in this session. Measure them with `scripts/extract-structure.js` when available — both are good examples of dense-but-ordered content.
