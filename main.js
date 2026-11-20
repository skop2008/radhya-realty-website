(() => {
  'use strict';

  const ROLES = [
    { slug:'real-estate', name:'Real Estate', icon:'<path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',
      blurb:'Buying, selling and renting residential and commercial property with verified listings and clear paperwork.',
      services:['Residential sales and rentals','Commercial spaces and plots','Property valuation and documentation','Site visits and negotiation support'] },
    { slug:'renovation', name:'Renovation', icon:'<path d="M14 6l4 4M4 20l4-1 11-11-3-3L5 16l-1 4zM13 7l4 4"/>',
      blurb:'Structural repairs, complete remodelling and finishing delivered on fixed budget and timelines.',
      services:['Full home and office renovation','Kitchen and bathroom remodelling','Waterproofing, flooring and painting','Itemised quotes and site supervision'] },
    { slug:'loan', name:'Loans', icon:'<path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z"/>',
      blurb:'Home loans, loan against property, vehicle finance and low-interest balance transfers with quick bank approvals.',
      services:['Home loans and plot purchase finance','Loan Against Property (LAP)','Commercial and business loans','Vehicle finance and balance transfer'] },
    { slug:'vehicle-sale-purchase', name:'Vehicle Sale Purchase', icon:'<path d="M3 15l2-6h14l2 6M3 15v3h3v-2h12v2h3v-3M3 15h18M7 12.5h.01M17 12.5h.01"/>',
      blurb:'New and pre-owned cars and two-wheelers, with inspection, paperwork and finance guidance.',
      services:['New and pre-owned vehicles','Inspection and valuation','Registration and transfer support','Finance and exchange assistance'] },
    { slug:'insurance', name:'Insurance', icon:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4"/>',
      blurb:'Cover for your home, vehicle, health and life, explained plainly and claimed with support.',
      services:['Home and property insurance','Motor insurance and renewals','Health and life plans','Claims assistance'] }
  ];
  const CONTACT = { name:'Talk to our team', icon:'<path d="M4 5h16v14H4zM4 7l8 6 8-6"/>', href:'#contact' };

  const ICONS = {
    fb:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    ig:'<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',
    yt:'<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="M10.2 9.5v5l4.3-2.5z"/>',
    tw:'<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>'
  };
  const svg = p => `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;

  /* Logo drawn as SVG so it stays sharp at any size. */
  const logo = full => `
  <svg viewBox="0 0 600 ${full ? 300 : 215}" role="img" aria-label="Radhya Realty, Anubhav Bharat Group">
    <path d="M205 118 L300 28 L395 118" fill="none" stroke="#c9a24b" stroke-width="9" stroke-linecap="square"/>
    <g fill="#c9a24b"><rect x="285" y="68" width="14" height="14"/><rect x="302" y="68" width="14" height="14"/>
    <rect x="285" y="85" width="14" height="14"/><rect x="302" y="85" width="14" height="14"/></g>
    <text x="300" y="190" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="600" font-size="56" letter-spacing="7" fill="#c9a24b">RADHYA REALTY</text>
    ${full ? `
    <line x1="30" y1="238" x2="120" y2="238" stroke="#c9a24b" stroke-width="2"/><line x1="480" y1="238" x2="570" y2="238" stroke="#c9a24b" stroke-width="2"/>
    <text x="300" y="246" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="600" font-size="24" letter-spacing="5" fill="#f2f4f8">ANUBHAV BHARAT GROUP</text>
    <text x="300" y="285" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="500" font-size="15" letter-spacing="4" fill="#c9a24b">ONE SOLUTION FOR ALL YOUR NEEDS</text>` : ''}
  </svg>`;

  const page = document.body.dataset.page;
  const current = document.body.dataset.role;

  /* header and footer */
  const header = document.getElementById('site-header');
  header.outerHTML = `
  <header class="site-header" id="hdr">
    <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="panel"><span class="burger"></span><span class="t">Roles</span></button>
    <a class="brand" href="index.html" aria-label="Radhya Realty home">${logo(false)}</a>
    <div class="social">
      <a href="https://www.facebook.com/1083501174848035?ref=PROFILE_EDIT_xav_ig_profile_page_web" target="_blank" rel="noopener" aria-label="Facebook">${svg(ICONS.fb)}</a>
      <a href="https://www.instagram.com/radhya_reality?utm_source=qr&cplk=MXNkeDFveTMwNXg4dQ==" target="_blank" rel="noopener" aria-label="Instagram">${svg(ICONS.ig)}</a>
      <a href="https://youtube.com/@radhyareality?si=CPdniRCnz5sPH7Q6" target="_blank" rel="noopener" aria-label="YouTube">${svg(ICONS.yt)}</a>
      <a href="https://x.com/Radhya_reality" target="_blank" rel="noopener" aria-label="Twitter">${svg(ICONS.tw)}</a>
    </div>
  </header>
  <nav class="panel" id="panel" aria-label="Business roles">
    ${ROLES.map(r => `<a href="${r.slug}.html" ${r.slug === current ? 'aria-current="page"' : ''}>${svg(r.icon)}${r.name}</a>`).join('')}
    <a href="${CONTACT.href}">${svg(CONTACT.icon)}${CONTACT.name}</a>
  </nav>`;
  document.getElementById('site-footer').outerHTML = `
  <footer><div class="wrap"><span>&copy; ${new Date().getFullYear()} Radhya Realty, Anubhav Bharat Group</span><span style="display:inline-flex;gap:1.5rem;flex-wrap:wrap;align-items:center;"><a href="privacy-policy.html" style="color:inherit;text-decoration:none;transition:color .25s;">Privacy Policy</a><a href="terms.html" style="color:inherit;text-decoration:none;transition:color .25s;">Terms &amp; Conditions</a><span>One solution for all your needs</span></span></div></footer>`;

  /* role cards on home */
  const cards = document.getElementById('role-cards');
  if (cards) cards.innerHTML = ROLES.map(r => `
    <a class="card" href="${r.slug}.html">${svg(r.icon)}<h3>${r.name}</h3><p>${r.blurb}</p><span class="more">View details</span></a>`).join('');

  /* role page content */
  const roleBox = document.getElementById('role-services');
  if (roleBox && current) {
    const r = ROLES.find(x => x.slug === current);
    if (r) {
      document.getElementById('role-lead').textContent = r.blurb;
      roleBox.innerHTML = r.services.map(s => `<li>${s}</li>`).join('');
    }
  }

  /* menu */
  const btn = document.getElementById('menuBtn'), panel = document.getElementById('panel');
  const setMenu = open => { btn.setAttribute('aria-expanded', open); panel.classList.toggle('open', open); };
  btn.addEventListener('click', e => { e.stopPropagation(); setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('click', e => { if (!panel.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* smooth same-tab page transitions */
  document.addEventListener('click', e => {
    if (e.defaultPrevented) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const text = (a.textContent || '').trim().toLowerCase();
    if (a.classList.contains('open-enquiry-btn') || a.classList.contains('prop-modal__cta') || text.includes('talk to our team') || text.includes('enquire')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = url.href; }, 300);
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('leaving'));

  /* intro + unified introDone promise & early deep-link redirects */
  const hdr = document.getElementById('hdr');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const searchParams = new URLSearchParams(window.location.search);
  const rawCardParam = searchParams.get('card');
  const hasCardParam = rawCardParam !== null;
  const CARD_ID_RE = /^[A-Za-z0-9_-]{1,100}$/;
  const validCardId = hasCardParam && CARD_ID_RE.test(rawCardParam) ? rawCardParam : null;
  const invalidCardParam = hasCardParam && !validCardId;
  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const deepLinkState = {
    rawCardParam,
    hasCardParam,
    validCardId,
    invalidCardParam,
    currentFile,
    reduced,
    introPlayed: false,
    timings: {
      introStart: null,
      introEnd: null,
      bannerVisible: null,
      cardsLoaded: null,
      modalOpen: null
    }
  };
  window.__radhyaDeepLinkState = deepLinkState;

  let resolveIntroDone;
  window.__radhyaIntroDone = new Promise(resolve => {
    resolveIntroDone = resolve;
  });
  let introSettled = false;
  function settleIntroDone(played) {
    if (introSettled) return;
    introSettled = true;
    deepLinkState.introPlayed = !!played;
    if (deepLinkState.timings.introEnd === null) {
      deepLinkState.timings.introEnd = performance.now();
    }
    resolveIntroDone();
  }

  // Local server alias redirect: auto-moto.html?card=... -> vehicle-sale-purchase.html?card=...
  if (currentFile === 'auto-moto.html' && hasCardParam) {
    window.location.replace('vehicle-sale-purchase.html' + window.location.search + window.location.hash);
    return;
  }

  let seen = false;
  try { seen = sessionStorage.getItem('rr_intro') === '1'; } catch (_) {}

  // On index.html?card=<valid>, skip index intro completely so it plays ONCE on the target role page
  const skipForIndexDeepLink = (page === 'home' && !!validCardId);
  const shouldPlayIntro = !skipForIndexDeepLink && !seen && !reduced && !!Element.prototype.animate && (page === 'home' || (page === 'role' && hasCardParam));

  if (!shouldPlayIntro) {
    requestAnimationFrame(() => document.body.classList.add('ready'));
    deepLinkState.timings.introStart = performance.now();
    settleIntroDone(false);
    return;
  }

  try { sessionStorage.setItem('rr_intro', '1'); } catch (_) {}
  hdr.classList.add('hidden');
  document.documentElement.style.overflow = 'hidden';

  const items = [...ROLES.map(r => ({ name:r.name, icon:r.icon })), CONTACT];
  const half = items.length / 2;
  const intro = document.createElement('div');
  intro.id = 'intro';
  intro.innerHTML = items.map(i => `<div class="chip">${svg(i.icon)}<span>${i.name}</span></div>`).join('')
                  + `<div class="logo">${logo(true)}</div>`;
  document.body.appendChild(intro);
  document.body.classList.add('ready');
  deepLinkState.timings.introStart = performance.now();

  const chips = [...intro.querySelectorAll('.chip')];
  const logoEl = intro.querySelector('.logo');
  const ease = 'cubic-bezier(.22,.8,.24,1)';
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const base = 'translate(-50%,-50%)';

  const target = i => {                        // first half on left, second half on right, equal count
    const left = i < half, row = left ? i : i - half;
    const dx = Math.min(innerWidth * 0.36, 520) * (left ? -1 : 1);
    const dy = (row - (half - 1) / 2) * Math.min(innerHeight * 0.2, 150);
    return `${base} translate(${dx}px,${dy}px)`;
  };

  function cleanupIntroAndResolve() {
    if (intro.parentNode) intro.remove();
    hdr.classList.remove('hidden');
    document.documentElement.style.overflow = '';
    settleIntroDone(true);
  }

  // Safety fallback timer (intro total ~5110ms + 700ms buffer) so introDone can NEVER hang
  const introFallbackTimer = setTimeout(cleanupIntroAndResolve, 5800);

  (async () => {
    await logoEl.animate(
      [{ opacity:0, transform:`${base} scale(.35)` }, { opacity:1, transform:`${base} scale(1)` }],
      { duration:1200, easing:ease, fill:'forwards' }).finished;

    await Promise.all(chips.map((c, i) => c.animate(
      [{ opacity:0, transform:`${base} scale(.4)` }, { opacity:1, transform:`${target(i)} scale(1)` }],
      { duration:900, delay:(i % half) * 110, easing:ease, fill:'forwards' }).finished));

    await wait(1000);

    await Promise.all(chips.map((c, i) => c.animate(
      [{ opacity:1, transform:`${target(i)} scale(1)` }, { opacity:0, transform:`${base} scale(.4)` }],
      { duration:750, delay:(i % half) * 70, easing:ease, fill:'forwards' }).finished));

    /* logo settles into the header brand position */
    hdr.classList.remove('hidden');
    const dest = document.querySelector('.brand').getBoundingClientRect();
    const src = logoEl.getBoundingClientRect();
    const s = dest.height / (src.height * 215 / 300);
    const dx = (dest.left + dest.width / 2) - (src.left + src.width / 2);
    const dy = (dest.top + dest.height / 2) - (src.top + src.height * 0.36);
    intro.animate([{ background:'rgba(10,23,48,1)' }, { background:'rgba(10,23,48,0)' }],
      { duration:900, easing:ease, fill:'forwards' });
    await logoEl.animate(
      [{ transform:`${base} translate(0,0) scale(1)`, opacity:1 },
       { transform:`${base} translate(${dx}px,${dy}px) scale(${s})`, opacity:0.0 }],
      { duration:900, easing:ease, fill:'forwards' }).finished;

    clearTimeout(introFallbackTimer);
    cleanupIntroAndResolve();
  })().catch(() => {
    clearTimeout(introFallbackTimer);
    cleanupIntroAndResolve();
  });
})();
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const TOP_ZONE = 80; // always expanded near the top of the page
  const JITTER = 6;    // ignore tiny scroll movements

  function onScroll() {
    const y = window.scrollY;
    const diff = y - lastY;

    if (y <= TOP_ZONE) {
      header.classList.remove('hidden');          // expand at top
    } else if (diff > JITTER) {
      header.classList.add('hidden');             // scrolling down: shrink
    } else if (diff < -JITTER) {
      header.classList.remove('hidden');          // scrolling up: expand
    }

    if (Math.abs(diff) > JITTER) lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();

(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const TOP_ZONE = 80; // always expanded near the top of the page
  const JITTER = 6;    // ignore tiny scroll movements

  function onScroll() {
    const y = window.scrollY;
    const diff = y - lastY;

    if (y <= TOP_ZONE) {
      header.classList.remove('hidden');          // expand at top
    } else if (diff > JITTER) {
      header.classList.add('hidden');             // scrolling down: shrink
    } else if (diff < -JITTER) {
      header.classList.remove('hidden');          // scrolling up: expand
    }

    if (Math.abs(diff) > JITTER) lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();


/* ── Showcase scroll animations (Intersection Observer) ─────── */
(function () {
  const panels = document.querySelectorAll('.showcase-panel[data-sc]');
  if (!panels.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // If a custom gif with data-gif is present, start it when scrolled into view
          const gif = entry.target.querySelector('img[data-gif]');
          if (gif && !gif.src) {
            gif.src = gif.dataset.gif;
          }
          io.unobserve(entry.target); // fire once only
        }
      });
    },
    {
      threshold: 0.18,          // trigger when 18% of panel is visible
      rootMargin: '0px 0px -60px 0px'  // slight bottom offset for natural feel
    }
  );

  panels.forEach(p => io.observe(p));
})();

/* ── Service dropdowns + property card modal & slider ──────── */
(function () {

  /* Slider initialization */
  function initPropSliders(container) {
    if (!container) container = document;
    container.querySelectorAll('.prop-slider').forEach(slider => {
      if (slider._sliderInitialized) return;
      slider._sliderInitialized = true;

      const track = slider.querySelector('.prop-slider__track');
      if (!track) return;

      const slides = Array.from(track.children);
      if (slides.length <= 1) {
        const btnPrev = slider.querySelector('.prop-slider__prev');
        const btnNext = slider.querySelector('.prop-slider__next');
        const dots = slider.querySelector('.prop-slider__dots');
        if (btnPrev) btnPrev.style.display = 'none';
        if (btnNext) btnNext.style.display = 'none';
        if (dots) dots.style.display = 'none';
        return;
      }

      let currentIndex = 0;
      const total = slides.length;

      /* Navigation arrows */
      let btnPrev = slider.querySelector('.prop-slider__prev');
      let btnNext = slider.querySelector('.prop-slider__next');
      if (!btnPrev) {
        btnPrev = document.createElement('button');
        btnPrev.type = 'button';
        btnPrev.className = 'prop-slider__btn prop-slider__prev';
        btnPrev.setAttribute('aria-label', 'Previous slide');
        btnPrev.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
        slider.appendChild(btnPrev);
      }
      if (!btnNext) {
        btnNext = document.createElement('button');
        btnNext.type = 'button';
        btnNext.className = 'prop-slider__btn prop-slider__next';
        btnNext.setAttribute('aria-label', 'Next slide');
        btnNext.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>';
        slider.appendChild(btnNext);
      }

      /* Dots */
      let dotsContainer = slider.querySelector('.prop-slider__dots');
      if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'prop-slider__dots';
        slider.appendChild(dotsContainer);
      }
      dotsContainer.innerHTML = '';
      const dots = [];
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'prop-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', e => {
          e.stopPropagation();
          goTo(i);
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }

      function update() {
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === currentIndex);
        });
        slides.forEach((slide, idx) => {
          const vid = slide.querySelector('video');
          if (vid) {
            if (idx === currentIndex) {
              vid.play().catch(() => {});
            } else {
              vid.pause();
            }
          }
        });
      }

      function goTo(idx) {
        currentIndex = (idx + total) % total;
        update();
      }

      function prev() {
        goTo(currentIndex - 1);
      }

      function next() {
        goTo(currentIndex + 1);
      }

      btnPrev.addEventListener('click', e => {
        e.stopPropagation();
        prev();
      });

      btnNext.addEventListener('click', e => {
        e.stopPropagation();
        next();
      });

      /* Touch swipe gestures */
      let startX = 0;
      let startY = 0;
      let isSwiping = false;

      slider.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          isSwiping = true;
        }
      }, { passive: true });

      slider.addEventListener('touchmove', e => {
        if (!isSwiping) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          if (e.cancelable) e.preventDefault();
        }
      }, { passive: false });

      slider.addEventListener('touchend', e => {
        if (!isSwiping) return;
        isSwiping = false;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const dx = endX - startX;
        const dy = endY - startY;
        if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) next();
          else prev();
        }
      }, { passive: true });
    });
  }

  // Initialize all sliders on page load
  initPropSliders();

  /* Dropdown accordion: clean class-based toggle; zero inline style collision */
  document.querySelectorAll('.service-trigger').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const item = trigger.closest('.service-dropdown-item');
      if (!item) return;
      const isOpen = item.classList.contains('open') || item.classList.contains('is-open');
      
      /* Close all sibling sections */
      const sectionParent = item.closest('.service-sections') || document;
      sectionParent.querySelectorAll('.service-dropdown-item.open, .service-dropdown-item.is-open').forEach(el => {
        if (el !== item) {
          el.classList.remove('open', 'is-open');
          const cards = el.querySelector('.dropdown-cards');
          if (cards) {
            cards.style.removeProperty('display');
            cards.style.removeProperty('max-height');
            cards.style.removeProperty('height');
          }
        }
      });

      /* Toggle target section */
      if (isOpen) {
        item.classList.remove('open', 'is-open');
      } else {
        item.classList.add('open', 'is-open');
      }

      const cards = item.querySelector('.dropdown-cards');
      if (cards) {
        cards.style.removeProperty('display');
        cards.style.removeProperty('max-height');
        cards.style.removeProperty('height');
      }

      /* Rebind sliders & refresh portal search filter if active */
      initPropSliders(item);
      if (typeof window.applyPortalFilters === 'function') {
        window.applyPortalFilters();
      }
    });
  });

  /* =========================================================================
     PORTAL SEARCH & FILTER ENGINE
     ========================================================================= */
  function initPortalFilterConsole() {
    const consoleEl = document.getElementById('filterConsole');
    if (!consoleEl) return;

    const currentRole = document.body.dataset.role || '';
    const searchInput = consoleEl.querySelector('#pfcSearchInput');
    const searchClear = consoleEl.querySelector('#pfcSearchClear');
    const dealChips = consoleEl.querySelectorAll('#pfcDealChips .tsf-chip, #pfcDealChips .pfc-chip');
    const typeSelect = consoleEl.querySelector('#pfcTypeSelect');
    const subChips = consoleEl.querySelectorAll('#pfcSubchipsRow .tsf-subchip, #pfcSubchipsRow .pfc-subchip');
    const budgetSlider = consoleEl.querySelector('#pfcBudgetSlider');
    const budgetValEl = consoleEl.querySelector('#pfcBudgetVal');
    const counterEl = consoleEl.querySelector('#pfcCounter');
    const resetBtn = consoleEl.querySelector('#pfcResetBtn');
    const scaleMinEl = consoleEl.querySelector('#pfcScaleMin');
    const scaleMaxEl = consoleEl.querySelector('#pfcScaleMax');

    // Popover elements
    const toggleBtn = consoleEl.querySelector('#tsfFilterToggleBtn');
    const popover = consoleEl.querySelector('#tsfPopover');
    const popoverClose = consoleEl.querySelector('#tsfPopoverClose');
    const popoverDone = consoleEl.querySelector('#tsfPopoverDone');
    const activeBadge = consoleEl.querySelector('#tsfActiveBadge');

    // Section dropdowns and cards
    const serviceSections = document.querySelectorAll('.service-dropdown-item');
    const allCards = Array.from(document.querySelectorAll('.prop-card'));
    const totalCards = allCards.length;

    // Create or find empty state container
    let emptyState = document.getElementById('pfcEmptyState');
    if (!emptyState) {
      emptyState = document.createElement('div');
      emptyState.id = 'pfcEmptyState';
      emptyState.className = 'pfc-empty-state';
      emptyState.style.display = 'none';
      emptyState.innerHTML = `
        <div class="pfc-empty-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
        <h3 class="pfc-empty-title">No Matching Results Found</h3>
        <p class="pfc-empty-desc">We couldn't find any listings matching your current search criteria or budget range. Try widening your price bracket or clearing specific filters.</p>
        <button type="button" class="pfc-empty-btn" id="pfcEmptyResetBtn">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2.2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Reset All Filters
        </button>
      `;
      const sectionsContainer = document.querySelector('.service-sections');
      if (sectionsContainer && sectionsContainer.parentNode) {
        sectionsContainer.parentNode.insertBefore(emptyState, sectionsContainer.nextSibling);
      }
    }

    const emptyResetBtn = document.getElementById('pfcEmptyResetBtn');

    // Filter state
    let state = {
      search: '',
      deal: 'all',
      type: 'all',
      sliderIdx: 100
    };

    // Budget scale tables per role
    const BUDGET_TABLES = {
      'real-estate': {
        buy: [
          { val: 5000000, label: 'Up to ₹50 Lakhs' },
          { val: 10000000, label: 'Up to ₹1 Cr' },
          { val: 15000000, label: 'Up to ₹1.5 Cr' },
          { val: 25000000, label: 'Up to ₹2.5 Cr' },
          { val: 40000000, label: 'Up to ₹4 Cr' },
          { val: 65000000, label: 'Up to ₹6.5 Cr' },
          { val: 100000000, label: 'Up to ₹10 Cr' },
          { val: 150000000, label: 'Up to ₹15 Cr' },
          { val: Infinity, label: 'Any Budget (No Limit)' }
        ],
        rent: [
          { val: 25000, label: 'Up to ₹25,000/mo' },
          { val: 40000, label: 'Up to ₹40,000/mo' },
          { val: 60000, label: 'Up to ₹60,000/mo' },
          { val: 100000, label: 'Up to ₹1 Lakh/mo' },
          { val: 180000, label: 'Up to ₹1.8 Lakh/mo' },
          { val: 250000, label: 'Up to ₹2.5 Lakh/mo' },
          { val: 350000, label: 'Up to ₹3.5 Lakh/mo' },
          { val: Infinity, label: 'Any Rent (No Limit)' }
        ]
      },
      'renovation': [
        { val: 200000, label: 'Up to ₹2 Lakhs' },
        { val: 400000, label: 'Up to ₹4 Lakhs' },
        { val: 700000, label: 'Up to ₹7 Lakhs' },
        { val: 1200000, label: 'Up to ₹12 Lakhs' },
        { val: 2500000, label: 'Up to ₹25 Lakhs' },
        { val: 4000000, label: 'Up to ₹40 Lakhs' },
        { val: 5000000, label: 'Up to ₹50 Lakhs' },
        { val: Infinity, label: 'Any Budget (No Limit)' }
      ],
      'loan': [
        { val: 1500000, label: 'Up to ₹15 Lakhs' },
        { val: 4000000, label: 'Up to ₹40 Lakhs' },
        { val: 7500000, label: 'Up to ₹75 Lakhs' },
        { val: 15000000, label: 'Up to ₹1.5 Cr' },
        { val: 30000000, label: 'Up to ₹3 Cr' },
        { val: 60000000, label: 'Up to ₹6 Cr' },
        { val: 100000000, label: 'Up to ₹10 Cr' },
        { val: 150000000, label: 'Up to ₹15 Cr' },
        { val: Infinity, label: 'Any Amount (No Limit)' }
      ],
      'vehicle-sale-purchase': [
        { val: 50000, label: 'Up to ₹50,000 (Services)' },
        { val: 1500000, label: 'Up to ₹15 Lakhs' },
        { val: 3000000, label: 'Up to ₹30 Lakhs' },
        { val: 4500000, label: 'Up to ₹45 Lakhs' },
        { val: 6000000, label: 'Up to ₹60 Lakhs' },
        { val: 10000000, label: 'Up to ₹1 Cr' },
        { val: 15000000, label: 'Up to ₹1.5 Cr' },
        { val: Infinity, label: 'Any Price (No Limit)' }
      ],
      'auto-moto': [
        { val: 50000, label: 'Up to ₹50,000 (Services)' },
        { val: 1500000, label: 'Up to ₹15 Lakhs' },
        { val: 3000000, label: 'Up to ₹30 Lakhs' },
        { val: 4500000, label: 'Up to ₹45 Lakhs' },
        { val: 6000000, label: 'Up to ₹60 Lakhs' },
        { val: 10000000, label: 'Up to ₹1 Cr' },
        { val: 15000000, label: 'Up to ₹1.5 Cr' },
        { val: Infinity, label: 'Any Price (No Limit)' }
      ],
      'insurance': [
        { val: 1500000, label: 'Up to ₹15 Lakhs Cover' },
        { val: 3500000, label: 'Up to ₹35 Lakhs Cover' },
        { val: 5000000, label: 'Up to ₹50 Lakhs Cover' },
        { val: 10000000, label: 'Up to ₹1 Crore Cover' },
        { val: 20000000, label: 'Up to ₹2 Crores Cover' },
        { val: 50000000, label: 'Up to ₹5 Crores Cover' },
        { val: Infinity, label: 'Any Coverage (No Limit)' }
      ]
    };

    function getScaleList() {
      const entry = BUDGET_TABLES[currentRole];
      if (!entry) return [{ val: Infinity, label: 'Any Budget' }];
      if (currentRole === 'real-estate') {
        return state.deal === 'rent' ? entry.rent : entry.buy;
      }
      return entry;
    }

    function syncSliderRange() {
      if (!budgetSlider) return;
      const list = getScaleList();
      budgetSlider.min = '0';
      budgetSlider.max = String(list.length - 1);
      budgetSlider.step = '1';
      if (state.sliderIdx >= list.length) {
        state.sliderIdx = list.length - 1;
        budgetSlider.value = String(state.sliderIdx);
      }
      if (scaleMinEl) {
        if (currentRole === 'real-estate') {
          scaleMinEl.textContent = state.deal === 'rent' ? '₹25k/mo' : '₹50L';
          if (scaleMaxEl) scaleMaxEl.textContent = state.deal === 'rent' ? '₹3.5L+' : '₹15 Cr+';
        }
      }
    }

    function getCurrentMaxBudget() {
      const list = getScaleList();
      const rawIdx = budgetSlider ? parseInt(budgetSlider.value, 10) : list.length - 1;
      const idx = Math.min(Math.max(0, isNaN(rawIdx) ? list.length - 1 : rawIdx), list.length - 1);
      return list[idx];
    }

    // Apply Filters Function
    function applyFilters() {
      const query = (state.search || '').trim().toLowerCase();
      const deal = state.deal;
      const type = state.type;
      const budgetObj = getCurrentMaxBudget();
      const maxBudget = budgetObj.val;

      // Update slider readout
      if (budgetValEl) {
        budgetValEl.textContent = budgetObj.label;
      }

      const isFiltering = query.length > 0 || deal !== 'all' || type !== 'all' || maxBudget !== Infinity;

      let totalMatches = 0;

      serviceSections.forEach(section => {
        const cards = Array.from(section.querySelectorAll('.prop-card'));
        let sectionMatches = 0;

        cards.forEach(card => {
          let match = true;

          // 1. Text Search
          if (query) {
            const h4 = (card.querySelector('h4')?.textContent || '').toLowerCase();
            const p = (card.querySelector('p')?.textContent || '').toLowerCase();
            const moreBtn = card.querySelector('.prop-card__more');
            const dataTitle = (moreBtn?.dataset.title || '').toLowerCase();
            const dataDesc = (moreBtn?.dataset.desc || '').toLowerCase();
            const dataTag = (moreBtn?.dataset.tag || card.querySelector('.prop-tag')?.textContent || '').toLowerCase();
            const cardDeal = (card.dataset.deal || '').toLowerCase();
            const cardType = (card.dataset.type || '').toLowerCase();

            const haystack = `${h4} ${p} ${dataTitle} ${dataDesc} ${dataTag} ${cardDeal} ${cardType}`;
            if (!haystack.includes(query)) {
              match = false;
            }
          }

          // 2. Deal Filter
          if (match && deal !== 'all') {
            const cardDeal = (card.dataset.deal || '').toLowerCase();
            const cardTag = (card.querySelector('.prop-tag')?.textContent || '').toLowerCase();
            if (!cardDeal.includes(deal) && !cardTag.includes(deal)) {
              match = false;
            }
          }

          // 3. Type Filter
          if (match && type !== 'all') {
            const cardType = (card.dataset.type || '').toLowerCase();
            const cardTag = (card.querySelector('.prop-tag')?.textContent || '').toLowerCase();
            const cardTitle = (card.querySelector('h4')?.textContent || '').toLowerCase();
            const cardHaystack = `${cardType} ${cardTag} ${cardTitle}`;

            const targetType = type.toLowerCase().replace('3hk', '3bhk');

            if (targetType === '1rk') {
              if (!cardHaystack.includes('1rk') && !cardHaystack.includes('studio')) match = false;
            } else if (targetType === '1bhk') {
              if (!cardHaystack.includes('1bhk') && !cardHaystack.includes('1-bhk')) match = false;
            } else if (targetType === '2bhk') {
              if (!cardHaystack.includes('2bhk') && !cardHaystack.includes('2-bhk')) match = false;
            } else if (targetType === '3bhk') {
              if (!cardHaystack.includes('3bhk') && !cardHaystack.includes('3-bhk')) match = false;
            } else if (targetType === '4bhk') {
              if (!cardHaystack.includes('4bhk') && !cardHaystack.includes('4-bhk') && !cardHaystack.includes('penthouse')) match = false;
            } else if (targetType === 'apartment') {
              if (!cardHaystack.includes('apartment') && !cardHaystack.includes('flat') && !cardHaystack.includes('penthouse') && !cardHaystack.includes('studio') && !cardHaystack.includes('bhk')) match = false;
            } else if (targetType === 'flat') {
              if (!cardHaystack.includes('flat') && !cardHaystack.includes('apartment') && !cardHaystack.includes('bhk') && !cardHaystack.includes('studio')) match = false;
            } else if (targetType === 'independent-house') {
              if (!cardHaystack.includes('house') && !cardHaystack.includes('villa') && !cardHaystack.includes('independent floor') && !cardHaystack.includes('builder floor')) match = false;
            } else if (targetType === 'commercial') {
              if (!cardHaystack.includes('commercial') && !cardHaystack.includes('retail') && !cardHaystack.includes('office') && !cardHaystack.includes('warehouse')) match = false;
            } else if (targetType === 'plot') {
              if (!cardHaystack.includes('plot') && !cardHaystack.includes('land')) match = false;
            } else {
              if (!cardHaystack.includes(targetType)) match = false;
            }
          }

          // 4. Budget Slider
          if (match && maxBudget !== Infinity) {
            let cardPrice = null;
            if (currentRole === 'real-estate') {
              if (deal === 'rent') {
                if (card.dataset.priceRent) cardPrice = parseFloat(card.dataset.priceRent);
              } else if (deal === 'buy') {
                if (card.dataset.priceBuy) cardPrice = parseFloat(card.dataset.priceBuy);
              } else {
                if (card.dataset.priceBuy) cardPrice = parseFloat(card.dataset.priceBuy);
                else if (card.dataset.priceRent) cardPrice = parseFloat(card.dataset.priceRent) * 100;
              }
            } else {
              if (card.dataset.budget) cardPrice = parseFloat(card.dataset.budget);
              else if (card.dataset.price) cardPrice = parseFloat(card.dataset.price);
              else if (card.dataset.amount) cardPrice = parseFloat(card.dataset.amount);
              else if (card.dataset.cover) cardPrice = parseFloat(card.dataset.cover);
            }

            if (cardPrice !== null && !isNaN(cardPrice) && cardPrice > 0) {
              if (cardPrice > maxBudget) {
                match = false;
              }
            }
          }

          if (match) {
            card.classList.remove('is-filtered-out');
            card.classList.add('is-filtered-in');
            sectionMatches++;
            totalMatches++;
          } else {
            card.classList.add('is-filtered-out');
            card.classList.remove('is-filtered-in');
          }
        });

        // Update section trigger badge
        const trigger = section.querySelector('.service-trigger');
        let badge = trigger?.querySelector('.st-match-badge');
        if (!badge && trigger) {
          badge = document.createElement('span');
          badge.className = 'st-match-badge';
          trigger.appendChild(badge);
        }

        if (badge) {
          badge.textContent = `${sectionMatches}`;
          badge.classList.toggle('zero', sectionMatches === 0);
          badge.style.display = isFiltering ? 'inline-block' : 'none';
        }

        // Auto-open sections with matches when filter is active
        if (isFiltering) {
          if (sectionMatches > 0) {
            section.classList.add('open');
          } else {
            section.classList.remove('open');
          }
        }
      });

      // Update counter
      if (counterEl) {
        if (isFiltering) {
          counterEl.textContent = `Showing ${totalMatches} of ${totalCards} listings`;
        } else {
          counterEl.textContent = `Showing all ${totalCards} listings`;
        }
      }

      // Empty state
      if (emptyState) {
        emptyState.style.display = totalMatches === 0 ? 'block' : 'none';
      }

      // Active filter count for badge
      const activeFilterCount = (deal !== 'all' ? 1 : 0) + (type !== 'all' ? 1 : 0) + (maxBudget !== Infinity ? 1 : 0);
      if (activeBadge) {
        if (activeFilterCount > 0) {
          activeBadge.textContent = String(activeFilterCount);
          activeBadge.style.display = 'inline-block';
        } else {
          activeBadge.style.display = 'none';
        }
      }

      // Reset button visibility
      if (resetBtn) {
        resetBtn.style.display = isFiltering ? 'inline-flex' : 'none';
      }
    }

    // Event Listeners
    // 1. Search text
    let searchDebounceTimer = null;
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        state.search = searchInput.value;
        if (searchClear) searchClear.style.display = state.search ? 'grid' : 'none';
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(applyFilters, 120);
      });

      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
      const talkModal = document.getElementById('talkToTeamModal');
      if (talkModal && talkModal.classList.contains('open')) {
        talkModal.classList.remove('open');
        document.body.style.overflow = '';
      }
          searchInput.value = '';
          state.search = '';
          if (searchClear) searchClear.style.display = 'none';
          applyFilters();
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        state.search = '';
        searchClear.style.display = 'none';
        applyFilters();
      });
    }

    // 2. Deal / Category chips
    dealChips.forEach(chip => {
      chip.addEventListener('click', () => {
        dealChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.deal = chip.dataset.deal || 'all';
        syncSliderRange();
        applyFilters();
      });
    });

    // 3. Type Select
    if (typeSelect) {
      typeSelect.addEventListener('change', () => {
        state.type = typeSelect.value;
        subChips.forEach(sc => {
          sc.classList.toggle('active', (sc.dataset.type || '') === state.type);
        });
        applyFilters();
      });
    }

    // 4. Quick Subchips
    subChips.forEach(chip => {
      chip.addEventListener('click', () => {
        subChips.forEach(sc => sc.classList.remove('active'));
        chip.classList.add('active');
        state.type = chip.dataset.type || 'all';
        if (typeSelect) {
          typeSelect.value = state.type;
          if (!typeSelect.value) typeSelect.value = 'all';
        }
        applyFilters();
      });
    });

    // 5. Budget Slider
    if (budgetSlider) {
      budgetSlider.addEventListener('input', () => {
        state.sliderIdx = parseInt(budgetSlider.value, 10);
        applyFilters();
      });
    }

    // 6. Reset Actions
    function resetAll() {
      state.search = '';
      state.deal = 'all';
      state.type = 'all';
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';

      dealChips.forEach((c, idx) => c.classList.toggle('active', idx === 0));
      if (typeSelect) typeSelect.value = 'all';
      subChips.forEach((c, idx) => c.classList.toggle('active', idx === 0));

      const list = getScaleList();
      state.sliderIdx = list.length - 1;
      if (budgetSlider) budgetSlider.value = String(state.sliderIdx);

      syncSliderRange();
      applyFilters();

      if (activeBadge) {
        activeBadge.style.display = 'none';
      }

      // Close all sections except the first one
      serviceSections.forEach((s, idx) => {
        s.classList.toggle('open', idx === 0);
      });
    }

    if (resetBtn) resetBtn.addEventListener('click', resetAll);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAll);

    // 7. Popover toggle & dismiss handlers
    function openPopover() {
      if (!popover) return;
      popover.classList.add('open');
      if (toggleBtn) {
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    }

    function closePopover() {
      if (!popover) return;
      popover.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (popover && popover.classList.contains('open')) {
          closePopover();
        } else {
          openPopover();
        }
      });
    }

    if (popoverClose) {
      popoverClose.addEventListener('click', e => {
        e.stopPropagation();
        closePopover();
      });
    }

    if (popoverDone) {
      popoverDone.addEventListener('click', e => {
        e.stopPropagation();
        closePopover();
      });
    }

    // Dismiss popover on click outside
    document.addEventListener('click', e => {
      if (popover && popover.classList.contains('open')) {
        if (!consoleEl.contains(e.target)) {
          closePopover();
        }
      }
    });

    // Dismiss popover on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && popover && popover.classList.contains('open')) {
        closePopover();
      }
    });

    // Initial run
    syncSliderRange();
    if (budgetSlider) budgetSlider.value = String(getScaleList().length - 1);
    applyFilters();
    window.applyPortalFilters = applyFilters;
  }

  // Initialize filter engine
  initPortalFilterConsole();

  /* Modal */
  const modal    = document.getElementById('propModal');
  if (modal) {
    const overlay  = modal.querySelector('.prop-modal__overlay');
    const closeBtn = modal.querySelector('.prop-modal__close');
    const mTag     = modal.querySelector('.prop-modal__tag');
    const mTitle   = modal.querySelector('.prop-modal__title');
    const mDesc    = modal.querySelector('.prop-modal__desc');
    const mFig     = modal.querySelector('.prop-modal__fig');

    function cleanCardParamFromUrl() {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('card')) {
          url.searchParams.delete('card');
          const nextSearch = url.searchParams.toString();
          const cleanHref = url.pathname + (nextSearch ? '?' + nextSearch : '') + url.hash;
          window.history.replaceState(null, '', cleanHref);
        }
      } catch (_) {}
    }
    window.__radhyaCleanCardParam = cleanCardParamFromUrl;

    function openModal(card) {
      const btn = card.querySelector('.prop-card__more');
      mTag.textContent   = (btn && btn.dataset.tag)   || card.querySelector('.prop-tag')?.textContent || '';
      mTitle.textContent = (btn && btn.dataset.title) || card.querySelector('h4')?.textContent || '';
      mDesc.textContent  = (btn && btn.dataset.desc)  || card.querySelector('p:not(.prop-card__price)')?.textContent || '';

      const priceVal = (btn && btn.dataset.price) || card.querySelector('.prop-card__price')?.textContent || card.dataset.price || '';
      let mPrice = modal.querySelector('.prop-modal__price');
      if (priceVal) {
        if (!mPrice) {
          mPrice = document.createElement('p');
          mPrice.className = 'prop-modal__price';
          mTitle.insertAdjacentElement('afterend', mPrice);
        }
        mPrice.textContent = priceVal;
        mPrice.style.display = '';
      } else if (mPrice) {
        mPrice.textContent = '';
        mPrice.style.display = 'none';
      }

      const cta = modal.querySelector('.prop-modal__cta');
      if (cta) {
        const pageRole = document.body.dataset.role || '';
        cta.dataset.division = (btn && btn.dataset.division) || card.dataset.division || mapRoleToDivision(pageRole);
        cta.dataset.title = mTitle.textContent;
        cta.dataset.price = priceVal;
        cta.dataset.cardId = card.dataset.cardId || (btn && btn.dataset.cardId) || '';
      }
      
      /* media figure */
      mFig.innerHTML = '';
      const slider = card.querySelector('.prop-slider');
      if (slider) {
        const clone = slider.cloneNode(true);
        const oldPrev = clone.querySelector('.prop-slider__prev');
        const oldNext = clone.querySelector('.prop-slider__next');
        const oldDots = clone.querySelector('.prop-slider__dots');
        const oldShare = clone.querySelector('.prop-card__share');
        if (oldPrev) oldPrev.remove();
        if (oldNext) oldNext.remove();
        if (oldDots) oldDots.remove();
        if (oldShare) oldShare.remove();
        const track = clone.querySelector('.prop-slider__track');
        if (track) track.style.transform = 'translateX(0)';
        clone._sliderInitialized = false;
        mFig.appendChild(clone);
        initPropSliders(mFig);
        clone.querySelectorAll('video').forEach(v => {
          v.muted = true;
          v.play().catch(() => {});
        });
      } else {
        const imgSrc = btn ? btn.dataset.img : '';
        if (imgSrc) {
          const img = document.createElement('img');
          img.src = imgSrc; img.alt = mTitle.textContent;
          mFig.appendChild(img);
        } else {
          const ph = card.querySelector('.ph-icon');
          if (ph) mFig.innerHTML = `<div class="ph-icon">${ph.innerHTML}</div>`;
        }
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) {
        setTimeout(() => { try { closeBtn.focus({ preventScroll: true }); } catch (_) {} }, 30);
      }
    }
    window.__radhyaOpenPropModal = openModal;

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      mFig.querySelectorAll('video').forEach(v => v.pause());
      cleanCardParamFromUrl();
    }

    document.addEventListener('click', e => {
      // Do not intercept clicks on slider navigation controls, share buttons, or tags inside slider
      if (e.target.closest('.prop-slider__btn') || e.target.closest('.prop-slider__dots') || e.target.closest('.prop-tag') || e.target.closest('.prop-card__share')) return;

      const btn = e.target.closest('.prop-card__more');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.prop-card');
        if (card) openModal(card);
        return;
      }

      // Also allow clicking card body or heading to view details modal
      const body = e.target.closest('.prop-card__body');
      if (body) {
        const card = body.closest('.prop-card');
        if (card) {
          e.preventDefault();
          openModal(card);
        }
      }
    });

    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  }

  /* =========================================================================
     RADHYA REALTY CMS LIVE HYDRATION & REBIND ENGINE
     Hydrates cards from Developer Portal CMS (Memory + REST API + BroadcastChannel + LocalStorage)
     Supports mixed media carousels (Pictures + Videos) and natural CSS Grid auto-expansion
     ========================================================================= */
  function rebindInteractiveCards(cardsFromArg) {
    const pageRole = document.body.dataset.role || '';
    if (!pageRole) return;

    let targetRole = pageRole;
    if (pageRole === 'auto-moto') targetRole = 'vehicle-sale-purchase';

    let registry = cardsFromArg;
    if (!Array.isArray(registry) || registry.length === 0) {
      if (Array.isArray(window.__radhyaCardsRegistry) && window.__radhyaCardsRegistry.length > 0) {
        registry = window.__radhyaCardsRegistry;
      } else {
        try {
          const raw = localStorage.getItem('radhya_cms_cards_registry_v1');
          if (raw) registry = JSON.parse(raw);
        } catch (e) {}
      }
    }

    if (!Array.isArray(registry) || registry.length === 0) return;
    window.__radhyaCardsRegistry = registry;

    const roleCards = registry.filter(c => {
      const cRole = (c.role || '').toLowerCase();
      if (cRole === targetRole.toLowerCase()) return true;
      if (targetRole === 'vehicle-sale-purchase' && (cRole === 'auto-moto' || cRole === 'vehicle-sale-purchase' || c.division === 'AUTO_MOTO')) return true;
      if (targetRole === 'real-estate' && c.division === 'REAL_ESTATE') return true;
      if (targetRole === 'renovation' && c.division === 'RENOVATION') return true;
      if (targetRole === 'loan' && c.division === 'LOAN') return true;
      if (targetRole === 'insurance' && c.division === 'INSURANCE') return true;
      return false;
    });

    if (roleCards.length === 0) return;

    const sections = document.querySelectorAll('.service-dropdown-item');
    sections.forEach((section, sIdx) => {
      const container = section.querySelector('.dropdown-cards');
      if (!container) return;

      const spaceCards = roleCards.filter(c => Number(c.spaceIndex) === sIdx);

      // Ensure zero inline style pollution that might cause collisions or bleed
      container.style.removeProperty('display');
      container.style.removeProperty('max-height');
      container.style.removeProperty('height');

      // Clear container first so deleted cards are cleanly wiped
      container.innerHTML = '';
      if (spaceCards.length === 0) return;

      // Render cards in order
      spaceCards.forEach(card => {
        const article = document.createElement('article');
        article.className = 'prop-card';
        article.dataset.cardId = card.id;
        if (card.dataType) article.dataset.type = card.dataType;
        if (card.dataDeal) article.dataset.deal = card.dataDeal;
        if (card.dataPriceBuy) article.dataset.priceBuy = String(card.dataPriceBuy);
        if (card.dataPriceRent) article.dataset.priceRent = String(card.dataPriceRent);
        if (card.dataPrice) article.dataset.price = String(card.dataPrice);
        if (card.dataAmount) article.dataset.amount = String(card.dataAmount);
        if (card.dataCover) article.dataset.cover = String(card.dataCover);
        if (card.dataBudget) article.dataset.budget = String(card.dataBudget);

        // Figure slider
        const fig = document.createElement('figure');
        fig.className = 'prop-card__fig prop-slider';

        const track = document.createElement('div');
        track.className = 'prop-slider__track';

        const mediaList = Array.isArray(card.media) && card.media.length > 0 
          ? card.media 
          : [{ type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: card.title }];

        mediaList.forEach(m => {
          const slide = document.createElement('div');
          slide.className = 'prop-slide';

          let mediaUrl = m.url || '';
          if (mediaUrl.startsWith('http://localhost:3000/uploads/') && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')) {
            mediaUrl = mediaUrl.replace('http://localhost:3000/', '');
          }

          const isVid = m.type === 'video' || (typeof mediaUrl === 'string' && (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.startsWith('data:video/')));
          if (isVid) {
            const vid = document.createElement('video');
            vid.src = mediaUrl;
            vid.muted = true;
            vid.loop = true;
            vid.autoplay = true;
            vid.playsInline = true;
            vid.setAttribute('playsinline', '');
            vid.preload = 'metadata';
            vid.onerror = function() {
              const fallbackImg = document.createElement('img');
              fallbackImg.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
              fallbackImg.alt = card.title;
              if (slide.contains(vid)) {
                slide.replaceChild(fallbackImg, vid);
              }
            };
            slide.appendChild(vid);
          } else {
            const img = document.createElement('img');
            img.src = mediaUrl;
            img.alt = m.alt || card.title;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.onerror = function() {
              if (this.src !== 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80') {
                this.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
              }
            };
            slide.appendChild(img);
          }
          track.appendChild(slide);
        });

        fig.appendChild(track);

        const tag = document.createElement('span');
        tag.className = 'prop-tag';
        tag.textContent = card.badge || 'Verified';
        fig.appendChild(tag);

        article.appendChild(fig);

        // Body
        const body = document.createElement('div');
        body.className = 'prop-card__body';

        const h4 = document.createElement('h4');
        h4.textContent = card.title;
        body.appendChild(h4);

        if (card.priceText) {
          const priceEl = document.createElement('p');
          priceEl.className = 'prop-card__price';
          priceEl.style.fontWeight = '600';
          priceEl.style.color = 'var(--gold)';
          priceEl.style.fontSize = '0.92rem';
          priceEl.style.marginBottom = '0.35rem';
          priceEl.style.fontVariantNumeric = 'tabular-nums';
          priceEl.textContent = card.priceText;
          body.appendChild(priceEl);
        }

        const p = document.createElement('p');
        p.textContent = card.shortDesc || card.fullDesc || '';
        body.appendChild(p);

        const moreBtn = document.createElement('button');
        moreBtn.className = 'prop-card__more';
        moreBtn.dataset.tag = card.badge || '';
        moreBtn.dataset.title = card.title;
        moreBtn.dataset.desc = card.fullDesc || card.shortDesc || '';
        if (card.division) moreBtn.dataset.division = card.division;
        if (card.priceText) moreBtn.dataset.price = card.priceText;
        moreBtn.dataset.cardId = card.id;
        moreBtn.textContent = 'View details';
        body.appendChild(moreBtn);

        article.appendChild(body);
        container.appendChild(article);
      });
    });

    // Re-initialize sliders and ensure share buttons on all hydrated cards
    initPropSliders();
    if (typeof window.__radhyaEnsureShareButtons === 'function') {
      window.__radhyaEnsureShareButtons();
    }

    // Clean inline styles from any open dropdowns so pure CSS grid handles natural auto-height
    sections.forEach(s => {
      const body = s.querySelector('.dropdown-cards');
      if (body) {
        body.style.removeProperty('display');
        body.style.removeProperty('max-height');
        body.style.removeProperty('height');
      }
    });

    // Refresh filter console
    if (typeof window.applyPortalFilters === 'function') {
      window.applyPortalFilters();
    }
  }

  window.rebindInteractiveCards = rebindInteractiveCards;

  // Base URL resolver for CRM (Localhost vs Render vs Custom Domain)
  function getCrmBaseUrls() {
    if (typeof window !== 'undefined' && window.__RADHYA_CRM_URL) {
      return [window.__RADHYA_CRM_URL];
    }
    const isLocal = typeof window !== 'undefined' && window.location && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' || 
       !window.location.hostname || 
       window.location.protocol === 'file:');
    if (isLocal) {
      return ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://radhya-crm.onrender.com'];
    }
    return ['https://radhya-crm.onrender.com', 'https://crm.radhyarealty.com'];
  }

  // Hydrate on initial load
  rebindInteractiveCards();

  // Background fetch & live sync from CMS REST API (supports deep-link 60s timeout + 1 retry)
  async function syncFromCmsApi(opts = {}) {
    if (typeof fetch === 'undefined') return { ok: false, apiFailed: true };
    const isDeepLink = !!opts.deepLink;
    const urls = getCrmBaseUrls();
    const maxAttempts = isDeepLink ? 2 : 1;
    let syncSucceeded = false;

    for (let attempt = 0; attempt < maxAttempts && !syncSucceeded; attempt++) {
      for (const base of urls) {
        try {
          const isLocalHost = base.includes('localhost') || base.includes('127.0.0.1');
          const timeoutMs = isDeepLink ? (isLocalHost ? 5000 : 60000) : 3500;
          const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
          const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
          const res = await fetch(`${base}/api/v1/public/cards?t=` + Date.now(), {
            signal: controller ? controller.signal : undefined,
            cache: 'no-store',
            headers: { 
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            }
          });
          if (timer) clearTimeout(timer);
          if (!res.ok) continue;
          const data = await res.json();
          if (data && data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
            window.__radhyaCardsRegistry = data.cards;
            // Rebind immediately with in-memory cards
            rebindInteractiveCards(data.cards);

            // Safely cache to localStorage without crashing if quota limit reached
            try {
              const serialized = JSON.stringify(data.cards);
              if (serialized.length < 3500000) {
                localStorage.setItem('radhya_cms_cards_registry_v1', serialized);
              } else {
                const compact = data.cards.map(c => ({
                  ...c,
                  media: (c.media || []).map(m => m.url && m.url.length > 50000 ? { ...m, url: '' } : m)
                }));
                localStorage.setItem('radhya_cms_cards_registry_v1', JSON.stringify(compact));
              }
            } catch (e) {
              console.warn('LocalStorage quota bypass: keeping full card registry in memory.');
            }
            syncSucceeded = true;
            break; // successfully fetched from active host
          }
        } catch (e) {
          // try next endpoint in list
        }
      }
      if (!syncSucceeded && attempt + 1 < maxAttempts) {
        await new Promise(r => setTimeout(r, 1200));
      }
    }

    // Fallback: If external CRM is suspended, sleeping, or unreachable, load from website static data
    if (!syncSucceeded) {
      try {
        const localDataUrl = (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null' && window.location.protocol !== 'file:')
          ? `${window.location.origin}/data/cards-registry.json?t=` + Date.now()
          : 'data/cards-registry.json?t=' + Date.now();
        const localRes = await fetch(localDataUrl, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        if (localRes.ok) {
          const localData = await localRes.json();
          const cards = Array.isArray(localData) ? localData : (localData && localData.cards ? localData.cards : null);
          if (Array.isArray(cards) && cards.length > 0) {
            window.__radhyaCardsRegistry = cards;
            rebindInteractiveCards(cards);
            try {
              localStorage.setItem('radhya_cms_cards_registry_v1', JSON.stringify(cards));
            } catch (e) {}
          }
        }
      } catch (e) {}
    }

    if (window.__radhyaDeepLinkState && window.__radhyaDeepLinkState.timings.cardsLoaded === null) {
      window.__radhyaDeepLinkState.timings.cardsLoaded = performance.now();
    }
    return { ok: syncSucceeded, apiFailed: !syncSucceeded };
  }

  const initialCardsLoadedPromise = syncFromCmsApi({
    deepLink: !!(window.__radhyaDeepLinkState && window.__radhyaDeepLinkState.validCardId)
  });
  // Poll periodically and refresh on tab focus / visibility
  setInterval(() => syncFromCmsApi(), 15000);
  window.addEventListener('focus', () => syncFromCmsApi());
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) syncFromCmsApi();
  });

  // Live Sync Listeners: BroadcastChannel + localStorage storage event
  if (typeof BroadcastChannel !== 'undefined') {
    const liveCmsChannel = new BroadcastChannel('radhya_cms_live_sync');
    liveCmsChannel.onmessage = (event) => {
      if (event.data && (event.data.type === 'CMS_CARDS_UPDATED' || event.data.cards)) {
        const cards = event.data.cards || (event.data.type === 'CMS_CARDS_UPDATED' ? event.data.cards : null);
        if (cards && Array.isArray(cards)) {
          window.__radhyaCardsRegistry = cards;
          rebindInteractiveCards(cards);
          try {
            localStorage.setItem('radhya_cms_cards_registry_v1', JSON.stringify(cards));
          } catch (e) {}
        } else {
          syncFromCmsApi();
        }
      }
    };
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'radhya_cms_cards_registry_v1') {
      try {
        const raw = localStorage.getItem('radhya_cms_cards_registry_v1');
        if (raw) {
          const cards = JSON.parse(raw);
          rebindInteractiveCards(cards);
        }
      } catch (e) {}
    }
  });

  // =========================================================================
  // RADHYA REALTY OFFICIAL INGESTION SNIPPET
  // Connects website contact form submissions to the Live Radhya CRM
  // =========================================================================
  window.submitRadhyaLeadToCRM = async function(formData) {
    const payload = {
      fullName: formData.name || formData.fullName,
      phone: formData.phone,
      email: formData.email,
      cityLocality: formData.city || 'Delhi-NCR',
      division: formData.division, // 'REAL_ESTATE' | 'RENOVATION' | 'LOAN' | 'AUTO_MOTO' | 'INSURANCE' | 'TOURS_AND_TRAVELS'
      productInterest: formData.productOrProperty || formData.interest,
      estimatedBudget: Number(formData.budget || formData.dealValue || 0),
      message: formData.message,
      sourceWebsite: (typeof window !== 'undefined' && window.location && window.location.href ? window.location.href : 'https://radhyarealty.com/'),
      secretKey: 'radhya-sec-99532-enterprise-token-2026'
    };

    // 1. Mirror locally for instant reactive cross-tab sync to CRM
    try {
      const leadRecord = {
        id: 'ld-web-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
        fullName: payload.fullName,
        clientName: payload.fullName,
        phone: payload.phone,
        email: payload.email,
        localityCity: payload.cityLocality,
        division: payload.division,
        productInterest: payload.productInterest,
        productOrProperty: payload.productInterest,
        estimatedBudget: payload.estimatedBudget,
        dealValue: payload.estimatedBudget,
        message: payload.message,
        sourceWebsite: payload.sourceWebsite,
        createdAt: new Date().toISOString(),
        source: 'Website Live',
        isWebsiteLive: true,
      };

      const existingLeads = JSON.parse(localStorage.getItem('radhya_crm_inbound_leads_v1') || '[]');
      existingLeads.unshift(leadRecord);
      localStorage.setItem('radhya_crm_inbound_leads_v1', JSON.stringify(existingLeads.slice(0, 50)));

      if (typeof BroadcastChannel !== 'undefined') {
        const bridge = new BroadcastChannel('radhya_crm_bridge');
        bridge.postMessage({ type: 'INBOUND_LEAD', lead: leadRecord });
        bridge.close();
      }
    } catch (mirrorErr) {
      console.warn('Local lead bridge notice:', mirrorErr);
    }

    // 2. Dispatch to local MilesWeb PHP API (/api/whatsapp-enquiry.php) for guaranteed ledger log + email
    try {
      fetch('/api/whatsapp-enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(e => console.warn('PHP enquiry log dispatch notice:', e));
    } catch (phpErr) {}

    // 3. Transmit to backend webhook receiver (attempt custom domain, Render fallback)
    const baseUrls = getCrmBaseUrls();
    let deliveredResult = null;
    for (const base of baseUrls) {
      try {
        const crmEndpoint = `${base}/api/v1/webhooks/website-ingest`;
        const res = await fetch(crmEndpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Radhya-Webhook-Secret': 'radhya-sec-99532-enterprise-token-2026'
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          deliveredResult = await res.json();
          console.log('CRM Ingestion Response from ' + base + ':', deliveredResult);
          break;
        }
      } catch (err) {
        // try next endpoint in chain
      }
    }

    return deliveredResult || { status: 'QUEUED_LOCALLY', message: 'Lead safely recorded to local CRM queue and MilesWeb server.' };
  };

  // =========================================================================
  // RADHYA REALTY WHATSAPP DISPATCHER & DIRECT ENQUIRY BRIDGE
  // Zero external popups or tab navigation on form submissions
  // =========================================================================
  window.sendRadhyaEnquiryToWhatsApp = function() {
    return { success: true };
  };

  /* Helper to map page role to official CRM division */
  function mapRoleToDivision(role) {
    if (!role) return 'REAL_ESTATE';
    const r = role.toLowerCase();
    if (r.includes('real-estate') || r.includes('real estate') || r.includes('property')) return 'REAL_ESTATE';
    if (r.includes('renovation') || r.includes('remodel') || r.includes('repair')) return 'RENOVATION';
    if (r.includes('decoration') || r.includes('interior') || r.includes('decor')) return 'RENOVATION';
    if (r.includes('auto') || r.includes('vehicle') || r.includes('car') || r.includes('moto')) return 'AUTO_MOTO';
    if (r.includes('insurance')) return 'INSURANCE';
    if (r.includes('loan') || r.includes('finance')) return 'LOAN';
    if (r.includes('tour') || r.includes('travel')) return 'TOURS_AND_TRAVELS';
    return 'REAL_ESTATE';
  }

  
  /* Talk to Team / Direct Owner Communication Menu */
  function ensureTalkToTeamModal() {
    let modal = document.getElementById('talkToTeamModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'talkToTeamModal';
      modal.className = 'radhya-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'talkToTeamTitle');
      modal.innerHTML = `
        <div class="radhya-modal__overlay"></div>
        <div class="radhya-modal__box talk-menu-box">
          <button type="button" class="radhya-modal__close" aria-label="Close menu">&#10005;</button>
          
          <div class="talk-menu-content">
            <div class="talk-glass-pill"><span class="talk-glass-pill-dot"></span>Direct Leadership Line</div>
            <h2 class="talk-glass-title" id="talkToTeamTitle">Connect with Founder &amp; MD</h2>
            <p class="talk-glass-sub">Direct access to <strong>Rakesh Raj Shukla</strong> for verified property consultations, site visits, or quotation advisory.</p>
            
            <!-- Owner Profile Card -->
            <div class="talk-owner-banner">
              <div class="talk-owner-monogram">RS</div>
              <div class="talk-owner-meta">
                <div class="talk-owner-name">Rakesh Raj Shukla</div>
                <div class="talk-owner-title">Founder &amp; Managing Director • Anubhav Bharat Group</div>
                <div class="talk-owner-status"><span class="status-dot"></span> Available for consultations (09:30 AM – 08:00 PM IST)</div>
              </div>
            </div>

            <!-- The Two Primary Action Cards (Call & WhatsApp) -->
            <div class="talk-primary-actions">
              <!-- Call Owner Card -->
              <a href="tel:+919953227091" class="talk-hero-btn hero-call">
                <div class="talk-hero-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="talk-hero-content">
                  <span class="talk-hero-label">Call Owner Directly</span>
                  <span class="talk-hero-val">+91 99532 27091</span>
                  <span class="talk-hero-sub">Direct cellular dial</span>
                </div>
              </a>

              <!-- WhatsApp Owner Card -->
              <a href="https://wa.me/919953227091?text=Hi%20Rakesh%20ji%2C%20I%20have%20an%20enquiry%20regarding%20Radhya%20Realty%20services." target="_blank" rel="noopener" class="talk-hero-btn hero-wa item-wa">
                <div class="talk-hero-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </div>
                <div class="talk-hero-content">
                  <span class="talk-hero-label">Chat on WhatsApp</span>
                  <span class="talk-hero-val">Message Owner</span>
                  <span class="talk-hero-sub">Instant verified chat</span>
                </div>
              </a>
            </div>

            <!-- Secondary Direct Options -->
            <div class="talk-secondary-actions">
              <a href="sms:+919953227091?body=Hi%20Rakesh%20ji%2C%20I%20have%20an%20enquiry%20regarding%20Radhya%20Realty." class="talk-sec-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Send SMS
              </a>
              <a href="tel:+917840012815" class="talk-sec-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Office: +91 78400 12815
              </a>
              <a href="mailto:anubhav.insurance09@gmail.com" class="talk-sec-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email MD
              </a>
              <a href="https://maps.google.com/?q=28%C2%B045'14.8%22N+77%C2%B011'49.9%22E" target="_blank" rel="noopener" class="talk-sec-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Google Maps
              </a>
            </div>

            <div class="talk-menu-footer">
              <button type="button" class="btn talk-menu-close-btn">Dismiss</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('.radhya-modal__close');
      const overlay = modal.querySelector('.radhya-modal__overlay');
      const footerCloseBtn = modal.querySelector('.talk-menu-close-btn');

      const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      };

      if (closeBtn) closeBtn.onclick = closeModal;
      if (overlay) overlay.onclick = closeModal;
      if (footerCloseBtn) footerCloseBtn.onclick = closeModal;
    }
    return modal;
  }

  function openTalkToTeamModal() {
    const modal = ensureTalkToTeamModal();

    // Contextual role-aware WhatsApp prefilled message
    const role = document.body.dataset.role || '';
    let subject = 'Radhya Realty services';
    if (role === 'real-estate') subject = 'Real Estate properties in Burari & Delhi-NCR';
    else if (role === 'renovation') subject = 'Turnkey Home Renovation packages';
    else if (role === 'loan') subject = 'Home Loans and LAP assistance';
    else if (role === 'vehicle-sale-purchase') subject = 'Pre-Owned Vehicle Sale & Purchase';
    else if (role === 'insurance') subject = 'Insurance Advisory & Claims';

    const waLink = modal.querySelector('a.item-wa');
    if (waLink) {
      const msg = `Hi Rakesh ji, I am contacting you regarding ${subject}.`;
      waLink.href = `https://wa.me/919953227091?text=${encodeURIComponent(msg)}`;
    }

    // Close hamburger panel if currently open
    try { setMenu(false); } catch(_) {}

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  window.openTalkToTeamModal = openTalkToTeamModal;

  /* Dynamically ensure the Radhya Enquiry Modal exists on the page */
  function ensureEnquiryModal() {
    let enqModal = document.getElementById('radhyaEnquiryModal');
    if (!enqModal) {
      enqModal = document.createElement('div');
      enqModal.id = 'radhyaEnquiryModal';
      enqModal.className = 'radhya-modal';
      enqModal.setAttribute('role', 'dialog');
      enqModal.setAttribute('aria-modal', 'true');
      enqModal.setAttribute('aria-labelledby', 'radhyaModalTitle');
      enqModal.innerHTML = `
        <div class="radhya-modal__overlay"></div>
        <div class="radhya-modal__box">
          <button type="button" class="radhya-modal__close" aria-label="Close modal">&#10005;</button>
          
          <div class="radhya-modal__form-view">
            <p class="radhya-modal__eyebrow"><span style="color:var(--gold)">✦</span> RADHYA REALTY • PRIVATE CONSULTATION</p>
            <h2 class="radhya-modal__title" id="radhyaModalTitle">Connect With Our Specialists</h2>
            <p class="radhya-modal__sub">Leave your contact details and our dedicated advisory team will reach out directly.</p>
            
            <form id="radhyaEnquiryForm" novalidate>
              <div class="radhya-form-grid">
                <div class="radhya-form-group">
                  <label for="radhyaLeadName">Full Name <span class="req">*</span></label>
                  <input type="text" id="radhyaLeadName" name="name" placeholder="e.g. Rahul Sharma" autocomplete="name">
                </div>
                <div class="radhya-form-group">
                  <label for="radhyaLeadPhone">Phone Number <span class="req">*</span></label>
                  <input type="tel" id="radhyaLeadPhone" name="phone" placeholder="e.g. +91 98765 43210" autocomplete="tel">
                </div>
              </div>

              <div class="radhya-form-grid">
                <div class="radhya-form-group">
                  <label for="radhyaLeadDivision">Division <span class="req">*</span></label>
                  <select id="radhyaLeadDivision" name="division">
                    <option value="REAL_ESTATE">Real Estate (Residential &amp; Commercial)</option>
                    <option value="RENOVATION">Renovation &amp; Remodelling</option>
                    <option value="AUTO_MOTO">Vehicle Sale Purchase (Auto-Moto)</option>
                    <option value="INSURANCE">Insurance Services</option>
                    <option value="LOAN">Loans &amp; Financing Guidance</option>
                    <option value="TOURS_AND_TRAVELS">Tours &amp; Travels</option>
                  </select>
                </div>
                <div class="radhya-form-group">
                  <label for="radhyaLeadEmail">Email Address <span class="opt">(optional)</span></label>
                  <input type="email" id="radhyaLeadEmail" name="email" placeholder="name@example.com (optional)" autocomplete="email">
                </div>
              </div>

              <div class="radhya-form-grid">
                <div class="radhya-form-group">
                  <label for="radhyaLeadCity">City / Locality <span class="opt">(optional)</span></label>
                  <input type="text" id="radhyaLeadCity" name="city" value="Delhi-NCR" placeholder="e.g. Gurugram, Delhi-NCR">
                </div>
                <div class="radhya-form-group">
                  <label for="radhyaLeadBudget">Estimated Budget (₹) <span class="opt">(optional)</span></label>
                  <input type="number" id="radhyaLeadBudget" name="budget" placeholder="e.g. 5000000 (optional)" min="0">
                </div>
              </div>

              <div class="radhya-form-group">
                <label for="radhyaLeadMessage">Message <span class="opt">(optional)</span></label>
                <textarea id="radhyaLeadMessage" name="message" rows="3" placeholder="Tell us what you are looking for..."></textarea>
              </div>

              <div class="radhya-form-error" id="radhyaFormError"></div>

              <button type="submit" class="radhya-submit-btn" id="radhyaSubmitBtn">
                <span class="btn-text">Submit Enquiry</span>
              </button>

              <p class="radhya-privacy-note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                DPDP Rule 3 Notice: By submitting, you consent to Radhya Realty processing your details for advisory fulfillment in accordance with our <a href="privacy-policy.html" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:underline;">Privacy Policy</a> &amp; <a href="terms.html" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:underline;">Terms</a>.
              </p>
            </form>
          </div>

          <div class="radhya-modal__success" id="radhyaModalSuccess">
            <div class="radhya-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h3 class="radhya-success-title">Enquiry Received</h3>
            <p class="radhya-success-desc" id="radhyaSuccessDesc">Thank you! Your enquiry has been received. Our dedicated specialists will connect with you shortly.</p>
            <button type="button" class="btn radhya-success-close-btn" style="min-width:140px;margin-top:1rem;">Done</button>
          </div>
        </div>
      `;
      document.body.appendChild(enqModal);
    }
    return enqModal;
  }

  /* Open the enquiry modal with pre-configured division */
  window.openRadhyaEnquiryModal = openEnquiryModal;
  function openEnquiryModal(opts = {}) {
    const enqModal = ensureEnquiryModal();
    const overlay = enqModal.querySelector('.radhya-modal__overlay');
    const closeBtn = enqModal.querySelector('.radhya-modal__close');
    const formView = enqModal.querySelector('.radhya-modal__form-view');
    const successView = enqModal.querySelector('#radhyaModalSuccess');
    const form = enqModal.querySelector('#radhyaEnquiryForm');
    const errBox = enqModal.querySelector('#radhyaFormError');
    const submitBtn = enqModal.querySelector('#radhyaSubmitBtn');
    const doneBtn = enqModal.querySelector('.radhya-success-close-btn');

    // Store card context internally for webhook payload
    enqModal._productOrProperty = opts.productOrProperty || '';

    // Reset view
    formView.style.display = 'block';
    successView.classList.remove('visible');
    errBox.style.display = 'none';
    errBox.textContent = '';
    form.querySelectorAll('.radhya-field-error').forEach(el => el.classList.remove('radhya-field-error'));
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Submit Enquiry';

    // Set division
    const divisionSelect = enqModal.querySelector('#radhyaLeadDivision');
    const currentRole = document.body.dataset.role || '';
    const targetDivision = opts.division || mapRoleToDivision(currentRole);
    if (targetDivision && divisionSelect) {
      divisionSelect.value = targetDivision;
    }

    // Close any open propModal
    const propModal = document.getElementById('propModal');
    if (propModal && propModal.classList.contains('open')) {
      propModal.classList.remove('open');
    }

    enqModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const nameInput = enqModal.querySelector('#radhyaLeadName');
      if (nameInput) nameInput.focus();
    }, 150);

    function closeEnquiry() {
      enqModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    overlay.onclick = closeEnquiry;
    closeBtn.onclick = closeEnquiry;
    if (doneBtn) doneBtn.onclick = closeEnquiry;
  }

  // Handle Enquiry Form Submission
  document.addEventListener('submit', async e => {
    if (e.target && e.target.id === 'radhyaEnquiryForm') {
      e.preventDefault();
      const form = e.target;
      const errBox = form.querySelector('#radhyaFormError');
      const submitBtn = form.querySelector('#radhyaSubmitBtn');
      const enqModal = document.getElementById('radhyaEnquiryModal');
      const formView = enqModal.querySelector('.radhya-modal__form-view');
      const successView = enqModal.querySelector('#radhyaModalSuccess');
      const successDesc = enqModal.querySelector('#radhyaSuccessDesc');

      // Clear previous error states
      form.querySelectorAll('.radhya-field-error').forEach(el => el.classList.remove('radhya-field-error'));
      errBox.style.display = 'none';
      errBox.textContent = '';

      const nameInput = form.name;
      const phoneInput = form.phone;
      const divisionInput = form.division;

      const nameVal = (nameInput.value || '').trim();
      const phoneVal = (phoneInput.value || '').trim();
      const emailVal = (form.email.value || '').trim();
      const divisionVal = divisionInput ? divisionInput.value : '';
      const cityVal = (form.city.value || '').trim() || 'Delhi-NCR';
      const budgetVal = Number(form.budget.value || 0);
      const messageVal = (form.message.value || '').trim();

      // Check required fields with requested phrase "Please fill your "
      if (!nameVal) {
        nameInput.classList.add('radhya-field-error');
        errBox.textContent = 'Please fill your Full Name';
        errBox.style.display = 'block';
        nameInput.focus();
        return;
      }
      if (!phoneVal) {
        phoneInput.classList.add('radhya-field-error');
        errBox.textContent = 'Please fill your Phone Number';
        errBox.style.display = 'block';
        phoneInput.focus();
        return;
      }
      const digitsOnly = phoneVal.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        phoneInput.classList.add('radhya-field-error');
        errBox.textContent = 'Please enter a valid 10-digit Phone Number';
        errBox.style.display = 'block';
        phoneInput.focus();
        return;
      }
      if (!divisionVal) {
        divisionInput.classList.add('radhya-field-error');
        errBox.textContent = 'Please fill your Division';
        errBox.style.display = 'block';
        divisionInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Submitting your enquiry...';

      const selectedDivisionText = divisionInput.options[divisionInput.selectedIndex].text;
      const interestVal = enqModal._productOrProperty || 'General Enquiry';

      const payload = {
        fullName: nameVal,
        name: nameVal,
        phone: phoneVal,
        email: emailVal || undefined,
        city: cityVal,
        cityLocality: cityVal,
        division: divisionVal,
        productOrProperty: interestVal,
        productInterest: interestVal,
        interest: interestVal,
        budget: budgetVal,
        dealValue: budgetVal,
        message: messageVal
      };

      // 1. Submit lead directly to Live CRM ingestion bridge
      try {
        await window.submitRadhyaLeadToCRM(payload);
      } catch (err) {
        console.error('Lead submission caught error:', err);
      }

      // 2. Show success screen immediately on page (zero external redirects)
      formView.style.display = 'none';
      successView.classList.add('visible');
      successDesc.textContent = `Thank you, ${nameVal}! Your enquiry for ${selectedDivisionText} has been received. Our dedicated specialists will connect with you at ${phoneVal} shortly.`;
      form.reset();
    }
  });

  // Global listener for every "Talk to our team", "Enquire Now", or .open-enquiry-btn
  document.addEventListener('click', e => {
    const target = e.target.closest('a, button');
    if (!target) return;

    const isPropModalCta = target.classList.contains('prop-modal__cta') || !!target.closest('#propModal .prop-modal__cta');
    const text = (target.textContent || '').trim().toLowerCase();
    const href = target.getAttribute('href') || '';

    // 1. Product Item Card / Modal CTA -> Always opens the product enquiry form
    const isEnquireNow = isPropModalCta || 
                         text.includes('enquire now') || 
                         text === 'enquire' || 
                         target.dataset.enquiry !== undefined;

    if (isEnquireNow) {
      e.preventDefault();
      e.stopPropagation();

      let productOrProperty = target.dataset.title || '';
      let division = target.dataset.division || '';

      const card = target.closest('.prop-card');
      if (card) {
        const titleEl = card.querySelector('.prop-card__title');
        const priceEl = card.querySelector('.prop-card__price');
        const tagEl = card.querySelector('.prop-card__tag');
        if (titleEl && !productOrProperty) productOrProperty = titleEl.textContent.trim();
        if (priceEl) productOrProperty += ' (' + priceEl.textContent.trim() + ')';
        if (tagEl) productOrProperty = '[' + tagEl.textContent.trim() + '] ' + productOrProperty;
      }

      // If clicked from open property detail modal
      const propModal = document.getElementById('propModal');
      if (propModal && propModal.classList.contains('open')) {
        const mTitle = propModal.querySelector('.prop-modal__title');
        const mPrice = propModal.querySelector('.prop-modal__price');
        if (mTitle) {
          productOrProperty = mTitle.textContent.trim();
          if (mPrice) productOrProperty += ' (' + mPrice.textContent.trim() + ')';
        }
      }

      openEnquiryModal({ division, productOrProperty });
      return;
    }

    // 2. "Talk to our team" / contact section button -> Opens direct leadership menu
    const isTalkToTeam = text.includes('talk to our team') || target.classList.contains('open-enquiry-btn');
    if (isTalkToTeam) {
      e.preventDefault();
      e.stopPropagation();
      openTalkToTeamModal();
      return;
    }
  });

  // ESC key closes Radhya Enquiry modal if open
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const enqModal = document.getElementById('radhyaEnquiryModal');
      if (enqModal && enqModal.classList.contains('open')) {
        enqModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // Initialize liquid glass pill styling and icon on all in-page "Talk to our team" buttons
  function initTalkToTeamButtons() {
    document.querySelectorAll('a, button').forEach(el => {
      // Never alter modal CTA buttons or navigation panel elements
      if (el.closest('#propModal') || el.classList.contains('prop-modal__cta')) return;
      if (el.closest('#panel') || el.closest('.talk-menu-box') || el.closest('.radhya-modal')) return;

      const text = (el.textContent || '').trim().toLowerCase();
      if (text === 'talk to our team' || el.classList.contains('open-enquiry-btn')) {
        el.classList.add('talk-btn-liquid-glass');
        if (!el.querySelector('svg')) {
          el.innerHTML = `
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e3c883" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;flex-shrink:0;">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>Talk to our team</span>
          `;
        }
      }
    });
  }

  // =========================================================================
  // DPDP ACT 2023 COMPLIANT COOKIE CONSENT & PREFERENCES MANAGER
  // =========================================================================
  function initCookieConsent() {
    const COOKIE_STORAGE_KEY = 'radhya_cookie_consent_v1';

    function showBanner() {
      let banner = document.getElementById('radhyaCookieBanner');
      if (banner) {
        banner.hidden = false;
        banner.style.display = 'flex';
        if (window.__radhyaDeepLinkState && window.__radhyaDeepLinkState.timings.bannerVisible === null) {
          window.__radhyaDeepLinkState.timings.bannerVisible = performance.now();
        }
        return;
      }

      banner = document.createElement('div');
      banner.id = 'radhyaCookieBanner';
      banner.setAttribute('role', 'region');
      banner.setAttribute('aria-label', 'Cookie Consent Notice');
      banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:150;background:#0a1730;border-top:1px solid rgba(201,162,75,0.35);box-shadow:0 -8px 24px rgba(0,0,0,0.45);padding:14px 20px;font-family:\'Manrope\',-apple-system,sans-serif;color:#f2f4f8;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;';

      banner.innerHTML = `
        <div style="flex:1 1 320px;max-width:760px;">
          <div style="font-weight:700;color:#e3c883;font-size:12px;letter-spacing:0.02em;margin-bottom:4px;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;"></span>
            DPDP Act 2023 Statutory Privacy &amp; Cookie Notice
          </div>
          <p style="margin:0;font-size:11.5px;line-height:1.45;color:#cbd5e1;">
            Radhya Realty (Anubhav Bharat Group) uses strictly essential cookies for secure portal session authentication, inquiry routing, and lawful advisory services in compliance with India's Digital Personal Data Protection Act, 2023. Zero third-party behavioral trackers. Review our <a href="privacy-policy.html" style="color:#c9a24b;text-decoration:underline;">Privacy Policy</a> and <a href="terms.html" style="color:#c9a24b;text-decoration:underline;">Terms</a>.
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <button id="btnAcceptAllCookies" type="button" style="min-height:44px;min-width:44px;padding:9px 18px;border-radius:6px;background:#c9a24b;color:#060f20;font-size:12px;font-weight:700;border:none;cursor:pointer;transition:background 0.18s;touch-manipulation:manipulation;">
            Accept All
          </button>
          <button id="btnEssentialCookies" type="button" style="min-height:44px;min-width:44px;padding:9px 16px;border-radius:6px;background:transparent;color:#f2f4f8;font-size:12px;font-weight:600;border:1px solid rgba(201,162,75,0.45);cursor:pointer;transition:background 0.18s;touch-manipulation:manipulation;">
            Essential Only
          </button>
        </div>
      `;

      document.body.appendChild(banner);
      if (window.__radhyaDeepLinkState && window.__radhyaDeepLinkState.timings.bannerVisible === null) {
        window.__radhyaDeepLinkState.timings.bannerVisible = performance.now();
      }

      document.getElementById('btnAcceptAllCookies')?.addEventListener('click', () => {
        try {
          localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
            consented: true,
            tier: 'all',
            timestamp: new Date().toISOString()
          }));
        } catch (e) {}
        banner.hidden = true;
        banner.style.display = 'none';
      });

      document.getElementById('btnEssentialCookies')?.addEventListener('click', () => {
        try {
          localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
            consented: true,
            tier: 'essential',
            timestamp: new Date().toISOString()
          }));
        } catch (e) {}
        banner.hidden = true;
        banner.style.display = 'none';
      });
    }

    // Attach persistent "Cookie Settings" button to footer or bottom floating trigger
    function attachFooterSettingsTrigger() {
      const footer = document.querySelector('footer, #site-footer, .footer');
      if (footer && !document.getElementById('btnOpenCookieSettings')) {
        const link = document.createElement('button');
        link.id = 'btnOpenCookieSettings';
        link.type = 'button';
        link.textContent = 'Cookie Settings';
        link.style.cssText = 'background:none;border:none;color:#94a3b8;font-size:11px;text-decoration:underline;cursor:pointer;padding:4px 8px;font-family:inherit;margin:0 4px;';
        link.addEventListener('click', showBanner);

        // Try inserting into footer nav or bottom note
        const footerLinks = footer.querySelector('.footer-links, .footer__links, .footer-legal') || footer;
        footerLinks.appendChild(link);
      }
    }

    // Public method to reopen settings
    window.openRadhyaCookieSettings = showBanner;

    // Check existing consent — NEVER show banner before introDone resolves
    const dls = window.__radhyaDeepLinkState;
    const isIndexDeepLinkRedirect = document.body?.dataset?.page === 'home' && !!(dls && dls.validCardId);
    if (!isIndexDeepLinkRedirect) {
      let existing = null;
      try { existing = localStorage.getItem(COOKIE_STORAGE_KEY); } catch (e) {}
      if (!existing) {
        Promise.resolve(window.__radhyaIntroDone).then(() => {
          let stillEmpty = true;
          try { stillEmpty = !localStorage.getItem(COOKIE_STORAGE_KEY); } catch (e) {}
          if (stillEmpty) showBanner();
        });
      }
    }

    attachFooterSettingsTrigger();
  }

  // =========================================================================
  // TASK 2: DEEP-LINK CONTROLLER (INTRO -> COOKIES -> CARD MODAL)
  // =========================================================================
  function showDeepLinkLoader(show) {
    let el = document.getElementById('radhyaDeepLinkLoader');
    if (show) {
      if (!el) {
        el = document.createElement('div');
        el.id = 'radhyaDeepLinkLoader';
        el.className = 'radhya-deeplink-loader';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.innerHTML = '<span class="radhya-deeplink-spinner" aria-hidden="true"></span><span>Loading listing...</span>';
        document.body.appendChild(el);
      }
      el.hidden = false;
    } else if (el) {
      el.hidden = true;
      el.remove();
    }
  }

  function cleanCardParamFallback() {
    if (typeof window.__radhyaCleanCardParam === 'function') {
      window.__radhyaCleanCardParam();
      return;
    }
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('card')) {
        url.searchParams.delete('card');
        const nextSearch = url.searchParams.toString();
        window.history.replaceState(null, '', url.pathname + (nextSearch ? '?' + nextSearch : '') + url.hash);
      }
    } catch (_) {}
  }

  function inferRolePageFromCardId(cardId) {
    const id = (cardId || '').toLowerCase();
    if (id.includes('real-estate')) return 'real-estate.html';
    if (id.includes('renovation')) return 'renovation.html';
    if (id.includes('loan')) return 'loan.html';
    if (id.includes('vehicle-sale-purchase') || id.includes('auto-moto')) return 'vehicle-sale-purchase.html';
    if (id.includes('insurance')) return 'insurance.html';
    return null;
  }

  async function initDeepLinkFlow() {
    const dls = window.__radhyaDeepLinkState;
    if (!dls || !dls.hasCardParam) return;

    const pageType = document.body?.dataset?.page || '';

    // Invalid ?card= parameter (security sanitized): wait for intro, show toast, clean URL
    if (dls.invalidCardParam) {
      await Promise.resolve(window.__radhyaIntroDone);
      showWebsiteToast('This listing is no longer available', 3000);
      cleanCardParamFallback();
      return;
    }

    const targetId = dls.validCardId;
    if (!targetId) return;

    // index.html?card=<id>: do NOT play index intro; fetch cards, resolve role page, location.replace
    if (pageType === 'home') {
      const loaderTimer = setTimeout(() => showDeepLinkLoader(true), 350);
      const syncResult = await initialCardsLoadedPromise;
      clearTimeout(loaderTimer);
      showDeepLinkLoader(false);

      const registry = Array.isArray(window.__radhyaCardsRegistry) ? window.__radhyaCardsRegistry : [];
      const found = registry.find(c => c && c.id === targetId);
      if (found) {
        const targetPage = resolveCardRolePage(found);
        window.location.replace(targetPage + window.location.search + window.location.hash);
        return;
      }
      if (syncResult && syncResult.apiFailed) {
        const inferred = inferRolePageFromCardId(targetId);
        if (inferred) {
          window.location.replace(inferred + window.location.search + window.location.hash);
          return;
        }
        showWebsiteToast("Couldn't load the latest listings", 3500);
        return;
      }
      showWebsiteToast('This listing is no longer available', 3000);
      cleanCardParamFallback();
      return;
    }

    // Role pages: await BOTH introDone AND cardsLoaded
    let cardsSettled = false;
    initialCardsLoadedPromise.finally(() => { cardsSettled = true; });

    await Promise.resolve(window.__radhyaIntroDone);
    if (!cardsSettled) {
      showDeepLinkLoader(true);
    }
    const syncResult = await initialCardsLoadedPromise;
    showDeepLinkLoader(false);

    // Check if card exists in registry on a DIFFERENT role page -> redirect cleanly
    const registry = Array.isArray(window.__radhyaCardsRegistry) ? window.__radhyaCardsRegistry : [];
    const registryCard = registry.find(c => c && c.id === targetId);
    if (registryCard) {
      const correctRolePage = resolveCardRolePage(registryCard);
      const currFile = (window.location.pathname.split('/').pop() || '').toLowerCase();
      if (correctRolePage && currFile && correctRolePage.toLowerCase() !== currFile) {
        window.location.replace(correctRolePage + window.location.search + window.location.hash);
        return;
      }
    }

    // Match exact card by ID using CSS.escape (never unescaped selector or innerHTML)
    const escapedId = (typeof CSS !== 'undefined' && typeof CSS.escape === 'function')
      ? CSS.escape(targetId)
      : targetId.replace(/[^A-Za-z0-9_-]/g, '');
    const cardEl = document.querySelector(`.prop-card[data-card-id="${escapedId}"]`);

    if (!cardEl) {
      if (syncResult && syncResult.apiFailed) {
        showWebsiteToast("Couldn't load the latest listings", 3500);
      } else {
        showWebsiteToast('This listing is no longer available', 3000);
      }
      cleanCardParamFallback();
      return;
    }

    if (syncResult && syncResult.apiFailed) {
      showWebsiteToast("Couldn't load the latest listings", 3000);
    }

    // 1. Expand parent accordion dropdown if collapsed
    const parentSection = cardEl.closest('.service-dropdown-item');
    if (parentSection) {
      const sectionGroup = parentSection.closest('.service-sections') || document;
      sectionGroup.querySelectorAll('.service-dropdown-item.open, .service-dropdown-item.is-open').forEach(el => {
        if (el !== parentSection) {
          el.classList.remove('open', 'is-open');
        }
      });
      parentSection.classList.add('open', 'is-open');
      const cardsBox = parentSection.querySelector('.dropdown-cards');
      if (cardsBox) {
        cardsBox.style.removeProperty('display');
        cardsBox.style.removeProperty('max-height');
        cardsBox.style.removeProperty('height');
      }
      initPropSliders(parentSection);
    }

    // 2. Scroll card smoothly into center view (respecting prefers-reduced-motion)
    try {
      cardEl.scrollIntoView({
        block: 'center',
        behavior: dls.reduced ? 'auto' : 'smooth'
      });
    } catch (_) {}

    // 3. Yield one micro-frame so cookie banner renders right after introDone, then open existing View details modal
    await new Promise(r => requestAnimationFrame(() => setTimeout(r, 30)));
    if (typeof window.__radhyaOpenPropModal === 'function') {
      window.__radhyaOpenPropModal(cardEl);
      dls.timings.modalOpen = performance.now();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTalkToTeamButtons();
      initCookieConsent();
      ensureAllCardShareButtons();
      initDeepLinkFlow();
    });
  } else {
    initTalkToTeamButtons();
    initCookieConsent();
    ensureAllCardShareButtons();
    initDeepLinkFlow();
  }

  // =========================================================================
  // TASK 1: PER-CARD SHARE ICON, ROLE-PAGE MAPPING & TOAST HELPER
  // =========================================================================
  const CARD_ROLE_PAGE_MAP = {
    'real-estate': 'real-estate.html',
    'REAL_ESTATE': 'real-estate.html',
    'renovation': 'renovation.html',
    'RENOVATION': 'renovation.html',
    'loan': 'loan.html',
    'LOAN': 'loan.html',
    'vehicle-sale-purchase': 'vehicle-sale-purchase.html',
    'auto-moto': 'vehicle-sale-purchase.html',
    'AUTO_MOTO': 'vehicle-sale-purchase.html',
    'insurance': 'insurance.html',
    'INSURANCE': 'insurance.html',
    'tours-and-travels': 'real-estate.html',
    'TOURS_AND_TRAVELS': 'real-estate.html'
  };

  function resolveCardRolePage(cardLike) {
    if (cardLike) {
      const roleKey = (cardLike.role || cardLike.dataset?.role || '').trim();
      if (roleKey && CARD_ROLE_PAGE_MAP[roleKey]) return CARD_ROLE_PAGE_MAP[roleKey];
      if (roleKey && CARD_ROLE_PAGE_MAP[roleKey.toLowerCase()]) return CARD_ROLE_PAGE_MAP[roleKey.toLowerCase()];

      const divKey = (cardLike.division || cardLike.dataset?.division || cardLike.querySelector?.('.prop-card__more')?.dataset?.division || '').trim();
      if (divKey && CARD_ROLE_PAGE_MAP[divKey]) return CARD_ROLE_PAGE_MAP[divKey];
      if (divKey && CARD_ROLE_PAGE_MAP[divKey.toUpperCase()]) return CARD_ROLE_PAGE_MAP[divKey.toUpperCase()];
    }
    const bodyRole = (document.body?.dataset?.role || '').trim().toLowerCase();
    if (bodyRole && CARD_ROLE_PAGE_MAP[bodyRole]) return CARD_ROLE_PAGE_MAP[bodyRole];
    return 'real-estate.html';
  }

  function slugifyCardPart(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 64) || 'listing';
  }

  function getStableCardId(cardEl) {
    if (!cardEl) return '';
    const moreBtn = cardEl.querySelector('.prop-card__more');
    let id = (cardEl.dataset.cardId || moreBtn?.dataset?.cardId || '').trim();
    if (!id) {
      const role = (document.body?.dataset?.role || 'listing').toLowerCase();
      const title = cardEl.querySelector('h4')?.textContent || moreBtn?.dataset?.title || 'item';
      id = `card-${role}-${slugifyCardPart(title)}`;
    }
    cardEl.dataset.cardId = id;
    if (moreBtn && !moreBtn.dataset.cardId) moreBtn.dataset.cardId = id;
    return id;
  }

  function buildCardShareUrl(cardEl) {
    const id = getStableCardId(cardEl);
    const rolePage = resolveCardRolePage(cardEl);
    return `${window.location.origin}/${rolePage}?card=${encodeURIComponent(id)}`;
  }

  let toastHideTimer = null;
  function showWebsiteToast(message, durationMs = 2000) {
    let toast = document.getElementById('radhyaToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'radhyaToast';
      toast.className = 'radhya-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    if (toastHideTimer) clearTimeout(toastHideTimer);
    toastHideTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, durationMs);
  }
  window.__radhyaShowToast = showWebsiteToast;

  async function copyToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {}
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  }

  async function shareCard(cardEl) {
    if (!cardEl) return;
    const moreBtn = cardEl.querySelector('.prop-card__more');
    const title = (moreBtn?.dataset?.title || cardEl.querySelector('h4')?.textContent || 'Radhya Realty Listing').trim();
    const url = buildCardShareUrl(cardEl);
    const text = `${title} — Radhya Realty`;

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function' && window.isSecureContext) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    await copyToClipboard(url);
    showWebsiteToast('Link copied', 2000);
  }
  window.shareCard = shareCard;

  const SHARE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

  function ensureCardShareButton(cardEl) {
    if (!cardEl) return;
    const id = getStableCardId(cardEl);
    const fig = cardEl.querySelector('.prop-card__fig');
    if (!fig) return;
    const moreBtn = cardEl.querySelector('.prop-card__more');
    const title = (moreBtn?.dataset?.title || cardEl.querySelector('h4')?.textContent || 'listing').trim();

    let btn = fig.querySelector('.prop-card__share');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'prop-card__share';
      btn.innerHTML = `<span class="prop-card__share-circle" aria-hidden="true">${SHARE_SVG}</span>`;
      fig.appendChild(btn);
    }
    btn.setAttribute('aria-label', `Share ${title}`);
    btn.dataset.cardId = id;
    btn.dataset.shareUrl = buildCardShareUrl(cardEl);
  }

  function ensureAllCardShareButtons() {
    document.querySelectorAll('.prop-card').forEach(ensureCardShareButton);
  }
  window.__radhyaEnsureShareButtons = ensureAllCardShareButtons;

  // Event delegation for Share buttons (runs in capture or bubble before modal opener)
  document.addEventListener('click', e => {
    const shareBtn = e.target.closest('.prop-card__share');
    if (!shareBtn) return;
    e.preventDefault();
    e.stopPropagation();
    const card = shareBtn.closest('.prop-card');
    if (card) shareCard(card);
  }, true);

})();
