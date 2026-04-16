/* M4B · subtle motion
   - .reveal elements fade+rise on scroll (IntersectionObserver)
   - .word-reveal splits a heading into words and reveals them on load
   - .marquee continuous horizontal scroll (prefers-reduced-motion aware)
   - .counter rolls numbers up from 0 when visible (data-target="57")
   - .nav-floating shrinks after scrollY > 120
   - #reading-progress bar at top tracks document scroll
   - .pill-cta .dot breathing pulse is pure CSS (see brand.css)
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

  // 3) Number counter roll-up — animates .counter elements from 0 to data-target
  //    when they enter the viewport. Easing is easeOutCubic. Duration ~1.2s.
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const formatNumber = (n, decimals) => {
      if (decimals > 0) return n.toFixed(decimals);
      return Math.round(n).toString();
    };
    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.target);
      const decimals = (el.dataset.target.split('.')[1] || '').length;
      const duration = parseInt(el.dataset.duration || '1200', 10);
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        el.textContent = formatNumber(target * eased, decimals);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = formatNumber(target, decimals);
      };
      requestAnimationFrame(tick);
    };
    if (reduce) {
      counters.forEach(el => {
        const target = parseFloat(el.dataset.target);
        const decimals = (el.dataset.target.split('.')[1] || '').length;
        el.textContent = formatNumber(target, decimals);
      });
    } else {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            cio.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(el => cio.observe(el));
    }
  }

  // 4) Sticky-nav shrink — adds .scrolled to .nav-floating after 120px
  const nav = document.querySelector('.nav-floating');
  if (nav && !reduce) {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (y > 120) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // 5) Scroll progress line — injected at top, tracks document scroll
  if (!document.getElementById('reading-progress') && !reduce) {
    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    document.body.appendChild(bar);
    const updateBar = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const height = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = pct + '%';
    };
    updateBar();
    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar, { passive: true });
  }
})();
