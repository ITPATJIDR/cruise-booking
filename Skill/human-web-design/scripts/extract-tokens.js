// extract-tokens.js — paste into the DevTools console (or run via a browser
// automation tool) on a page you want to study. Prints a compact summary of the
// design tokens actually in use, ranked by frequency.
//
// Use the output to fill references/case-files/_template.md. The numbers tell you
// WHAT the site chose; your job in the case file is to explain WHY.
(() => {
  const visible = [...document.querySelectorAll('body *')].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  const styled = visible.map((e) => [e, getComputedStyle(e)]);
  const textEls = styled.filter(([e]) =>
    [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
  );
  const top = (arr, n = 10) => {
    const m = {};
    arr.forEach((v) => { if (v) m[v] = (m[v] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n)
      .map(([k, c]) => `${k} ×${c}`).join('  |  ');
  };
  const clear = (c) => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent';
  const cleanShadow = (s) => s.replace(/rgba\(0, 0, 0, 0\) 0px 0px 0px 0px,?\s*/g, '').trim();

  const rootVars = [...document.styleSheets]
    .flatMap((ss) => { try { return [...ss.cssRules]; } catch { return []; } })
    .filter((r) => r.selectorText === ':root' || r.selectorText === 'html')
    .map((r) => r.style ? [...r.style].filter((p) => p.startsWith('--'))
      .map((p) => `${p}: ${r.style.getPropertyValue(p).trim()}`).join('\n') : '')
    .join('\n').slice(0, 3000);

  const b = getComputedStyle(document.body);
  const heads = [...document.querySelectorAll('h1,h2,h3')].slice(0, 12).map((h) => {
    const s = getComputedStyle(h);
    return `${h.tagName} "${h.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)}" — ` +
      `${s.fontFamily.split(',')[0]} ${s.fontSize}/${s.lineHeight} w${s.fontWeight} ` +
      `ls ${s.letterSpacing} ${s.textTransform !== 'none' ? s.textTransform : ''}`;
  });

  const out = [
    `PAGE        ${document.title}  (height ${document.body.scrollHeight}px)`,
    `BODY        ${b.fontFamily.split(',').slice(0, 3).join(',')} ${b.fontSize}/${b.lineHeight}  color ${b.color}  bg ${b.backgroundColor}`,
    `FONTS       ${[...new Set([...document.fonts].map((f) => `${f.family} ${f.weight}`))].join(', ')}`,
    `FAMILIES    ${top(textEls.map(([, s]) => s.fontFamily.split(',')[0]), 6)}`,
    `SIZES       ${top(textEls.map(([, s]) => s.fontSize), 14)}`,
    `WEIGHTS     ${top(textEls.map(([, s]) => s.fontWeight))}`,
    `TEXT COLOR  ${top(textEls.map(([, s]) => s.color), 8)}`,
    `BACKGROUND  ${top(styled.map(([, s]) => s.backgroundColor).filter(clear), 8)}`,
    `GRADIENTS   ${top(styled.map(([, s]) => s.backgroundImage).filter((x) => x.includes('gradient')).map((x) => x.slice(0, 120)), 4)}`,
    `RADIUS      ${top(styled.map(([, s]) => s.borderRadius).filter((r) => r !== '0px'), 8)}`,
    `BORDERS     ${top(styled.map(([, s]) => (s.borderTopWidth !== '0px' ? `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}` : null)), 6)}`,
    `SHADOWS     ${top(styled.map(([, s]) => cleanShadow(s.boxShadow)).filter((x) => x && x !== 'none'), 5)}`,
    `MAX-WIDTH   ${top(styled.map(([, s]) => s.maxWidth).filter((x) => x !== 'none' && x !== '100%'), 6)}`,
    `GRID COLS   ${top(styled.map(([, s]) => (s.display === 'grid' ? s.gridTemplateColumns.slice(0, 80) : null)), 6)}`,
    `GAPS        ${top(styled.map(([, s]) => s.gap).filter((x) => x !== 'normal'), 8)}`,
    `SECTION PAD ${top(styled.filter(([e]) => ['SECTION', 'HEADER', 'FOOTER', 'MAIN'].includes(e.tagName)).map(([, s]) => `${s.paddingTop}/${s.paddingBottom}`), 6)}`,
    `TRANSITIONS ${top(styled.map(([, s]) => s.transition).filter((x) => x && !x.startsWith('all 0s')).map((x) => x.slice(0, 140)), 5)}`,
    `HEADINGS\n  ${heads.join('\n  ')}`,
    `ROOT VARS\n${rootVars || '(none found or cross-origin stylesheets)'}`,
  ].join('\n');

  console.log(out);
  return out;
})();
