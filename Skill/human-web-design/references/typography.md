# Typography

Type carries most of a page's character. Decide it first, before colour.

## 1. Pick the family from the brief's physical object

| Object / feeling | Directions to try | Examples (free unless noted) |
|---|---|---|
| Printed book, essay, publication | Text serif + restrained sans or serif-only | Newsreader, Source Serif 4, Fraunces (careful: overused at high optical size), Instrument Serif (display only), Literata; paid: Ivar, Tiempos, GT Super |
| Hardware manual, technical, tool | Grotesk or mono, thin or regular weights, small sizes | IBM Plex Sans/Mono, JetBrains Mono, Space Grotesk, Geist / Geist Mono; paid: Söhne, GT America |
| Gallery, agency, Swiss | One neo-grotesk, hierarchy from size not weight | Inter Display (if tuned), Hanken Grotesk, Schibsted Grotesk; paid: Plain, Neue Haas Grotesk, Suisse Int'l |
| Loud, playful, youth, creator tools | Heavy geometric/rounded display, uppercase | LINE Seed Sans, Bricolage Grotesque, Unbounded, Archivo Black, Familjen Grotesk |
| Warm, craft, food, hospitality | Soft serif or humanist sans | Fraunces (low opsz), Young Serif, Gelasio, Figtree, Outfit |
| Friendly product, consumer app | Humanist / rounded sans | Google Sans (where licensed), Nunito Sans, Plus Jakarta Sans, Manrope |

Avoid choosing a font because it is the default of a framework. Inter is fine when *tuned* (display cut, tight tracking, size contrast) — the problem is untuned Inter at 400/600.

## 2. Scale with real contrast

- Desktop display should be roughly **3–5× body** (e.g. body 16px → display 56–80px). Mobile ~2–3×.
- Or the opposite on purpose: **tiny headings** (16–18px, same as body) with hierarchy coming from position, weight, colour or the object itself. Stripe Press does this; it reads as confident.
- Use 5–7 sizes total. Count them in the extractor output — generated pages often have 12+ near-duplicate sizes.

A workable scale (ratio ~1.25 for UI, ~1.333–1.5 for marketing):
```
12 · 14 · 16 (body) · 20 · 28 · 40 · 56 · 80
```

## 3. Per-size line-height and tracking

| Role | Line-height | Letter-spacing (Latin) |
|---|---|---|
| Display 48px+ | 0.95–1.1 | −0.02em to −0.03em |
| Heading 24–40px | 1.1–1.25 | −0.01em to −0.02em |
| Body 15–18px | 1.5–1.65 | 0 |
| Small / labels 10–13px | 1.3–1.4 | +0.02em to +0.08em (especially uppercase) |
| Uppercase display | 0.95–1.0 | −0.01em to −0.02em |

## 4. Thai and multilingual pages

Thai has ascending/descending vowels and tone marks stacked above and below; Latin defaults clip or crowd them.

- **Use a Thai-capable family** and declare it explicitly. Good options: IBM Plex Sans Thai / Looped, Noto Sans Thai / Noto Sans Thai Looped, LINE Seed Sans TH, Anuphan, Bai Jamjuree, Sarabun, Chakra Petch (techy), Noto Serif Thai, Trirong (serif).
- **Pair Latin and Thai on purpose**: load both and put the Latin family first in the stack so Latin glyphs use it and Thai falls through, e.g. `font-family: "Google Sans", "IBM Plex Sans Thai", system-ui, sans-serif;` (C Level Hideout pairs Google Sans with IBM Plex Sans this way). Match x-height/weight by eye; adjust with `size-adjust` in `@font-face` if one looks smaller.
- **Line-height**: body 1.6–1.8 for Thai (vs 1.5 Latin); display at least 1.15–1.25. Uppercase-style tight 1.0 leading breaks Thai — scope it with `:lang(en)` or a class.
- **Letter-spacing**: do not apply negative tracking to Thai; it collides marks. Use `:lang(th) { letter-spacing: 0; }` if headings are tracked.
- **Uppercase** has no Thai equivalent — a design built on uppercase display needs a Thai alternative (heavier weight, larger size, or a contrasting colour).
- **Line breaking**: Thai has no spaces between words. Use `word-break: normal` with `line-break: auto` (modern browsers segment Thai), avoid `word-break: break-all`, and prefer `text-wrap: balance` only on short headings.
- Looped Thai styles read as formal/editorial; loopless (modern) styles read as contemporary/product. Choose to match the brief.

## 5. Small details that read as human

- Tabular numbers for prices, stats, tables: `font-variant-numeric: tabular-nums;`
- Real quotes and dashes: “ ” ‘ ’ – —, not straight quotes and hyphens.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Max line length 60–75 characters for reading text (`max-width: 65ch`).
- Hanging punctuation or optical alignment for large quotes when possible.
- Small tracked uppercase labels can be a useful second voice, but use them sparingly — only where the label carries information the heading doesn't. Eyebrow labels and section numbers on every section are a common AI tell (see anti-patterns.md, "Clutter").
