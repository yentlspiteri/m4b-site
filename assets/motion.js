/* M4B · subtle motion
   - .reveal elements fade+rise on scroll (IntersectionObserver)
   - .word-reveal splits a heading into words and reveals them on load
   - .marquee continuous horizontal scroll (prefers-reduced-motion aware)
*/
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Scroll-reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce) {
      reveals.forEach(el => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => io.observe(el));
    }
  }

  // 2) Word reveal — call on load. Splits innerHTML at word boundaries but
  //    preserves child spans (e.g. <span class="emph">next leaders.</span>)
  const wordWrap = (el) => {
    const walk = (node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach(chunk => {
          if (!chunk) return;
          if (/^\s+$/.test(chunk)) {
            frag.appendChild(document.createTextNode(chunk));
          } else {
            const s = document.createElement('span');
            s.className = 'w';
            s.textContent = chunk;
            frag.appendChild(s);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        Array.from(node.childNodes).forEach(walk);
      }
    };
    walk(el);
    const words = el.querySelectorAll('.w');
    words.forEach((w, i) => { w.style.transitionDelay = (i * 55) + 'ms'; });
    requestAnimationFrame(() => el.classList.add('in'));
  };

  document.querySelectorAll('.word-reveal').forEach(el => {
    if (reduce) {
      el.classList.add('in');
      return;
    }
    wordWrap(el);
  });
})();
