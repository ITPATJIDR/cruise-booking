// extract-structure.js — paste into the DevTools console (or run via a browser
// tool) on a page whose CONTENT LAYOUT you want to study or check.
// Complements extract-tokens.js: that one measures style, this one measures
// hierarchy and density.
//
// One line per top-level section:
//   #|h<height>|p<padTop>/<padBottom>|<first heading> <size>|
//   H<headings> w<words> m<media> i<small icons> b<button-styled actions>
//   e<left edges of left-aligned text> c<centred text els>/<all text els>
//
// Compare against the targets table in references/content-and-hierarchy.md.
(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };

  // Sections: explicit <section>s / main's children, outermost only. If fewer
  // than 3, descend into the tallest wrapper until one stacks >= 3 big blocks.
  let secs = [...document.querySelectorAll('main section, body > section, main > *, [role="main"] > *')]
    .filter((e) => vis(e) && e.getBoundingClientRect().height > 120);
  secs = secs.filter((s) => !secs.some((o) => o !== s && o.contains(s)));
  if (secs.length < 3) {
    let w = document.body;
    for (let i = 0; i < 7; i++) {
      const kids = [...w.children].filter(vis);
      const big = kids.filter((x) => x.getBoundingClientRect().height > 120);
      if (big.length >= 3) { secs = big; break; }
      const next = kids.sort((a, b) => b.getBoundingClientRect().height - a.getBoundingClientRect().height)[0];
      if (!next) break;
      w = next;
    }
  }
  secs = secs.slice(0, 30);

  const isButton = (a) => {
    const s = getComputedStyle(a);
    const t = a.textContent.trim();
    return (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(s.borderTopWidth) > 0) && t.length > 0 && t.length < 40;
  };

  const lines = secs.map((sec, i) => {
    const r = sec.getBoundingClientRect();
    const s = getComputedStyle(sec);
    const all = [...sec.querySelectorAll('*')].filter(vis);
    const heads = all.filter((e) => /^H[1-4]$/.test(e.tagName));
    const text = all.filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2));
    const media = all.filter((e) => ['IMG', 'VIDEO', 'CANVAS', 'PICTURE'].includes(e.tagName) ||
      (e.tagName === 'svg' && e.getBoundingClientRect().width > 48)).length;
    const icons = all.filter((e) => (e.tagName === 'svg' || e.tagName === 'IMG') && e.getBoundingClientRect().width <= 32).length;
    const buttons = all.filter((e) => (e.tagName === 'BUTTON' || e.tagName === 'A') && isButton(e)).length;
    const words = (sec.innerText || '').split(/\s+/).filter(Boolean).length;
    const left = text.filter((e) => !['center', 'right', 'end'].includes(getComputedStyle(e).textAlign));
    const edges = new Set(left.map((e) => Math.round(e.getBoundingClientRect().left / 16))).size;
    const centred = text.length - left.length;
    const h = heads[0];
    const head = h ? `${h.textContent.trim().replace(/\s+/g, ' ').slice(0, 40)} ${parseInt(getComputedStyle(h).fontSize)}px` : '-';
    return `${i + 1}|h${Math.round(r.height)}|p${parseInt(s.paddingTop)}/${parseInt(s.paddingBottom)}|${head}|` +
      `H${heads.length} w${words} m${media} i${icons} b${buttons} e${edges} c${centred}/${text.length}`;
  });

  const out = `${document.title} | viewport ${document.documentElement.clientWidth}px | page ${document.body.scrollHeight}px | ${lines.length} sections\n${lines.join('\n')}`;
  console.log(out);
  return out;
})();
