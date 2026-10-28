# Layout and rhythm

## Order sections by the reader's questions

Write the 4–7 questions the reader has, in order, then make one section per question. Typical for a product:

1. What is this? (hero — show the real thing)
2. What can it do for me? (capabilities, shown not listed)
3. How does it work / how hard is it? (process, demo)
4. Can I trust it? (proof: real numbers, real customers, real work)
5. What does it cost? (pricing)
6. What do I do now? (action)

Portfolio: Who are you → What have you made (lead with the work) → How do you work → How do I contact you. A portfolio can be one strong interactive view of the work plus contact (C Level Hideout is essentially this).

Drop any section that answers no question.

Fewer, fuller sections beat many thin ones. Five well-ordered sections usually do more than ten.

## Grid and alignment

- Pick a container and a column logic: e.g. 12-col at 1440 max with 24px gutters, or a narrow reading column (≈ 640–760px) for editorial and small-portfolio pages.
- **Keep alignment edges few.** In each section, text should start on one left edge (or share one centre axis). Elements placed "wherever they fit" are the main cause of a scattered look.
- **Use one content width per kind**: all reading text at one measure, all media at one container width. Don't give every block its own width.
- **Spacing shows grouping.** Use a scale where space between groups is at least twice the space inside them; headings sit closer to their content than to the section above.
- Break the grid only on purpose and rarely — once or twice per page: full-bleed media, an asymmetric 5/7 split, a scroller that runs off the edge. A break only reads as intentional if everything else is aligned.
- Pentagram uses a tiny caption column next to a wide content column (`12px 718px` in its grid); one consistent caption + body pairing reads editorial. Applied to every element it becomes clutter.

Quick sketch before building — for each section write its skeleton in one line, e.g.:
```
Hero:     [P1 headline + 1 line] left | [real product visual] right   · 1 CTA
Work:     [heading] / [grid of 6 projects, same card]                  · link "All work"
Process:  [heading] / [3-step numbered list, prose]                    · no CTA
Contact:  [one sentence + email]                                       · 1 CTA
```
If a line needs more than three items, the section is overloaded.

## Rhythm

Generated pages repeat the same block. Plan contrast across the scroll:

| Lever | Dense | Open |
|---|---|---|
| Spacing | 48px section padding, tight lists | 160px+ padding, one statement |
| Scale | Many small items, tables | One oversized number or headline |
| Width | Narrow column | Full bleed |
| Tone | Surface/inverted block | Bare background |

Alternate at least two levers between neighbouring sections. A consistent section padding (e.g. 96px) is fine *if* other levers vary. Rhythm comes from changing scale and density — never from adding more elements to a section.

## Hero patterns that aren't "centred headline + two buttons"

- **Split with real output**: copy left, a masonry or live grid of the product's real outputs right (StockGen).
- **The object is the interface**: render the products as objects you browse (Stripe Press's book spines; C Level Hideout's fanned deck of project cards in browser frames).
- **Work first**: no hero copy, the latest project full-bleed with a caption (Panic, Pentagram).
- **Interactive sentence**: "We design [Brand Identity ▾] for [Technology ▾]" — the copy itself is the filter (Pentagram).
- **Try it now**: a working input in the hero (StockGen's prompt box with mode tabs).
- **Index/catalogue**: a dense list or table as the first thing you see (works for archives, shops, tools).

## Navigation

- Floating pill nav (C Level Hideout, StockGen) is now common; earn it with a small detail (a segmented language switch, an active indicator that slides).
- Alternatives: a manual-style nav with icons + tiny sub-links per item (Teenage Engineering), a plain text row (Pentagram), a side index / scroll ticker (Stripe Press).

## Mobile

Decide what each signature idea becomes at 375px: fanned deck → swipeable stack; masonry → 2-col scroller; asymmetric split → label above content. Don't just stack everything centred.
