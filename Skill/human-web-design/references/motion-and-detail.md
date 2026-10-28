# Motion and detail

Detail is where a page proves someone cared. Spend effort on a few things people touch, not on scroll-triggered fade-ins everywhere.

## Motion

- **Transition specific properties**, never `all`: `transition: background-color .15s, color .15s, border-color .15s, transform .2s;`
- **Durations**: colour/opacity 120–180ms; small movement 180–260ms; large panels 300–450ms.
- **Physical motion uses springs.** CSS `linear()` can encode a spring curve; C Level Hideout animates its card deck with a ~0.42s `linear()` spring that overshoots slightly (to ~1.09) and settles. Generate one with a spring easing tool, or approximate with `cubic-bezier(.2,.9,.25,1.15)` for a light overshoot.
- **Enter animations** only for things that genuinely arrive (a modal, a toast, a new item). Avoid fading every section in on scroll; if you do reveal content, keep it subtle (8–16px travel) and fast, and never hide content from users who scroll quickly.
- Respect `prefers-reduced-motion: reduce` — replace movement with opacity or nothing.

## Interaction details

- **Hover matches material**: paper cards lift 2–4px with a tinted shadow; dark tiles brighten their hairline; text links underline with `text-underline-offset: .2em`.
- **Pressed state**: darken ink (`--ink-pressed`) or nudge `translateY(1px)`.
- **Focus**: a visible ring in brand colour, `outline: 2px solid var(--text); outline-offset: 3px;` — never removed.
- **Segmented controls** for small mode choices (EN/TH, grid/rotate view) with a sliding thumb.
- **Counts in filters** ("All 11", "Web 6") — tells users what they'll get before they click.
- **Real states**: empty, loading (skeleton matching the real layout), error copy in the brand voice.

## Micro-detail checklist

- Favicon and page `<title>` written for this site.
- Selection colour: `::selection { background: var(--accent); color: var(--on-accent); }`
- Scrollbar or overscroll colour matches the background on dark pages (`color-scheme: dark`).
- Images have proper aspect ratios and `object-fit`, no stretching; real `alt` text.
- Numbers formatted for the locale (`Intl.NumberFormat`), Thai Buddhist year only if the audience expects it.
- Footer has a reason to exist: sitemap, contact, a small sign-off in the brand voice.
- Inline SVG icons from one set, one stroke width, sized to the text they sit next to.
