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
  const PANEL_ARROW = '<svg class="panel__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  header.outerHTML = `
  <header class="site-header" id="hdr">
    <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="panel"><span class="burger"></span><span class="t">Roles</span></button>
    <a class="brand" href="index.html" aria-label="Radhya Realty home">${logo(false)}</a>
    <div class="social">
      <a href="https://youtube.com/@radhyareality?si=CPdniRCnz5sPH7Q6" target="_blank" rel="noopener" aria-label="YouTube">${svg(ICONS.yt)}</a>
      <a href="https://www.instagram.com/radhya_reality?utm_source=qr&cplk=MXNkeDFveTMwNXg4dQ==" target="_blank" rel="noopener" aria-label="Instagram">${svg(ICONS.ig)}</a>
      <a href="https://www.facebook.com/1083501174848035?ref=PROFILE_EDIT_xav_ig_profile_page_web" target="_blank" rel="noopener" aria-label="Facebook">${svg(ICONS.fb)}</a>
      <a href="https://x.com/Radhya_reality" target="_blank" rel="noopener" aria-label="Twitter">${svg(ICONS.tw)}</a>
    </div>
  </header>
  <nav class="panel" id="panel" aria-label="Business roles">
    <div class="panel__header">
      <span class="panel__eyebrow">Anubhav Bharat Group</span>
      <span class="panel__title">Divisions &amp; Advisory</span>
    </div>
    <div class="panel__list">
      ${ROLES.map(r => `<a href="${r.slug}.html" ${r.slug === current ? 'aria-current="page"' : ''}><span class="panel__icon">${svg(r.icon)}</span><span class="panel__label">${r.name}</span>${PANEL_ARROW}</a>`).join('')}
      <a href="${CONTACT.href}"><span class="panel__icon">${svg(CONTACT.icon)}</span><span class="panel__label">${CONTACT.name}</span>${PANEL_ARROW}</a>
    </div>
  </nav>`;
  document.getElementById('site-footer').outerHTML = `
  <footer class="site-footer">
    <div class="wrap footer-wrap">
      <div class="footer-main">
        <div class="footer-identity">
          <div class="footer-brand-row">
            <span class="footer-brand-name">Radhya Realty</span>
            <span class="footer-dot" aria-hidden="true">&bull;</span>
            <span class="footer-group-name">Anubhav Bharat Group</span>
          </div>
          <span class="footer-tagline">One solution for all your needs</span>
        </div>
        <nav class="footer-pages" aria-label="Legal Documents">
          <a href="privacy-policy.html" class="footer-link">Privacy Policy</a>
          <a href="terms.html" class="footer-link">Terms &amp; Conditions</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">&copy; ${new Date().getFullYear()} Radhya Realty, Anubhav Bharat Group. All rights reserved.</span>
        <div class="footer-controls footer-legal-nav" role="group" aria-label="Privacy &amp; Cookie Controls">
          <button id="btnOpenCookieSettings" type="button" class="footer-control-btn">Cookie Settings</button>
          <button id="btnOpenDataRights" type="button" class="footer-control-btn footer-control-btn--accent">Data Rights &amp; Withdraw Consent</button>
        </div>
      </div>
    </div>
  </footer>`;

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

  /* intro + unified introDone promise & early deep-link redirects (plays ONCE per session on whichever link opens first) */
  const INTRO_SESSION_KEY = 'radhya_intro_seen_v1';
  let introAlreadySeen = false;
  try { introAlreadySeen = sessionStorage.getItem(INTRO_SESSION_KEY) === '1'; } catch (_) {}

  document.documentElement.dataset.introState = introAlreadySeen ? 'done' : 'running';
  const hdr = document.getElementById('hdr');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const searchParams = new URLSearchParams(window.location.search);
  const rawCardParam = searchParams.get('card');
  const hasCardParam = rawCardParam !== null;
  const CARD_ID_RE = /^[A-Za-z0-9_-]{1,100}$/;
  const validCardId = hasCardParam && CARD_ID_RE.test(rawCardParam) ? rawCardParam : null;
  const invalidCardParam = hasCardParam && !validCardId;
  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function inferRolePageEarly(cardId) {
    const id = String(cardId || '').toLowerCase();
    if (id.includes('real-estate')) return 'real-estate.html';
    if (id.includes('renovation')) return 'renovation.html';
    if (id.includes('loan')) return 'loan.html';
    if (id.includes('vehicle-sale-purchase') || id.includes('auto-moto')) return 'vehicle-sale-purchase.html';
    if (id.includes('insurance')) return 'insurance.html';
    return null;
  }

  const deepLinkState = {
    rawCardParam,
    hasCardParam,
    validCardId,
    invalidCardParam,
    currentFile,
    reduced,
    introPlayed: false,
    deferredIntro: false,
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
    if (played) {
      try { sessionStorage.setItem(INTRO_SESSION_KEY, '1'); } catch (_) {}
      introAlreadySeen = true;
    }
    if (deepLinkState.timings.introEnd === null) {
      deepLinkState.timings.introEnd = performance.now();
    }
    document.documentElement.dataset.introState = 'done';
    window.dispatchEvent(new CustomEvent('radhya:intro-end'));
    resolveIntroDone();
  }

  // Local server alias redirect: auto-moto.html?card=... -> vehicle-sale-purchase.html?card=... (before any intro)
  if (currentFile === 'auto-moto.html' && hasCardParam) {
    window.__radhyaRedirecting = true;
    window.location.replace('vehicle-sale-purchase.html' + window.location.search + window.location.hash);
    return;
  }

  // Instant 0ms redirect for index.html?card=<id> or wrong role page when role can be inferred
  if ((page === 'role' || page === 'home') && validCardId) {
    const inferredPage = inferRolePageEarly(validCardId);
    if (inferredPage && inferredPage.toLowerCase() !== currentFile) {
      window.__radhyaRedirecting = true;
      window.location.replace(inferredPage + window.location.search + window.location.hash);
      return;
    }
  }

  let introStarted = false;
  function runIntroSequence() {
    if (introStarted || introSettled) return;
    introStarted = true;

    const hold = document.getElementById('intro-hold');
    if (hold) hold.remove();

    // Already played once in this session: skip intro and show page immediately
    if (introAlreadySeen) {
      if (hdr) hdr.classList.remove('hidden');
      document.documentElement.style.overflow = '';
      document.body.classList.add('ready');
      settleIntroDone(false);
      return;
    }

    document.documentElement.dataset.introState = 'running';
    if (hdr) hdr.classList.remove('hidden');

    // Non-reflowing scroll lock during intro (zero scrollbar-width shift / CLS === 0)
    const preventIntroScroll = e => {
      if (e.cancelable) e.preventDefault();
    };
    const preventIntroKeys = e => {
      if (e.key === ' ' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
      }
    };
    window.addEventListener('wheel', preventIntroScroll, { passive: false });
    window.addEventListener('touchmove', preventIntroScroll, { passive: false });
    window.addEventListener('keydown', preventIntroKeys, { passive: false });

    const brandEl = document.querySelector('#hdr .brand') || document.querySelector('.brand');
    const divNames = ROLES.map(r => r.name);
    const divMarkup = divNames.map((name, idx) => {
      const isLast = idx === divNames.length - 1;
      const isBreakAfter = idx === 2;
      return `<li class="intro-div-item"><span class="intro-div-label">${name}</span></li>`
        + (!isLast ? `<li class="intro-div-sep${isBreakAfter ? ' intro-div-sep--break' : ''}" aria-hidden="true"></li>` : '')
        + (isBreakAfter ? `<li class="intro-div-break" aria-hidden="true"></li>` : '');
    }).join('');

    const intro = document.createElement('div');
    intro.id = 'intro';
    intro.setAttribute('aria-hidden', 'true');
    intro.innerHTML = `
      <div class="intro-curtain"></div>
      <canvas class="intro-sheen" aria-hidden="true"></canvas>
      <div class="intro-persp-rig" aria-hidden="true">
        <div class="intro-grid-plane"></div>
        <div class="intro-arch-wire">
          <svg viewBox="0 0 800 420" fill="none" aria-hidden="true">
            <path class="intro-wire-beam" d="M120 340 L400 72 L680 340"/>
            <path class="intro-wire-beam intro-wire-beam--inner" d="M195 340 L400 144 L605 340"/>
            <line class="intro-wire-plumb" x1="400" y1="36" x2="400" y2="376"/>
            <line class="intro-wire-horizon" x1="76" y1="340" x2="724" y2="340"/>
          </svg>
        </div>
      </div>
      <div class="intro-frame">
        <div class="intro-rule-h intro-rule-h--top"></div>
        <div class="intro-rule-h intro-rule-h--bottom"></div>
        <div class="intro-rule-v intro-rule-v--left"></div>
        <div class="intro-rule-v intro-rule-v--right"></div>
        <div class="intro-corner intro-corner--tl"></div>
        <div class="intro-corner intro-corner--tr"></div>
        <div class="intro-corner intro-corner--bl"></div>
        <div class="intro-corner intro-corner--br"></div>
        <div class="intro-datum intro-datum--top"></div>
        <div class="intro-datum intro-datum--bottom"></div>
        <div class="intro-datum intro-datum--left"></div>
        <div class="intro-datum intro-datum--right"></div>
      </div>
      <div class="intro-stage">
        <div class="intro-mark-unit">
          <div class="intro-mark-specular" aria-hidden="true"></div>
          <svg class="intro-mark-svg" viewBox="0 0 600 215" role="img" aria-label="Radhya Realty">
            <defs>
              <clipPath id="rrIntroWordClip">
                <rect x="0" y="128" width="600" height="87"/>
              </clipPath>
              <linearGradient id="rrIntroBrassGrad" x1="180" y1="24" x2="420" y2="195" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#e3c883"/>
                <stop offset="48%" stop-color="#c9a24b"/>
                <stop offset="100%" stop-color="#dfbc68"/>
              </linearGradient>
            </defs>
            <path class="intro-roof-echo" d="M205 118 L300 28 L395 118" fill="none" stroke="rgba(227,200,131,0.34)" stroke-width="3" stroke-linecap="square"/>
            <path class="intro-roof" d="M205 118 L300 28 L395 118" fill="none" stroke="url(#rrIntroBrassGrad)" stroke-width="9" stroke-linecap="square"/>
            <g fill="#c9a24b">
              <rect class="intro-pane" x="285" y="68" width="14" height="14"/>
              <rect class="intro-pane" x="302" y="68" width="14" height="14"/>
              <rect class="intro-pane" x="285" y="85" width="14" height="14"/>
              <rect class="intro-pane" x="302" y="85" width="14" height="14"/>
            </g>
            <g clip-path="url(#rrIntroWordClip)">
              <g class="intro-wordmark-rise">
                <text x="300" y="190" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="600" font-size="56" letter-spacing="7" fill="#c9a24b">RADHYA REALTY</text>
              </g>
            </g>
          </svg>
        </div>
        <div class="intro-sub-lockup">
          <div class="intro-group-row">
            <span class="intro-flank intro-flank--left"></span>
            <span class="intro-mask-line"><span class="intro-group-text">ANUBHAV BHARAT GROUP</span></span>
            <span class="intro-flank intro-flank--right"></span>
          </div>
          <div class="intro-mask-line intro-motto-wrap">
            <span class="intro-motto-text">ONE SOLUTION FOR ALL YOUR NEEDS</span>
          </div>
        </div>
        <div class="intro-divisions">
          <div class="intro-div-rule"></div>
          <ul class="intro-div-list">${divMarkup}</ul>
        </div>
      </div>`;

    // prefers-reduced-motion: gentle <220ms architectural dissolve preserving introStart -> introEnd -> banner order
    if (reduced || !Element.prototype.animate) {
      intro.classList.add('intro--reduced');
      document.body.appendChild(intro);
      document.body.classList.add('ready');
      deepLinkState.timings.introStart = performance.now();
      window.dispatchEvent(new CustomEvent('radhya:intro-start'));

      let cleanedReduced = false;
      const finishReduced = () => {
        if (cleanedReduced) return;
        cleanedReduced = true;
        window.removeEventListener('wheel', preventIntroScroll);
        window.removeEventListener('touchmove', preventIntroScroll);
        window.removeEventListener('keydown', preventIntroKeys);
        const sc = intro.querySelector('.intro-sheen');
        if (sc) { sc.width = 0; sc.height = 0; sc.remove(); }
        if (intro.parentNode) intro.remove();
        document.documentElement.style.overflow = '';
        settleIntroDone(true);
      };
      const reducedSafety = setTimeout(finishReduced, 230);
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (Element.prototype.animate) {
            const fade = intro.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 135, easing: 'ease-out', fill: 'forwards' });
            fade.finished.then(() => { clearTimeout(reducedSafety); finishReduced(); }).catch(() => { clearTimeout(reducedSafety); finishReduced(); });
          } else {
            intro.style.opacity = '0';
            setTimeout(() => { clearTimeout(reducedSafety); finishReduced(); }, 135);
          }
        }, 20);
      });
      return;
    }

    if (brandEl) brandEl.style.opacity = '0';
    document.body.appendChild(intro);
    document.body.classList.add('ready');
    const introStartPerf = performance.now();
    deepLinkState.timings.introStart = introStartPerf;
    window.dispatchEvent(new CustomEvent('radhya:intro-start'));

    // Ambient Layer: Compact centered DPR-capped Canvas 2D warm-brass luster (0ms per-frame CPU raster)
    const sheenCanvas = intro.querySelector('.intro-sheen');
    let sheenCtx = sheenCanvas ? sheenCanvas.getContext('2d', { alpha: true }) : null;
    if (sheenCanvas && sheenCtx) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = sheenCanvas.getBoundingClientRect();
      const cw = Math.max(240, Math.round((rect.width || 600) * 0.5 * dpr));
      const ch = Math.max(160, Math.round((rect.height || 360) * 0.5 * dpr));
      sheenCanvas.width = cw;
      sheenCanvas.height = ch;
      const rad = sheenCtx.createRadialGradient(cw * 0.5, ch * 0.46, 0, cw * 0.5, ch * 0.46, Math.max(cw, ch) * 0.52);
      rad.addColorStop(0.0, 'rgba(201, 162, 75, 0.16)');
      rad.addColorStop(0.42, 'rgba(201, 162, 75, 0.07)');
      rad.addColorStop(0.78, 'rgba(201, 162, 75, 0.015)');
      rad.addColorStop(1.0, 'rgba(6, 15, 32, 0)');
      sheenCtx.fillStyle = rad;
      sheenCtx.fillRect(0, 0, cw, ch);
    }

    const activeAnims = [];
    const activeTimers = [];
    const trackAnim = (el, keyframes, opts) => {
      if (!el) return null;
      const a = el.animate(keyframes, opts);
      activeAnims.push(a);
      return a;
    };
    const scheduleAt = (fn, ms) => {
      const id = setTimeout(fn, ms);
      activeTimers.push(id);
      return id;
    };

    let cleaned = false;
    function cleanupIntroAndResolve() {
      if (cleaned) return;
      cleaned = true;
      for (let i = 0; i < activeTimers.length; i++) clearTimeout(activeTimers[i]);
      activeTimers.length = 0;
      for (let i = 0; i < activeAnims.length; i++) {
        try { activeAnims[i].cancel(); } catch (_) {}
      }
      activeAnims.length = 0;
      window.removeEventListener('wheel', preventIntroScroll);
      window.removeEventListener('touchmove', preventIntroScroll);
      window.removeEventListener('keydown', preventIntroKeys);
      if (sheenCanvas) {
        sheenCanvas.width = 0;
        sheenCanvas.height = 0;
        sheenCanvas.remove();
      }
      sheenCtx = null;
      if (brandEl) {
        brandEl.style.transition = '';
        brandEl.style.opacity = '';
      }
      if (intro.parentNode) intro.remove();
      document.documentElement.classList.remove('intro-lifting');
      if (hdr) hdr.classList.remove('hidden');
      document.documentElement.style.overflow = '';
      settleIntroDone(true);
    }

    // Hard safety fallback timer (~2940ms master timeline + 600ms buffer) so introDone NEVER hangs
    const introFallbackTimer = setTimeout(cleanupIntroAndResolve, 3550);
    activeTimers.push(introFallbackTimer);

    const easeOutArch = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const easeHandoff = 'cubic-bezier(0.65, 0, 0.35, 1)';

    const curtain = intro.querySelector('.intro-curtain');
    const perspRig = intro.querySelector('.intro-persp-rig');
    const gridPlane = intro.querySelector('.intro-grid-plane');
    const archWire = intro.querySelector('.intro-arch-wire');
    const wireBeams = intro.querySelectorAll('.intro-wire-beam');
    const wirePlumb = intro.querySelector('.intro-wire-plumb');
    const wireHorizon = intro.querySelector('.intro-wire-horizon');
    const frameEl = intro.querySelector('.intro-frame');
    const rulesH = intro.querySelectorAll('.intro-rule-h');
    const rulesV = intro.querySelectorAll('.intro-rule-v');
    const corners = intro.querySelectorAll('.intro-corner');
    const datums = intro.querySelectorAll('.intro-datum');
    const markUnit = intro.querySelector('.intro-mark-unit');
    const markSpecular = intro.querySelector('.intro-mark-specular');
    const markSvg = intro.querySelector('.intro-mark-svg');
    const roofEcho = intro.querySelector('.intro-roof-echo');
    const roofPath = intro.querySelector('.intro-roof');
    const panes = intro.querySelectorAll('.intro-pane');
    const wordmarkRise = intro.querySelector('.intro-wordmark-rise');
    const subLockup = intro.querySelector('.intro-sub-lockup');
    const flanks = intro.querySelectorAll('.intro-flank');
    const groupText = intro.querySelector('.intro-group-text');
    const mottoText = intro.querySelector('.intro-motto-text');
    const divisionsWrap = intro.querySelector('.intro-divisions');
    const divRule = intro.querySelector('.intro-div-rule');
    const divLabels = intro.querySelectorAll('.intro-div-label');
    const divSeps = intro.querySelectorAll('.intro-div-sep');

    // Beat 1 (0–700ms): 3D Architectural Datum Grid + Brass Wireframe Elevation + Studio Luster
    if (gridPlane) {
      trackAnim(gridPlane, [
        { transform: 'perspective(980px) rotateX(68deg) translate3d(0, 36px, -90px) scale(0.92)', opacity: 0 },
        { transform: 'perspective(980px) rotateX(62deg) translate3d(0, 0px, 0px) scale(1)', opacity: 0.62, offset: 0.45 },
        { transform: 'perspective(980px) rotateX(58deg) translate3d(0, -14px, 24px) scale(1.03)', opacity: 0.34 }
      ], { duration: 2150, delay: 0, easing: easeOutArch, fill: 'forwards' });
    }
    if (archWire) {
      trackAnim(archWire, [
        { transform: 'perspective(1100px) rotateX(24deg) rotateY(-9deg) translateZ(-64px) scale(0.94)', opacity: 0 },
        { transform: 'perspective(1100px) rotateX(8deg) rotateY(0deg) translateZ(0px) scale(1)', opacity: 0.85, offset: 0.52 },
        { transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(18px) scale(1.02)', opacity: 0.28 }
      ], { duration: 2100, delay: 40, easing: easeOutArch, fill: 'forwards' });
    }
    wireBeams.forEach((el, idx) => trackAnim(el, [
      { strokeDashoffset: '820', opacity: 0 },
      { strokeDashoffset: '0', opacity: idx === 0 ? 0.55 : 0.34 }
    ], { duration: 860, delay: 60 + idx * 110, easing: easeOutArch, fill: 'forwards' }));
    if (wirePlumb) {
      trackAnim(wirePlumb, [
        { strokeDashoffset: '360', opacity: 0 },
        { strokeDashoffset: '0', opacity: 0.38 }
      ], { duration: 680, delay: 90, easing: easeOutArch, fill: 'forwards' });
    }
    if (wireHorizon) {
      trackAnim(wireHorizon, [
        { strokeDashoffset: '660', opacity: 0 },
        { strokeDashoffset: '0', opacity: 0.42 }
      ], { duration: 720, delay: 140, easing: easeOutArch, fill: 'forwards' });
    }
    if (frameEl) {
      trackAnim(frameEl, [
        { transform: 'perspective(1200px) translateZ(-28px) scale(0.985)', opacity: 0.4 },
        { transform: 'perspective(1200px) translateZ(0px) scale(1)', opacity: 1 }
      ], { duration: 760, delay: 0, easing: easeOutArch, fill: 'forwards' });
    }
    rulesH.forEach(el => trackAnim(el,
      [{ transform: 'scaleX(0)', opacity: 0 }, { transform: 'scaleX(1)', opacity: 1 }],
      { duration: 640, delay: 0, easing: easeOutArch, fill: 'forwards' }
    ));
    rulesV.forEach(el => trackAnim(el,
      [{ transform: 'scaleY(0)', opacity: 0 }, { transform: 'scaleY(1)', opacity: 1 }],
      { duration: 600, delay: 60, easing: easeOutArch, fill: 'forwards' }
    ));
    corners.forEach((el, i) => trackAnim(el,
      [{ transform: 'scale(0.92)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
      { duration: 440, delay: 110 + i * 22, easing: easeOutArch, fill: 'forwards' }
    ));
    datums.forEach((el, i) => {
      const isVert = i < 2;
      const fromT = isVert ? 'translateX(-0.5px) scaleY(0)' : 'translateY(-0.5px) scaleX(0)';
      const toT = isVert ? 'translateX(-0.5px) scaleY(1)' : 'translateY(-0.5px) scaleX(1)';
      trackAnim(el,
        [{ transform: fromT, opacity: 0 }, { transform: toT, opacity: 1 }],
        { duration: 420, delay: 160 + i * 18, easing: easeOutArch, fill: 'forwards' }
      );
    });
    trackAnim(sheenCanvas, [
      { transform: 'translate3d(-10%, -5%, 0) scale(0.95)', opacity: 0 },
      { transform: 'translate3d(0%, 0%, 0) scale(1.02)', opacity: 0.95, offset: 0.36 },
      { transform: 'translate3d(10%, 5%, 0) scale(1)', opacity: 0 }
    ], { duration: 2200, delay: 20, easing: easeOutArch, fill: 'forwards' });

    // Beat 2 (280–1380ms): 3D Perspective Monogram Tilt -> Orthographic Lock + Brass Specular Sweep
    if (markUnit) {
      trackAnim(markUnit, [
        { transform: 'perspective(960px) rotateX(22deg) rotateY(-8deg) translate3d(0, 18px, -42px) scale(0.94)', opacity: 0 },
        { transform: 'perspective(960px) rotateX(0deg) rotateY(0deg) translate3d(0, 0px, 0px) scale(1)', opacity: 1 }
      ], { duration: 880, delay: 260, easing: easeOutArch, fill: 'forwards' });
    }
    if (roofEcho) {
      trackAnim(roofEcho, [
        { strokeDashoffset: '270', transform: 'translateY(-7px) scale(1.02)', opacity: 0 },
        { strokeDashoffset: '0', transform: 'translateY(-5px) scale(1.015)', opacity: 0.65, offset: 0.55 },
        { strokeDashoffset: '0', transform: 'translateY(0px) scale(1)', opacity: 0 }
      ], { duration: 920, delay: 280, easing: easeOutArch, fill: 'forwards' });
    }
    trackAnim(roofPath, [
      { strokeDashoffset: '270', opacity: 0 },
      { strokeDashoffset: '245', opacity: 1, offset: 0.08 },
      { strokeDashoffset: '0', opacity: 1 }
    ], { duration: 620, delay: 330, easing: easeOutArch, fill: 'forwards' });

    panes.forEach((el, i) => trackAnim(el,
      [{ transform: 'translateY(8px) scale(0.86)', opacity: 0 }, { transform: 'translateY(0px) scale(1)', opacity: 1 }],
      { duration: 380, delay: 520 + i * 32, easing: easeOutArch, fill: 'forwards' }
    ));

    trackAnim(wordmarkRise, [
      { transform: 'translateY(64px)', opacity: 0 },
      { transform: 'translateY(0px)', opacity: 1 }
    ], { duration: 520, delay: 600, easing: easeOutArch, fill: 'forwards' });

    if (markSpecular) {
      trackAnim(markSpecular, [
        { transform: 'translate3d(-135%, 0, 0) skewX(-22deg)', opacity: 0 },
        { transform: 'translate3d(0%, 0, 0) skewX(-22deg)', opacity: 0.88, offset: 0.45 },
        { transform: 'translate3d(135%, 0, 0) skewX(-22deg)', opacity: 0 }
      ], { duration: 820, delay: 860, easing: easeOutArch, fill: 'forwards' });
    }

    flanks.forEach(el => trackAnim(el,
      [{ transform: 'scaleX(0)', opacity: 0 }, { transform: 'scaleX(1)', opacity: 1 }],
      { duration: 480, delay: 780, easing: easeOutArch, fill: 'forwards' }
    ));

    trackAnim(groupText, [
      { transform: 'translate3d(0, 108%, 0) scaleX(1.04)', opacity: 0 },
      { transform: 'translate3d(0, 0%, 0) scaleX(1)', opacity: 1 }
    ], { duration: 500, delay: 770, easing: easeOutArch, fill: 'forwards' });

    trackAnim(mottoText, [
      { transform: 'translate3d(0, 108%, 0) scaleX(1.035)', opacity: 0 },
      { transform: 'translate3d(0, 0%, 0) scaleX(1)', opacity: 1 }
    ], { duration: 480, delay: 890, easing: easeOutArch, fill: 'forwards' });

    // Beat 3 (1040–1700ms): Five-Division Signature Band (45ms micro-cascade)
    trackAnim(divRule,
      [{ transform: 'scaleX(0)', opacity: 0 }, { transform: 'scaleX(1)', opacity: 1 }],
      { duration: 460, delay: 1010, easing: easeOutArch, fill: 'forwards' }
    );
    divLabels.forEach((el, i) => trackAnim(el, [
      { transform: 'translate3d(0, 105%, 0)', opacity: 0 },
      { transform: 'translate3d(0, 0%, 0)', opacity: 1 }
    ], { duration: 440, delay: 1040 + i * 45, easing: easeOutArch, fill: 'forwards' }));

    divSeps.forEach((el, i) => trackAnim(el,
      [{ transform: 'scaleY(0)', opacity: 0 }, { transform: 'scaleY(1)', opacity: 1 }],
      { duration: 360, delay: 1080 + i * 45, easing: easeOutArch, fill: 'forwards' }
    ));

    // Pre-sample exact header brand rect at ~1850ms (after fonts & #hdr settled) and schedule Beat 4 on exact 2200ms wall-clock
    scheduleAt(() => {
      if (cleaned) return;
      const nowElapsed = performance.now() - introStartPerf;
      const beat4Delay = Math.max(0, Math.round(2200 - nowElapsed));

      const brandSvg = (brandEl && brandEl.querySelector('svg')) || brandEl;
      const src = markSvg ? markSvg.getBoundingClientRect() : null;
      const dest = brandSvg ? brandSvg.getBoundingClientRect() : null;

      let dx = 0;
      let dy = -Math.round(window.innerHeight * 0.42);
      let scale = 0.28;
      if (src && dest && src.width > 0 && src.height > 0 && dest.width > 0 && dest.height > 0) {
        scale = dest.height / src.height;
        dx = (dest.left + dest.width * 0.5) - (src.left + src.width * 0.5);
        dy = (dest.top + dest.height * 0.5) - (src.top + src.height * 0.5);
      }

      // Root #intro is already transparent; .intro-curtain handles solid navy occlusion cleanly

      if (perspRig) {
        trackAnim(perspRig,
          [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.04)' }],
          { duration: 260, delay: beat4Delay, easing: easeOutArch, fill: 'forwards' }
        );
      }
      trackAnim(frameEl,
        [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.012)' }],
        { duration: 280, delay: beat4Delay, easing: easeOutArch, fill: 'forwards' }
      );
      trackAnim(subLockup,
        [{ opacity: 1, transform: 'translate3d(0, 0, 0)' }, { opacity: 0, transform: 'translate3d(0, -8px, 0)' }],
        { duration: 260, delay: beat4Delay, easing: easeOutArch, fill: 'forwards' }
      );
      trackAnim(divisionsWrap,
        [{ opacity: 1, transform: 'translate3d(0, 0, 0)' }, { opacity: 0, transform: 'translate3d(0, -10px, 0)' }],
        { duration: 260, delay: beat4Delay, easing: easeOutArch, fill: 'forwards' }
      );

      // Pure GPU compositor curtain lift (translate3d(0, -100%, 0) — 0ms paint/mask raster!)
      scheduleAt(() => {
        if (!cleaned) document.documentElement.classList.add('intro-lifting');
      }, beat4Delay);
      trackAnim(curtain, [
        { transform: 'translate3d(0, 0%, 0)' },
        { transform: 'translate3d(0, -100.5%, 0)' }
      ], { duration: 660, delay: beat4Delay + 15, easing: easeHandoff, fill: 'forwards' });

      // Precision monogram glide with locked 1:1 dock plateau (offset 0.90 -> 1.0)
      const handoffAnim = trackAnim(markUnit, [
        { transform: 'translate3d(0px, 0px, 0) scale(1)', opacity: 1 },
        { transform: `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`, opacity: 1, offset: 0.90 },
        { transform: `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`, opacity: 0 }
      ], { duration: 720, delay: beat4Delay, easing: easeHandoff, fill: 'forwards' });

      if (brandEl) {
        trackAnim(brandEl,
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 90, delay: beat4Delay + 625, easing: 'ease-out', fill: 'forwards' }
        );
      }

      scheduleAt(() => {
        if (!cleaned) intro.style.pointerEvents = 'none';
      }, beat4Delay + 400);

      if (handoffAnim && handoffAnim.finished) {
        handoffAnim.finished.then(() => {
          clearTimeout(introFallbackTimer);
          cleanupIntroAndResolve();
        }).catch(() => {
          clearTimeout(introFallbackTimer);
          cleanupIntroAndResolve();
        });
      } else {
        scheduleAt(() => {
          clearTimeout(introFallbackTimer);
          cleanupIntroAndResolve();
        }, beat4Delay + 740);
      }
    }, 1820);
  }
  window.__radhyaStartIntroNow = runIntroSequence;

  // Play intro ONCE per session on whichever link opens first (including shared ?card= links); skip on subsequent navigations
  if (introAlreadySeen) {
    if (hdr) hdr.classList.remove('hidden');
    document.documentElement.style.overflow = '';
    document.body.classList.add('ready');
    settleIntroDone(false);
    return;
  }

  // First normal visit in this session: play intro
  runIntroSequence();
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

        // Auto-open sections with matches when filter is active; restore default open section when cleared
        if (isFiltering) {
          if (sectionMatches > 0) {
            section.classList.add('open');
          } else {
            section.classList.remove('open');
          }
        }
      });

      if (!isFiltering) {
        const anyOpen = Array.from(serviceSections).some(s => s.classList.contains('open') || s.classList.contains('is-open'));
        if (!anyOpen && serviceSections.length > 0) {
          serviceSections[0].classList.add('open');
        }
      }

      // Update counter dynamically based on live hydrated cards
      const liveTotalCards = document.querySelectorAll('.prop-card').length;
      if (counterEl) {
        if (isFiltering) {
          counterEl.textContent = `Showing ${totalMatches} of ${liveTotalCards} listings`;
        } else {
          counterEl.textContent = liveTotalCards > 0
            ? `Showing all ${liveTotalCards} live listings`
            : 'Curated advisory portfolio';
        }
      }

      // Show filter empty state ONLY when user actively filtered to 0 matches
      if (emptyState) {
        emptyState.style.display = (isFiltering && totalMatches === 0) ? 'block' : 'none';
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
    const wrappedApplyFilters = () => {
      applyFilters();
      if (typeof window.__radhyaEnsureShareButtons === 'function') {
        window.__radhyaEnsureShareButtons(document);
      }
    };
    wrappedApplyFilters();
    window.applyPortalFilters = wrappedApplyFilters;
    window.__radhyaResetPortalFilters = resetAll;
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

    let lastFocusedBeforeModal = null;

    function openModal(card) {
      lastFocusedBeforeModal = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      modal._activeCard = card;
      const cardId = getStableCardId(card);
      const shareUrl = buildCardShareUrl(card);
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
        cta.dataset.cardId = cardId;
        cta.textContent = (btn && btn.dataset.ctaLabel) || 'Enquire Now';

        /* Place the Share button ONLY inside the product detail modal right beside Enquire Now */
        let actionsRow = cta.parentElement && cta.parentElement.classList.contains('prop-modal__actions')
          ? cta.parentElement
          : null;
        if (!actionsRow && cta.parentElement) {
          actionsRow = document.createElement('div');
          actionsRow.className = 'prop-modal__actions';
          cta.parentElement.insertBefore(actionsRow, cta);
          actionsRow.appendChild(cta);
        }
        if (actionsRow) {
          let modalShareBtn = actionsRow.querySelector('.prop-modal__share');
          if (!modalShareBtn) {
            modalShareBtn = document.createElement('button');
            modalShareBtn.type = 'button';
            modalShareBtn.className = 'prop-modal__share card-share-btn';
            modalShareBtn.innerHTML = `${SHARE_SVG}<span>Share</span>`;
            actionsRow.appendChild(modalShareBtn);
          }
          modalShareBtn.setAttribute('aria-label', `Share ${mTitle.textContent.trim() || 'listing'}`);
          modalShareBtn.dataset.cardId = cardId;
          modalShareBtn.dataset.shareUrl = shareUrl;
        }
      }
      
      /* media figure — uncropped full resolution + muted video controls + click-to-fullscreen */
      mFig.innerHTML = '';
      mFig.classList.remove('has-video');
      const mediaItems = [];
      let hasAnyVideo = false;
      const slider = card.querySelector('.prop-slider');
      if (slider) {
        const clone = slider.cloneNode(true);
        clone.classList.remove('prop-card__fig');
        clone.classList.add('prop-modal__slider');
        clone.style.removeProperty('height');
        clone.style.removeProperty('max-height');
        const oldPrev = clone.querySelector('.prop-slider__prev');
        const oldNext = clone.querySelector('.prop-slider__next');
        const oldDots = clone.querySelector('.prop-slider__dots');
        clone.querySelectorAll('.prop-tag, .card-share-btn, .prop-card__share, .prop-modal__expand-btn').forEach(el => el.remove());
        if (oldPrev) oldPrev.remove();
        if (oldNext) oldNext.remove();
        if (oldDots) oldDots.remove();
        const track = clone.querySelector('.prop-slider__track');
        if (track) track.style.transform = 'translateX(0)';
        clone._sliderInitialized = false;
        mFig.appendChild(clone);
        initPropSliders(mFig);

        const slides = Array.from(clone.querySelectorAll('.prop-slide'));
        slides.forEach((sl, idx) => {
          const vid = sl.querySelector('video');
          const img = sl.querySelector('img');
          const slideCaption = sl.dataset.caption || sl.querySelector('.prop-slide__caption')?.textContent?.trim() || '';
          if (vid) {
            hasAnyVideo = true;
            vid.muted = true;
            vid.defaultMuted = true;
            vid.controls = true;
            vid.playsInline = true;
            vid.setAttribute('playsinline', '');
            vid.setAttribute('controlsList', 'nodownload');
            mediaItems.push({ type: 'video', src: vid.currentSrc || vid.src, alt: mTitle.textContent, caption: slideCaption });
            if (idx === 0) {
              vid.play().catch(() => {});
            } else {
              vid.pause();
            }
          } else if (img) {
            mediaItems.push({ type: 'image', src: img.currentSrc || img.src, alt: img.alt || mTitle.textContent, caption: slideCaption });
            img.style.cursor = 'zoom-in';
            img.title = 'Click to view full screen';
            img.addEventListener('click', ev => {
              ev.stopPropagation();
              openMediaLightbox(mediaItems, idx);
            });
          }
        });
      } else {
        const imgSrc = btn ? btn.dataset.img : '';
        if (imgSrc) {
          const img = document.createElement('img');
          img.src = imgSrc; img.alt = mTitle.textContent;
          img.style.cursor = 'zoom-in';
          img.title = 'Click to view full screen';
          mediaItems.push({ type: 'image', src: imgSrc, alt: mTitle.textContent });
          img.addEventListener('click', ev => {
            ev.stopPropagation();
            openMediaLightbox(mediaItems, 0);
          });
          mFig.appendChild(img);
        } else {
          const ph = card.querySelector('.ph-icon');
          if (ph) mFig.innerHTML = `<div class="ph-icon">${ph.innerHTML}</div>`;
        }
      }
      if (hasAnyVideo) mFig.classList.add('has-video');

      if (mediaItems.length > 0) {
        const expandBtn = document.createElement('button');
        expandBtn.type = 'button';
        expandBtn.className = 'prop-modal__expand-btn';
        expandBtn.setAttribute('aria-label', 'View media in full screen');
        expandBtn.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg><span>Full Screen</span>';
        expandBtn.addEventListener('click', ev => {
          ev.stopPropagation();
          const dots = Array.from(mFig.querySelectorAll('.prop-dot'));
          const activeIdx = Math.max(0, dots.findIndex(d => d.classList.contains('is-active')));
          openMediaLightbox(mediaItems, activeIdx);
        });
        mFig.appendChild(expandBtn);
      }

      modal.classList.add('open');
      void modal.offsetWidth;
      document.body.style.overflow = 'hidden';
      if (card.dataset.isLite === 'true' && cardId && typeof window.__radhyaHydrateSingleCardFullMedia === 'function') {
        window.__radhyaHydrateSingleCardFullMedia(cardId).then(fullCard => {
          if (!fullCard || !modal.classList.contains('open')) return;
          const freshEl = document.querySelector(`.prop-card[data-card-id="${cardId.replace(/[^A-Za-z0-9_-]/g, '')}"]`);
          if (freshEl && freshEl.dataset.isLite !== 'true') openModal(freshEl);
        }).catch(() => {});
      }
      if (closeBtn) {
        const focusClose = () => {
          if (modal.classList.contains('open')) {
            try { closeBtn.focus({ preventScroll: true }); } catch (_) {}
          }
        };
        focusClose();
        requestAnimationFrame(focusClose);
        setTimeout(focusClose, 40);
        setTimeout(focusClose, 140);
      }
    }
    window.__radhyaOpenPropModal = openModal;

    /* Minimalistic 60 FPS Fullscreen Media Lightbox (Photos + Muted Video Player) */
    function openMediaLightbox(items, startIdx = 0) {
      if (!Array.isArray(items) || items.length === 0) return;
      // Pause underlying modal videos while viewing fullscreen
      mFig.querySelectorAll('video').forEach(v => v.pause());

      let lb = document.getElementById('radhyaMediaLightbox');
      if (!lb) {
        lb = document.createElement('div');
        lb.id = 'radhyaMediaLightbox';
        lb.className = 'radhya-lightbox';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.setAttribute('aria-label', 'Full screen media viewer');
        lb.innerHTML = `
          <div class="radhya-lightbox__overlay"></div>
          <div class="radhya-lightbox__topbar">
            <div class="radhya-lightbox__meta">
              <span class="radhya-lightbox__counter" id="radhyaLbCounter">1 / 1</span>
              <span class="radhya-lightbox__caption" id="radhyaLbCaption" style="display:none;"></span>
            </div>
            <button type="button" class="radhya-lightbox__close" aria-label="Close full screen">&#10005;</button>
          </div>
          <div class="radhya-lightbox__stage" id="radhyaLbStage"></div>
          <button type="button" class="radhya-lightbox__nav radhya-lightbox__prev" aria-label="Previous media">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button type="button" class="radhya-lightbox__nav radhya-lightbox__next" aria-label="Next media">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        `;
        document.body.appendChild(lb);

        const closeLb = () => {
          lb.classList.remove('open');
          lb.querySelectorAll('video').forEach(v => v.pause());
          setTimeout(() => {
            if (!lb.classList.contains('open')) {
              const st = lb.querySelector('#radhyaLbStage');
              if (st) st.innerHTML = '';
            }
          }, 240);
        };
        lb._close = closeLb;
        lb.querySelector('.radhya-lightbox__overlay')?.addEventListener('click', closeLb);
        lb.querySelector('.radhya-lightbox__close')?.addEventListener('click', closeLb);
        lb.querySelector('.radhya-lightbox__prev')?.addEventListener('click', e => { e.stopPropagation(); lb._step(-1); });
        lb.querySelector('.radhya-lightbox__next')?.addEventListener('click', e => { e.stopPropagation(); lb._step(1); });

        // Touch swipe support inside fullscreen lightbox
        let sx = 0, sy = 0;
        const stEl = lb.querySelector('#radhyaLbStage');
        stEl?.addEventListener('touchstart', e => {
          if (e.touches.length === 1) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }
        }, { passive: true });
        stEl?.addEventListener('touchend', e => {
          if (!lb.classList.contains('open')) return;
          const dx = e.changedTouches[0].clientX - sx;
          const dy = e.changedTouches[0].clientY - sy;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            lb._step(dx < 0 ? 1 : -1);
          }
        }, { passive: true });

        document.addEventListener('keydown', e => {
          if (!lb.classList.contains('open')) return;
          if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closeLb(); }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); lb._step(-1); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); lb._step(1); }
        }, true);
      }

      lb._items = items;
      lb._idx = Math.max(0, Math.min(startIdx, items.length - 1));

      const renderSlide = () => {
        const stage = lb.querySelector('#radhyaLbStage');
        const counter = lb.querySelector('#radhyaLbCounter');
        const captionEl = lb.querySelector('#radhyaLbCaption');
        const prevBtn = lb.querySelector('.radhya-lightbox__prev');
        const nextBtn = lb.querySelector('.radhya-lightbox__next');
        const currentItem = lb._items[lb._idx];
        if (!stage || !currentItem) return;

        stage.querySelectorAll('video').forEach(v => v.pause());
        stage.innerHTML = '';

        if (currentItem.type === 'video') {
          const vid = document.createElement('video');
          vid.src = currentItem.src;
          vid.controls = true;
          vid.muted = true;
          vid.defaultMuted = true;
          vid.autoplay = true;
          vid.playsInline = true;
          vid.setAttribute('playsinline', '');
          vid.setAttribute('controlsList', 'nodownload');
          vid.className = 'radhya-lightbox__media';
          stage.appendChild(vid);
          vid.play().catch(() => {});
        } else {
          const img = document.createElement('img');
          img.src = currentItem.src;
          img.alt = currentItem.alt || 'Full screen view';
          img.className = 'radhya-lightbox__media';
          stage.appendChild(img);
        }

        if (counter) counter.textContent = `${lb._idx + 1} / ${lb._items.length}`;
        if (captionEl) {
          if (currentItem.caption) {
            captionEl.textContent = currentItem.caption;
            captionEl.style.display = 'inline-flex';
          } else {
            captionEl.textContent = '';
            captionEl.style.display = 'none';
          }
        }
        const showNav = lb._items.length > 1;
        if (prevBtn) prevBtn.style.display = showNav ? 'grid' : 'none';
        if (nextBtn) nextBtn.style.display = showNav ? 'grid' : 'none';
      };

      lb._step = delta => {
        if (!lb._items || lb._items.length <= 1) return;
        lb._idx = (lb._idx + delta + lb._items.length) % lb._items.length;
        renderSlide();
      };

      renderSlide();
      lb.classList.add('open');
      void lb.offsetWidth;
      lb.querySelector('.radhya-lightbox__close')?.focus({ preventScroll: true });
    }
    window.openRadhyaMediaLightbox = openMediaLightbox;

    function closeModal() {
      const lb = document.getElementById('radhyaMediaLightbox');
      if (lb && lb.classList.contains('open') && typeof lb._close === 'function') {
        lb._close();
      }
      modal.classList.remove('open');
      modal._activeCard = null;
      document.body.style.overflow = '';
      mFig.querySelectorAll('video').forEach(v => v.pause());
      cleanCardParamFromUrl();
      if (lastFocusedBeforeModal && document.contains(lastFocusedBeforeModal)) {
        try { lastFocusedBeforeModal.focus({ preventScroll: true }); } catch (_) {}
      }
      lastFocusedBeforeModal = null;
    }

    document.addEventListener('click', e => {
      // Do not intercept clicks on slider navigation controls, share buttons, or tags inside slider
      if (e.target.closest('.prop-slider__btn') || e.target.closest('.prop-slider__dots') || e.target.closest('.prop-tag') || e.target.closest('.card-share-btn') || e.target.closest('.prop-card__share')) return;

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
    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = Array.from(modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
          .filter(el => !el.disabled && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden' && el.getBoundingClientRect().height > 0);
        if (focusables.length === 0) return;
        e.preventDefault();
        const curIdx = focusables.indexOf(document.activeElement);
        const nextIdx = e.shiftKey
          ? (curIdx <= 0 ? focusables.length - 1 : curIdx - 1)
          : (curIdx < 0 || curIdx >= focusables.length - 1 ? 0 : curIdx + 1);
        focusables[nextIdx].focus();
      }
    });
  }

  /* =========================================================================
     RADHYA REALTY CMS LIVE HYDRATION & REBIND ENGINE
     Hydrates cards from Developer Portal CMS (Memory + REST API + BroadcastChannel + LocalStorage)
     Supports mixed media carousels (Pictures + Videos) and natural CSS Grid auto-expansion
     ========================================================================= */
  const CMS_CACHE_KEY = 'radhya_cms_cards_registry_v8';
  // Purge legacy v1..v7 caches so all 66 unique local card photographs render immediately
  try {
    ['radhya_cms_cards_registry_v1','radhya_cms_cards_registry_v2','radhya_cms_cards_registry_v3','radhya_cms_cards_registry_v5','radhya_cms_cards_registry_v7'].forEach(k => localStorage.removeItem(k));
    ['real-estate','renovation','loan','vehicle-sale-purchase','insurance','all'].forEach(r => {
      localStorage.removeItem('radhya_cms_role_' + r + '_v4');
      localStorage.removeItem('radhya_cms_role_' + r + '_v5');
      localStorage.removeItem('radhya_cms_role_' + r + '_v7');
      localStorage.removeItem('radhya_cms_lite_' + r + '_v6');
      localStorage.removeItem('radhya_cms_lite_' + r + '_v7');
    });
  } catch (_) {}

  function computeRoleCardsFingerprint(roleCards) {
    return roleCards.map(c => {
      const mediaSig = Array.isArray(c.media)
        ? c.media.map(m => (m && m.url ? `${m.url.length}:${m.url.slice(0, 24)}:${m.url.slice(-16)}` : '')).join(',')
        : '';
      return `${c.id}|${c.spaceIndex}|${c.order ?? ''}|${c.updatedAt ?? ''}|${c.title ?? ''}|${c.priceText ?? ''}|${c.dataDeal ?? ''}|${mediaSig}`;
    }).join(';;');
  }

  function resolveCardMediaUrl(rawUrl) {
    const u = String(rawUrl || '').trim();
    if (!u) return '';
    if (u.startsWith('data:') || u.startsWith('blob:')) return u;
    const primaryBase = (getCrmBaseUrls()[0] || '').replace(/\/+$/, '');
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/uploads\//i.test(u)) {
      const rel = u.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, '');
      const isLocalPage = typeof window !== 'undefined' && window.location && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:');
      return isLocalPage ? rel.replace(/^\//, '') : (primaryBase ? `${primaryBase}${rel}` : rel);
    }
    if (/^https?:\/\//i.test(u)) return u;
    if (u.startsWith('/uploads/') || u.startsWith('uploads/')) {
      const cleanPath = u.startsWith('/') ? u : `/${u}`;
      if (/^\/uploads\/(card-[a-z0-9-]+|(real-estate|renovation|loan|vehicle|insurance)-sec[0-3])\.jpg$/i.test(cleanPath)) {
        return cleanPath.slice(1);
      }
      return primaryBase ? `${primaryBase}${cleanPath}` : cleanPath;
    }
    return u;
  }

  const SECTION_BLUEPRINTS = {
    'real-estate': [
      {
        eyebrow: 'Real Estate • Verified Residential Desk',
        title: 'Residential Sales & Rentals',
        desc: 'Explore verified builder floors, DDA/registry flats, and family homes across Burari, Sant Nagar, and Delhi-NCR with clear title checks and direct owner pricing.',
        landingCta: 'Request Property Shortlist',
        cardBtn: 'View Property',
        modalCta: 'Enquire About Property',
        badgeFallback: 'Verified Property',
        meta: 'Registry & Title Verified • +91 99532 27091'
      },
      {
        eyebrow: 'Real Estate • Commercial & Land Desk',
        title: 'Commercial Spaces & Plots',
        desc: 'High-footfall main-road shops, showroom floors, warehouses, and freehold residential/commercial plots with verified chain of ownership and circle-rate guidance.',
        landingCta: 'Request Commercial Inventory',
        cardBtn: 'View Property',
        modalCta: 'Enquire About Property',
        badgeFallback: 'Commercial & Plot',
        meta: 'Freehold & High-Yield Sites • +91 99532 27091'
      },
      {
        eyebrow: 'Real Estate • Legal & Valuation Desk',
        title: 'Property Valuation & Documentation',
        desc: 'Sub-registrar sale deed drafting, GPA/registry verification, circle-rate & stamp-duty calculation, mutation support, and bank-ready property valuation reports.',
        landingCta: 'Book Legal & Valuation Desk',
        cardBtn: 'View Service',
        modalCta: 'Book Legal Advisory',
        badgeFallback: 'Legal & Valuation',
        meta: 'Zero-Error Paperwork • +91 99532 27091'
      },
      {
        eyebrow: 'Real Estate • Guided Tours & Closing',
        title: 'Site Visits & Negotiation Support',
        desc: 'Accompanied on-ground property inspections, locality & builder due-diligence, transparent price negotiation, and end-to-end token-to-registry closing support.',
        landingCta: 'Schedule Accompanied Site Visit',
        cardBtn: 'View Service',
        modalCta: 'Book Site Visit',
        badgeFallback: 'Advisory Support',
        meta: '7-Day Guided Inspections • +91 99532 27091'
      }
    ],
    'renovation': [
      {
        eyebrow: 'Renovation • Turnkey Civil & Interiors',
        title: 'Full Home & Office Renovation',
        desc: 'End-to-end civil remodelling, electrical rewiring, plumbing upgrades, false ceiling, and turnkey interiors delivered on a written BOQ, fixed price, and milestone schedule.',
        landingCta: 'Request Turnkey Site Estimate',
        cardBtn: 'View Package',
        modalCta: 'Request Free Estimate',
        badgeFallback: 'Turnkey Package',
        meta: 'Fixed BOQ & Handover Date • +91 99532 27091'
      },
      {
        eyebrow: 'Renovation • Modular & Wet-Area Craft',
        title: 'Kitchen & Bathroom Remodelling',
        desc: 'BWP marine-ply modular kitchens, quartz/granite counters, concealed diverter fittings, anti-skid tiling, and leak-proof bathroom transformations built for Indian homes.',
        landingCta: 'Get Modular Remodel Quote',
        cardBtn: 'View Package',
        modalCta: 'Request Free Estimate',
        badgeFallback: 'Remodel Package',
        meta: 'Branded Fittings & Warranty • +91 99532 27091'
      },
      {
        eyebrow: 'Renovation • Protection & Surface Finish',
        title: 'Waterproofing, Flooring & Painting',
        desc: 'Terrace and bathroom chemical waterproofing, vitrified/Italian marble flooring, damp-wall treatment, and Asian Paints/Berger interior-exterior finishes with clean handover.',
        landingCta: 'Book Site Inspection & Quote',
        cardBtn: 'View Package',
        modalCta: 'Request Free Estimate',
        badgeFallback: 'Finishing Service',
        meta: 'Seepage-Free Guarantee • +91 99532 27091'
      },
      {
        eyebrow: 'Renovation • Transparent Billing & PMC',
        title: 'Itemised Quotes & Site Supervision',
        desc: 'Line-by-line material & labour BOQs, branded material verification at site, daily engineer supervision, and stage-wise billing with zero hidden contractor markups.',
        landingCta: 'Request Itemised BOQ Audit',
        cardBtn: 'View Service',
        modalCta: 'Book Site Supervision',
        badgeFallback: 'PMC & Supervision',
        meta: 'Zero Hidden Overruns • +91 99532 27091'
      }
    ],
    'loan': [
      {
        eyebrow: 'Loans • Bank & NBFC Home Finance',
        title: 'Home Loans & Plot Purchase Finance',
        desc: 'Compare SBI, HDFC, ICICI, LIC Housing & leading NBFC home loans and plot-plus-construction finance with low ROI, high LTV eligibility, and doorstep file pickup.',
        landingCta: 'Check Home Loan Eligibility',
        cardBtn: 'View Loan Plan',
        modalCta: 'Check Eligibility',
        badgeFallback: 'Home Loan',
        meta: 'Fast Bank Sanction Desk • +91 99532 27091'
      },
      {
        eyebrow: 'Loans • High-Value Equity Unlock',
        title: 'Loan Against Property (LAP)',
        desc: 'Unlock up to 70% of your residential or commercial property value for business expansion, working capital, or personal milestones with flexible tenure up to 15 years.',
        landingCta: 'Get LAP Valuation & Quote',
        cardBtn: 'View Loan Plan',
        modalCta: 'Check Eligibility',
        badgeFallback: 'LAP Finance',
        meta: 'Residential & Commercial LAP • +91 99532 27091'
      },
      {
        eyebrow: 'Loans • MSME & Commercial Growth',
        title: 'Commercial & Business Loans',
        desc: 'Structured funding for commercial shop purchase, machinery, working capital OD/CC limits, and MSME expansion with minimal documentation and dedicated bank coordination.',
        landingCta: 'Speak With Loan Advisor',
        cardBtn: 'View Loan Plan',
        modalCta: 'Check Eligibility',
        badgeFallback: 'Business Finance',
        meta: 'MSME & Commercial Desk • +91 99532 27091'
      },
      {
        eyebrow: 'Loans • Lower EMI & Auto Finance',
        title: 'Vehicle Finance & Balance Transfer',
        desc: 'Reduce your existing home loan or LAP interest rate through quick bank balance transfers with top-up options, alongside competitive new and pre-owned vehicle loans.',
        landingCta: 'Calculate EMI Savings',
        cardBtn: 'View Loan Plan',
        modalCta: 'Request Rate Comparison',
        badgeFallback: 'BT & Auto Loan',
        meta: 'Lower ROI & Top-Up Desk • +91 99532 27091'
      }
    ],
    'vehicle-sale-purchase': [
      {
        eyebrow: 'Auto-Moto • Verified Cars & Two-Wheelers',
        title: 'New & Pre-Owned Vehicles',
        desc: 'Quality-checked pre-owned hatchbacks, sedans, SUVs, and two-wheelers with verified odometer history, clean RC records, and transparent direct-deal pricing.',
        landingCta: 'Request Vehicle Stocklist',
        cardBtn: 'View Vehicle',
        modalCta: 'Book Test Drive / Enquire',
        badgeFallback: 'Verified Vehicle',
        meta: 'Clean RC & Service History • +91 99532 27091'
      },
      {
        eyebrow: 'Auto-Moto • Pre-Purchase Diagnostics',
        title: 'Inspection & Valuation',
        desc: 'Comprehensive engine, chassis, paint-depth, accidental-history, and fair market valuation checks before you buy or sell any car or two-wheeler in Delhi-NCR.',
        landingCta: 'Book Vehicle Inspection',
        cardBtn: 'View Service',
        modalCta: 'Book Vehicle Inspection',
        badgeFallback: 'Inspection Desk',
        meta: 'Multi-Point Check & Fair Value • +91 99532 27091'
      },
      {
        eyebrow: 'Auto-Moto • Delhi-NCR RTO Desk',
        title: 'Registration & Transfer Support',
        desc: 'Hassle-free RC ownership transfer (Form 29/30), bank hypothecation termination (Form 35), interstate NOC clearance, and Parivahan status tracking handled end to end.',
        landingCta: 'Book RTO Transfer Support',
        cardBtn: 'View Service',
        modalCta: 'Book RTO Transfer Support',
        badgeFallback: 'RTO & RC Desk',
        meta: 'Form 29/30 & Hypothecation • +91 99532 27091'
      },
      {
        eyebrow: 'Auto-Moto • Upgrade & Finance Desk',
        title: 'Finance & Exchange Assistance',
        desc: 'Instant valuation and fair trade-in for your current car or bike paired with low-down-payment auto loans and quick bank disbursement on your next upgrade.',
        landingCta: 'Get Exchange & Finance Quote',
        cardBtn: 'View Service',
        modalCta: 'Request Exchange Quote',
        badgeFallback: 'Exchange & Finance',
        meta: 'Fast Trade-In & Loan Approval • +91 99532 27091'
      }
    ],
    'insurance': [
      {
        eyebrow: 'Insurance • Bharat Griha & Asset Cover',
        title: 'Home & Property Insurance',
        desc: 'Protect your home structure, interiors, and commercial shop against fire, earthquake, flood, burglary, and allied perils with plain-English policy comparisons.',
        landingCta: 'Get Property Cover Quote',
        cardBtn: 'View Cover',
        modalCta: 'Get Policy Quote',
        badgeFallback: 'Property Cover',
        meta: 'Structure & Contents Protection • +91 99532 27091'
      },
      {
        eyebrow: 'Insurance • Zero-Dep & Instant Renewal',
        title: 'Motor Insurance & Renewals',
        desc: 'Comprehensive car, SUV, commercial vehicle, and two-wheeler policies with Zero-Depreciation, engine protect, roadside assistance, and instant NCB protection renewals.',
        landingCta: 'Get Instant Motor Quote',
        cardBtn: 'View Cover',
        modalCta: 'Get Policy Quote',
        badgeFallback: 'Motor Cover',
        meta: 'Cashless Garage Network • +91 99532 27091'
      },
      {
        eyebrow: 'Insurance • Family Health & Term Life',
        title: 'Health & Life Plans',
        desc: 'Cashless family-floater health insurance, senior citizen plans, super top-ups, and pure term life protection tailored to your family budget and hospital network needs.',
        landingCta: 'Compare Health & Term Plans',
        cardBtn: 'View Cover',
        modalCta: 'Get Policy Quote',
        badgeFallback: 'Health & Life',
        meta: 'Unbiased Multi-Insurer Advisory • +91 99532 27091'
      },
      {
        eyebrow: 'Insurance • Dedicated Settlement Support',
        title: 'Claims Assistance',
        desc: 'Dedicated handholding for cashless hospitalisation pre-authorisation, motor surveyor coordination, reimbursement documentation, and end-to-end claim settlement follow-ups.',
        landingCta: 'Connect With Claims Desk',
        cardBtn: 'View Service',
        modalCta: 'Request Claims Assistance',
        badgeFallback: 'Claims Support',
        meta: 'Priority Claim Advocacy • +91 99532 27091'
      }
    ]
  };

  function getSectionBlueprint(role, sIdx, fallbackTitle) {
    const normalizedRole = role === 'auto-moto' ? 'vehicle-sale-purchase' : (role || 'real-estate');
    const list = SECTION_BLUEPRINTS[normalizedRole] || SECTION_BLUEPRINTS['real-estate'];
    const bp = list[Number(sIdx)] || null;
    if (bp) return bp;
    return {
      eyebrow: 'Radhya Realty • Advisory Desk',
      title: fallbackTitle || 'Verified Advisory Portfolio',
      desc: 'Verified offerings for this section are curated directly by our specialists. Connect with us for customised options and transparent pricing.',
      landingCta: 'Request Consultation',
      cardBtn: 'View details',
      modalCta: 'Enquire Now',
      badgeFallback: 'Verified',
      meta: 'Direct Desk • +91 99532 27091'
    };
  }

  function escapeLandingText(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function getSectionTitleText(section) {
    const trigger = section && section.querySelector('.service-trigger');
    if (!trigger) return 'Verified Advisory Portfolio';
    const clone = trigger.cloneNode(true);
    clone.querySelectorAll('svg, .st-match-badge').forEach(el => el.remove());
    return (clone.textContent || '').replace(/\s+/g, ' ').trim() || 'Verified Advisory Portfolio';
  }

  const SECTION_LOADING_LABELS = {
    'real-estate': [
      'Loading Verified Residential Listings',
      'Loading Commercial & Plot Inventory',
      'Loading Legal & Valuation Desk',
      'Loading Guided Site Visit Services'
    ],
    'renovation': [
      'Loading Turnkey Renovation Packages',
      'Loading Modular Kitchen & Bath Packages',
      'Loading Waterproofing & Finishing Desk',
      'Loading Itemised BOQ & PMC Services'
    ],
    'loan': [
      'Loading Bank & NBFC Home Loan Plans',
      'Loading Loan Against Property Options',
      'Loading Commercial & MSME Loan Desk',
      'Loading Balance Transfer & Auto Finance'
    ],
    'vehicle-sale-purchase': [
      'Loading Verified Vehicle Inventory',
      'Loading Pre-Purchase Inspection Desk',
      'Loading Delhi-NCR RTO Transfer Services',
      'Loading Trade-In & Auto Finance Plans'
    ],
    'insurance': [
      'Loading Property & Asset Cover Plans',
      'Loading Zero-Dep Motor Cover Options',
      'Loading Family Health & Term Plans',
      'Loading Dedicated Claims Support Desk'
    ]
  };

  function getSectionLoadingLabel(role, sIdx, fallbackTitle) {
    const normalizedRole = role === 'auto-moto' ? 'vehicle-sale-purchase' : (role || 'real-estate');
    const list = SECTION_LOADING_LABELS[normalizedRole];
    if (list && list[Number(sIdx)]) return list[Number(sIdx)];
    return 'Loading ' + (fallbackTitle || 'Verified Offerings');
  }

  function buildSectionLoadingTagHtml(role, sIdx, fallbackTitle) {
    const label = escapeLandingText(getSectionLoadingLabel(role, sIdx, fallbackTitle));
    return '<div class="section-loading-tag" data-section-loading="true" role="status" aria-live="polite">'
      + '<span class="section-loading-tag__dot" aria-hidden="true"></span>'
      + '<span class="section-loading-tag__label">' + label + '</span>'
      + '<span class="section-loading-tag__bar" aria-hidden="true"><span class="section-loading-tag__sweep"></span></span>'
      + '</div>';
  }

  function clearSectionLoadingTags() {
    document.querySelectorAll('.section-loading-tag[data-section-loading="true"]').forEach(el => {
      el.classList.add('is-done');
      setTimeout(() => { if (el.parentNode) el.remove(); }, 220);
    });
  }

  function buildSectionLandingHtml(section, sIdx, showLoadingTag) {
    const pageRole = document.body.dataset.role || 'real-estate';
    const fallbackTitle = getSectionTitleText(section);
    const bp = getSectionBlueprint(pageRole, sIdx, fallbackTitle);
    const division = mapRoleToDivision(pageRole);
    const loadingTag = showLoadingTag ? buildSectionLoadingTagHtml(pageRole, sIdx, bp.title || fallbackTitle) : '';
    return '<div class="section-landing-card" data-section-landing="true">'
      + '<div class="section-landing-card__top">'
      + '<span class="section-landing-card__eyebrow">' + escapeLandingText(bp.eyebrow) + '</span>'
      + loadingTag
      + '</div>'
      + '<h4 class="section-landing-card__title">' + escapeLandingText(bp.title || fallbackTitle) + '</h4>'
      + '<p class="section-landing-card__desc">' + escapeLandingText(bp.desc) + '</p>'
      + '<div class="section-landing-card__actions">'
      + '<button type="button" class="section-landing-card__cta" data-enquiry="true" data-division="' + escapeLandingText(division) + '" data-title="' + escapeLandingText(bp.title || fallbackTitle) + '">' + escapeLandingText(bp.landingCta) + '</button>'
      + '<span class="section-landing-card__meta">' + escapeLandingText(bp.meta) + '</span>'
      + '</div></div>';
  }

  function renderSectionLandingStates(showLoadingTag) { 
    const pageRole = document.body.dataset.role || 'real-estate';
    const sections = document.querySelectorAll('.service-dropdown-item');
    sections.forEach((section, sIdx) => {
      const container = section.querySelector('.dropdown-cards');
      if (!container) return;
      const existingLanding = container.querySelector('.section-landing-card');
      if (!container.querySelector('.prop-card')) {
        if (!existingLanding) {
          container.innerHTML = buildSectionLandingHtml(section, sIdx, !!showLoadingTag);
        } else if (showLoadingTag && !existingLanding.querySelector('.section-loading-tag')) {
          const eyebrow = existingLanding.querySelector('.section-landing-card__eyebrow');
          if (eyebrow) {
            const fallbackTitle = getSectionTitleText(section);
            eyebrow.insertAdjacentHTML('afterend', buildSectionLoadingTagHtml(pageRole, sIdx, fallbackTitle));
          }
        }
      }
    });
  }

  function rebindInteractiveCards(cardsFromArg) {
    const pageRole = document.body.dataset.role || '';
    if (!pageRole) return;

    let targetRole = pageRole;
    if (pageRole === 'auto-moto') targetRole = 'vehicle-sale-purchase';

    let registry = cardsFromArg;
    let hasAuthoritativeRegistry = Array.isArray(cardsFromArg);
    if (!hasAuthoritativeRegistry) {
      if (Array.isArray(window.__radhyaCardsRegistry)) {
        registry = window.__radhyaCardsRegistry;
        hasAuthoritativeRegistry = true;
      } else {
        try {
          const raw = localStorage.getItem(CMS_CACHE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              registry = parsed;
              hasAuthoritativeRegistry = true;
            }
          }
        } catch (e) {}
      }
    }

    if (!hasAuthoritativeRegistry || !Array.isArray(registry)) return;
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

    // Skip redundant DOM rebuilds when background poll returns identical live cards
    const nextFingerprint = computeRoleCardsFingerprint(roleCards);
    if (window.__radhyaCardsFingerprint === nextFingerprint) {
      return;
    }
    window.__radhyaCardsFingerprint = nextFingerprint;

    const sections = document.querySelectorAll('.service-dropdown-item');
    sections.forEach((section, sIdx) => {
      const container = section.querySelector('.dropdown-cards');
      if (!container) return;

      const spaceCards = roleCards.filter(c => Number(c.spaceIndex) === sIdx);

      // Ensure zero inline style pollution that might cause collisions or bleed
      container.style.removeProperty('display');
      container.style.removeProperty('max-height');
      container.style.removeProperty('height');

      const sectionBp = getSectionBlueprint(targetRole, sIdx, getSectionTitleText(section));

      // Clear container first so deleted/dummy cards are cleanly wiped
      container.innerHTML = '';
      if (spaceCards.length === 0) {
        container.innerHTML = buildSectionLandingHtml(section, sIdx);
        return;
      }

      // Render cards in order
      spaceCards.forEach((card, cardIdx) => {
        const article = document.createElement('article');
        article.className = 'prop-card';
        article.dataset.cardId = card.id;
        article.dataset.isLite = card._isLite ? 'true' : 'false';
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

        const resolvedMedia = Array.isArray(card.media)
          ? card.media
              .map(m => ({ ...m, url: resolveCardMediaUrl(m && m.url) }))
              .filter(m => Boolean(m.url))
          : [];
        const mediaList = resolvedMedia.length > 0
          ? resolvedMedia
          : [{ type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: card.title }];

        const getSlideCaption = (rawLabel, cardTitle) => {
          const txt = String(rawLabel || '').trim();
          if (!txt) return '';
          if (cardTitle && txt.toLowerCase() === String(cardTitle).trim().toLowerCase()) return '';
          if (/\.(jpe?g|png|webp|gif|mp4|webm|mov|heic)$/i.test(txt)) return '';
          if (/^(img_|dsc_|pxl_|screenshot|whatsapp image|slide\s*\d*)$/i.test(txt)) return '';
          return txt;
        };

        mediaList.forEach((m, mIdx) => {
          const slide = document.createElement('div');
          slide.className = 'prop-slide';

          const mediaUrl = m.url || '';
          const captionText = getSlideCaption(m.caption || m.title || m.label || m.alt, card.title);
          if (captionText) slide.dataset.caption = captionText;

          const isVid = m.type === 'video' || (typeof mediaUrl === 'string' && (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.startsWith('data:video/')));
          if (isVid) {
            const vid = document.createElement('video');
            vid.src = mediaUrl;
            vid.muted = true;
            vid.defaultMuted = true;
            vid.loop = true;
            vid.autoplay = mIdx === 0;
            vid.controls = false;
            vid.removeAttribute('controls');
            vid.disablePictureInPicture = true;
            vid.disableRemotePlayback = true;
            vid.setAttribute('disablepictureinpicture', '');
            vid.setAttribute('disableremoteplayback', '');
            vid.playsInline = true;
            vid.setAttribute('playsinline', '');
            vid.setAttribute('webkit-playsinline', '');
            vid.preload = 'none';
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
            const isPriorityThumb = sIdx === 0 && cardIdx < 4 && mIdx === 0;
            img.loading = isPriorityThumb ? 'eager' : 'lazy';
            if (isPriorityThumb) img.fetchPriority = 'high';
            img.decoding = 'async';
            img.onerror = function() {
              if (this.src !== 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80') {
                this.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
              }
            };
            slide.appendChild(img);
          }

          if (captionText) {
            const cap = document.createElement('span');
            cap.className = 'prop-slide__caption';
            cap.textContent = captionText;
            slide.appendChild(cap);
          }

          track.appendChild(slide);
        });

        fig.appendChild(track);

        const tag = document.createElement('span');
        tag.className = 'prop-tag';
        tag.textContent = card.badge || sectionBp.badgeFallback || 'Verified';
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
        moreBtn.dataset.tag = card.badge || sectionBp.badgeFallback || '';
        moreBtn.dataset.title = card.title;
        moreBtn.dataset.desc = card.fullDesc || card.shortDesc || '';
        if (card.division) moreBtn.dataset.division = card.division;
        if (card.priceText) moreBtn.dataset.price = card.priceText;
        moreBtn.dataset.cardId = card.id;
        moreBtn.dataset.ctaLabel = sectionBp.modalCta || 'Enquire Now';
        moreBtn.textContent = sectionBp.cardBtn || 'View details';
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

  function getCookieConsentState() {
    try {
      const raw = localStorage.getItem('radhya_cookie_consent_v1');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function isOptionalStorageAllowed() {
    const st = getCookieConsentState();
    if (st && (st.tier === 'declined' || st.consented === false)) return false;
    return true;
  }

  function purgeOptionalLocalStorage() {
    try {
      localStorage.removeItem('radhya_cms_cards_registry_v1');
      localStorage.removeItem('radhya_cms_cards_registry_v2');
      localStorage.removeItem('radhya_crm_inbound_leads_v1');
    } catch (_) {}
  }

  /* High-speed IndexedDB + per-role localStorage public catalog cache (zero personal data, >500MB quota, <15ms hydration) */
  const CATALOG_IDB_NAME = 'radhya_catalog_idb_v4';
  const CATALOG_IDB_STORE = 'catalog';

  function getCurrentScopedRole() {
    const raw = (document.body && document.body.dataset && document.body.dataset.role) || '';
    if (!raw) return 'all';
    return raw === 'auto-moto' ? 'vehicle-sale-purchase' : raw.toLowerCase();
  }

  function getRoleLocalStorageKey(roleKey) {
    return roleKey === 'all' ? CMS_CACHE_KEY : ('radhya_cms_role_' + roleKey + '_v8');
  }

  function openCatalogIdb() {
    return new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') return resolve(null);
      try {
        const req = indexedDB.open(CATALOG_IDB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(CATALOG_IDB_STORE)) {
            db.createObjectStore(CATALOG_IDB_STORE);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
  }

  async function readCatalogFromIdb(key) {
    const db = await openCatalogIdb();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(CATALOG_IDB_STORE, 'readonly');
        const req = tx.objectStore(CATALOG_IDB_STORE).get(key);
        req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result : null);
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
  }

  async function writeCatalogToIdb(entries) {
    const db = await openCatalogIdb();
    if (!db) return;
    try {
      const tx = db.transaction(CATALOG_IDB_STORE, 'readwrite');
      const store = tx.objectStore(CATALOG_IDB_STORE);
      entries.forEach(([k, v]) => { try { store.put(v, k); } catch (_) {} });
    } catch (_) {}
  }

  function matchCardsForRole(cards, roleKey) {
    if (roleKey === 'all') return cards;
    return cards.filter(c => {
      const cRole = (c.role || '').toLowerCase();
      if (cRole === roleKey) return true;
      if (roleKey === 'vehicle-sale-purchase' && (cRole === 'auto-moto' || cRole === 'vehicle-sale-purchase' || c.division === 'AUTO_MOTO')) return true;
      if (roleKey === 'real-estate' && c.division === 'REAL_ESTATE') return true;
      if (roleKey === 'renovation' && c.division === 'RENOVATION') return true;
      if (roleKey === 'loan' && c.division === 'LOAN') return true;
      if (roleKey === 'insurance' && c.division === 'INSURANCE') return true;
      return false;
    });
  }

  function getLiteCacheKey(roleKey) {
    return 'radhya_cms_lite_' + (roleKey || 'all') + '_v8';
  }

  function cacheLiveCardsRegistry(cards, opts) {
    if (!Array.isArray(cards)) return;
    const activeRole = getCurrentScopedRole();
    const isFullRegistry = !!(opts && opts.isFullRegistry) || activeRole === 'all';
    const hasLite = cards.some(c => c && c._isLite);

    // Save compact ?lite=1 list in localStorage so every division page paints in 0ms synchronous
    if (isFullRegistry) {
      ['real-estate', 'renovation', 'loan', 'vehicle-sale-purchase', 'insurance'].forEach(rk => {
        const subset = matchCardsForRole(cards, rk);
        try {
          const s = JSON.stringify(subset);
          if (s.length < 2800000) localStorage.setItem(getLiteCacheKey(rk), s);
        } catch (_) {}
      });
    } else {
      try {
        const s = JSON.stringify(cards);
        if (s.length < 2800000) localStorage.setItem(getLiteCacheKey(activeRole), s);
      } catch (_) {}
    }

    // Save any full (non-lite) cards individually in IndexedDB (>500MB quota, <10ms read)
    if (!hasLite) {
      const idbEntries = [];
      cards.forEach(c => {
        if (c && c.id && !c._isLite) idbEntries.push(['full_' + c.id, [c]]);
      });
      if (idbEntries.length > 0) writeCatalogToIdb(idbEntries);
    }
  }

  // Merge any cached full 6-7 photo + video cards from IndexedDB into a fast list
  async function mergeFullCardsFromIdb(cards) {
    if (!Array.isArray(cards) || cards.length === 0) return cards;
    const upgraded = await Promise.all(cards.map(async (c) => {
      if (!c || !c.id || !c._isLite) return c;
      try {
        const hit = await readCatalogFromIdb('full_' + c.id);
        const full = hit && hit[0];
        if (full && full.id === c.id && !full._isLite && (full.updatedAt || '') === (c.updatedAt || '') && Array.isArray(full.media) && full.media.length > 0) {
          return { ...c, media: full.media, _isLite: false };
        }
      } catch (_) {}
      return c;
    }));
    return upgraded;
  }

  // On initial load: 0ms synchronous localStorage paint + <15ms IndexedDB full-gallery merge
  (function initCardsSurface() {
    const activeRole = getCurrentScopedRole();
    let initialCards = null;
    try {
      const raw = localStorage.getItem(getLiteCacheKey(activeRole)) || localStorage.getItem(getRoleLocalStorageKey(activeRole)) || localStorage.getItem(CMS_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) initialCards = parsed;
      }
    } catch (_) {}

    if (initialCards) {
      rebindInteractiveCards(initialCards);
      clearSectionLoadingTags();
      mergeFullCardsFromIdb(initialCards).then(upgraded => {
        if (!window.__radhyaCmsSyncedLive) {
          rebindInteractiveCards(upgraded);
        }
      }).catch(() => {});
    } else if (document.body.dataset.role) {
      renderSectionLandingStates(true);
    }
  })();

  // Preserve already-hydrated full multi-photo/video media so a fast ?lite=1 refresh NEVER downgrades a full card
  function mergeCardsPreservingFullMedia(incoming, existing) {
    if (!Array.isArray(incoming)) return [];
    if (!Array.isArray(existing) || existing.length === 0) return incoming;
    const byId = new Map();
    existing.forEach(c => { if (c && c.id) byId.set(c.id, c); });
    return incoming.map(inc => {
      if (!inc || !inc.id || !inc._isLite) return inc;
      const prev = byId.get(inc.id);
      if (prev && !prev._isLite && (prev.updatedAt || '') === (inc.updatedAt || '') && Array.isArray(prev.media) && prev.media.length > 0) {
        return { ...inc, media: prev.media, _isLite: false };
      }
      return inc;
    });
  }

  function getActiveCrmEndpoints(pathWithQuery, timeoutRemoteMs) {
    const isLocalPage = typeof window !== 'undefined' && window.location &&
      (window.location.hostname === 'localhost' ||
       window.location.hostname === '127.0.0.1' ||
       !window.location.hostname ||
       window.location.protocol === 'file:');
    const urls = getCrmBaseUrls().filter(u => {
      if (u.includes('127.0.0.1')) return false;
      if (isLocalPage && u.includes('onrender.com') && !window.__RADHYA_CRM_URL) return false;
      return true;
    });
    const list = [];
    for (const base of urls) {
      const isLocalHost = base.includes('localhost');
      if (isLocalHost && window.__radhyaLocalCrmDead) continue;
      list.push({
        url: `${base}${pathWithQuery}`,
        isLocalHost,
        timeoutMs: isLocalHost ? 400 : timeoutRemoteMs
      });
    }
    return list;
  }

  function fetchJsonFirstValid(endpoints) {
    const fetchOne = ({ url, isLocalHost, timeoutMs }) => new Promise((resolve, reject) => {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
      fetch(url, { signal: controller ? controller.signal : undefined })
        .then(res => {
          if (timer) clearTimeout(timer);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(data => {
          if (data && Array.isArray(data.cards)) resolve(data);
          else reject(new Error('Invalid payload'));
        })
        .catch(err => {
          if (timer) clearTimeout(timer);
          if (isLocalHost) window.__radhyaLocalCrmDead = true;
          reject(err);
        });
    });

    return new Promise((resolve, reject) => {
      let pending = endpoints.length;
      if (pending === 0) return reject(new Error('No endpoints'));
      let settled = false;
      endpoints.forEach(ep => {
        fetchOne(ep).then(data => {
          if (!settled) { settled = true; resolve(data); }
        }).catch(() => {
          pending -= 1;
          if (pending === 0 && !settled) reject(new Error('All endpoints failed'));
        });
      });
    });
  }

  // Deduplicated single-card full media hydration (loads all 6-7 photos + video per card, cached in IndexedDB)
  const singleCardInFlight = new Map();
  async function hydrateSingleCardFullMedia(cardId) {
    if (!cardId || typeof fetch === 'undefined') return null;
    if (singleCardInFlight.has(cardId)) return singleCardInFlight.get(cardId);
    const task = (async () => {
      try {
        const cached = await readCatalogFromIdb('full_' + cardId);
        if (cached && cached[0] && cached[0].id === cardId && !cached[0]._isLite) {
          const cur = Array.isArray(window.__radhyaCardsRegistry) ? window.__radhyaCardsRegistry : [];
          const existing = cur.find(c => c && c.id === cardId);
          if (!existing || (existing.updatedAt || '') === (cached[0].updatedAt || '')) {
            const updated = cur.map(c => (c && c.id === cardId ? { ...cached[0], _isLite: false } : c));
            if (updated.length > 0) {
              window.__radhyaCardsRegistry = updated;
              rebindInteractiveCards(updated);
            }
            return cached[0];
          }
        }
      } catch (_) {}
      try {
        const eps = getActiveCrmEndpoints(`/api/v1/public/cards?id=${encodeURIComponent(cardId)}`, 45000);
        const data = await fetchJsonFirstValid(eps);
        const fullCard = data && Array.isArray(data.cards) ? data.cards.find(c => c && c.id === cardId) : null;
        if (fullCard) {
          const cleanFull = { ...fullCard, _isLite: false };
          writeCatalogToIdb([['full_' + cardId, [cleanFull]]]);
          const cur = Array.isArray(window.__radhyaCardsRegistry) ? window.__radhyaCardsRegistry : [];
          const updated = cur.map(c => (c && c.id === cardId ? cleanFull : c));
          if (updated.length > 0) {
            window.__radhyaCardsRegistry = updated;
            rebindInteractiveCards(updated);
          }
          return cleanFull;
        }
      } catch (_) {}
      return null;
    })().finally(() => {
      singleCardInFlight.delete(cardId);
    });
    singleCardInFlight.set(cardId, task);
    return task;
  }
  window.__radhyaHydrateSingleCardFullMedia = hydrateSingleCardFullMedia;

  // Staggered per-card full gallery/video hydration (concurrency 2, open section first — never chokes Render!)
  let progressiveHydrationRunId = 0;
  function hydrateVisibleCardsProgressively(cards) {
    if (!Array.isArray(cards) || !document.body.dataset.role) return;
    const liteCards = cards.filter(c => c && c.id && c._isLite);
    if (liteCards.length === 0) return;

    const myRunId = ++progressiveHydrationRunId;
    // Prioritize spaceIndex 0 (open section) first, then remaining sections
    const queue = [...liteCards].sort((a, b) => Number(a.spaceIndex || 0) - Number(b.spaceIndex || 0));
    let cursor = 0;
    const CONCURRENCY = 2;

    async function worker() {
      while (cursor < queue.length && myRunId === progressiveHydrationRunId) {
        const item = queue[cursor++];
        if (!item || !item.id) continue;
        await hydrateSingleCardFullMedia(item.id);
      }
    }

    for (let i = 0; i < Math.min(CONCURRENCY, queue.length); i++) {
      worker();
    }
  }

  let cmsSyncInFlight = null;
  let usedEarlyPrefetch = false;
  let coldStartRetryCount = 0;

  // Single-Request Fast List + Per-Card Full Media Hydration:
  // 1) ONE fast ?lite=1 request paints ALL cards immediately (<400ms warm, 45s cold-start safe)
  // 2) Merges any cached full 6-7 photo + video cards from IndexedDB in <15ms
  // 3) Hydrates remaining cards individually (?id=<id>, concurrency 2) so all 6-7 pics + videos appear smoothly
  async function syncFromCmsApi(opts = {}) {
    if (window.__radhyaRedirecting) return { ok: false, apiFailed: false };
    if (typeof fetch === 'undefined') return { ok: false, apiFailed: true };
    if (cmsSyncInFlight && !opts.deepLink) return cmsSyncInFlight;
    const runSync = (async () => {
    const isDeepLink = !!opts.deepLink;
    const pageRole = (document.body && document.body.dataset && document.body.dataset.role) || '';
    const scopedRole = pageRole === 'auto-moto' ? 'vehicle-sale-purchase' : pageRole;
    const qsParts = [];
    if (!isDeepLink && scopedRole) qsParts.push('role=' + encodeURIComponent(scopedRole));
    if (!isDeepLink) qsParts.push('lite=1');
    const roleQs = qsParts.length ? ('?' + qsParts.join('&')) : '';
    let syncSucceeded = false;

    const processIncoming = async (rawCards) => {
      if (!Array.isArray(rawCards)) return;
      const withMem = mergeCardsPreservingFullMedia(rawCards, window.__radhyaCardsRegistry);
      const withIdb = await mergeFullCardsFromIdb(withMem);
      window.__radhyaCmsSyncedLive = true;
      window.__radhyaCardsRegistry = withIdb;
      rebindInteractiveCards(withIdb);
      clearSectionLoadingTags();
      cacheLiveCardsRegistry(withIdb, { isFullRegistry: !scopedRole });
      if (scopedRole) hydrateVisibleCardsProgressively(withIdb);
    };

    // 1. Consume 0ms <head> single fast ?lite=1 prefetch
    if (!usedEarlyPrefetch && window.__radhyaPrefetchPromise) {
      usedEarlyPrefetch = true;
      try {
        const prefetched = await window.__radhyaPrefetchPromise;
        if (prefetched && Array.isArray(prefetched.cards)) {
          await processIncoming(prefetched.cards);
          syncSucceeded = true;
        }
      } catch (_) {}
    }

    // 2. Fallback / refresh fetch (45s cold-start safe, native ETag 304 = 0 bytes when unchanged)
    if (!syncSucceeded) {
      try {
        const endpoints = getActiveCrmEndpoints(`/api/v1/public/cards${roleQs}`, 45000);
        const data = await fetchJsonFirstValid(endpoints);
        if (data && Array.isArray(data.cards)) {
          await processIncoming(data.cards);
          syncSucceeded = true;
        }
      } catch (_) {}
    }

    // 3. Local static JSON fallback (/data/cards-registry.json) when offline or Render CRM is sleeping/CORS-restricted
    if (!syncSucceeded) {
      try {
        const localRes = await fetch('data/cards-registry.json?v=20261128-0925', { cache: 'no-store' });
        if (localRes.ok) {
          const localJson = await localRes.json();
          const localCards = Array.isArray(localJson) ? localJson : (localJson && Array.isArray(localJson.cards) ? localJson.cards : null);
          if (localCards && localCards.length > 0) {
            const scopedCards = scopedRole ? matchCardsForRole(localCards, scopedRole) : localCards;
            await processIncoming(scopedCards);
            syncSucceeded = true;
          }
        }
      } catch (_) {}
    }

    if (!syncSucceeded && document.body.dataset.role) {
      if (coldStartRetryCount < 3) {
        const delayMs = [3000, 6000, 10000][coldStartRetryCount] || 10000;
        coldStartRetryCount += 1;
        setTimeout(() => { if (!document.hidden) syncFromCmsApi(); }, delayMs);
      } else {
        renderSectionLandingStates(false);
        clearSectionLoadingTags();
      }
    } else {
      coldStartRetryCount = 0;
      clearSectionLoadingTags();
    }

    if (window.__radhyaDeepLinkState && window.__radhyaDeepLinkState.timings.cardsLoaded === null) {
      window.__radhyaDeepLinkState.timings.cardsLoaded = performance.now();
    }
    if (!window.__radhyaCardsReadyResolved && (syncSucceeded || coldStartRetryCount >= 3)) {
      window.__radhyaCardsReadyResolved = true;
      window.dispatchEvent(new CustomEvent('radhya:cards-ready'));
    }
    return { ok: syncSucceeded, apiFailed: !syncSucceeded };
    })();
    cmsSyncInFlight = runSync;
    try {
      return await runSync;
    } finally {
      if (cmsSyncInFlight === runSync) cmsSyncInFlight = null;
    }
  }

  const initialCardsLoadedPromise = syncFromCmsApi({
    deepLink: !!(window.__radhyaDeepLinkState && window.__radhyaDeepLinkState.validCardId)
  });
  window.__radhyaInitialCardsPromise = initialCardsLoadedPromise;

  /* Background all-division prewarmer: ONE tiny ?lite=1 request for ALL 5 divisions right after initial paint
     so switching to any division page renders cards in 0ms, then hydrates each card's 6-7 photos + video */
  function prewarmAllDivisionsInBackground() {
    if (window.__radhyaRedirecting || typeof fetch === 'undefined') return;
    const PREWARM_KEY = 'radhya_all_divisions_prewarm_v3_at';
    try {
      const lastAt = Number(sessionStorage.getItem(PREWARM_KEY) || 0);
      if (Date.now() - lastAt < 120000) return;
      sessionStorage.setItem(PREWARM_KEY, String(Date.now()));
    } catch (_) {}
    const runPrewarm = () => {
      const eps = getActiveCrmEndpoints('/api/v1/public/cards?lite=1', 45000);
      fetchJsonFirstValid(eps).then(d => {
        if (d && Array.isArray(d.cards)) {
          cacheLiveCardsRegistry(d.cards, { isFullRegistry: true });
        }
      }).catch(() => {});
    };
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(runPrewarm, { timeout: 1000 });
    } else {
      setTimeout(runPrewarm, 300);
    }
  }
  initialCardsLoadedPromise.then(() => prewarmAllDivisionsInBackground()).catch(() => prewarmAllDivisionsInBackground());

  /* Speculative hover/touch prefetch for instant <1s navigation between division pages */
  (function initNavLinkPrefetch() {
    const prefetched = new Set();
    const prefetchHref = (a) => {
      if (!a || !a.href) return;
      try {
        const u = new URL(a.href, location.href);
        if (u.origin !== location.origin || u.pathname === location.pathname || prefetched.has(u.href)) return;
        if (!/\.html$/i.test(u.pathname)) return;
        prefetched.add(u.href);
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = u.href;
        document.head.appendChild(link);
      } catch (_) {}
    };
    document.addEventListener('pointerenter', e => { const a = e.target.closest && e.target.closest('#panel a[href], #role-cards a[href]'); if (a) prefetchHref(a); }, true);
    document.addEventListener('touchstart', e => { const a = e.target.closest && e.target.closest('#panel a[href], #role-cards a[href]'); if (a) prefetchHref(a); }, { passive: true, capture: true });
  })();

  // Lightweight background sync every 45s (?lite=1 + native ETag 304 = 0 bytes when unchanged)
  setInterval(() => { if (!document.hidden) syncFromCmsApi(); }, 45000);
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
          cacheLiveCardsRegistry(cards);
        } else {
          syncFromCmsApi();
        }
      }
    };
  }

  window.addEventListener('storage', (e) => {
    if (e.key === CMS_CACHE_KEY) {
      try {
        const raw = localStorage.getItem(CMS_CACHE_KEY);
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

      if (isOptionalStorageAllowed()) {
        const existingLeads = JSON.parse(localStorage.getItem('radhya_crm_inbound_leads_v1') || '[]');
        existingLeads.unshift(leadRecord);
        localStorage.setItem('radhya_crm_inbound_leads_v1', JSON.stringify(existingLeads.slice(0, 50)));
      }

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

    // 3. Transmit to backend webhook receiver with Render cold-start retry + timeout
    const baseUrls = getCrmBaseUrls();
    let deliveredResult = null;
    for (const base of baseUrls) {
      const isLocalHost = base.includes('localhost') || base.includes('127.0.0.1');
      const maxAttempts = isLocalHost ? 1 : 3;
      const timeoutMs = isLocalHost ? 5000 : 30000;
      const crmEndpoint = `${base}/api/v1/webhooks/website-ingest`;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        let timer = null;
        try {
          const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
          if (controller) timer = setTimeout(() => controller.abort(), timeoutMs);
          const res = await fetch(crmEndpoint, {
            method: 'POST',
            signal: controller ? controller.signal : undefined,
            headers: {
              'Content-Type': 'application/json',
              'X-Radhya-Webhook-Secret': 'radhya-sec-99532-enterprise-token-2026'
            },
            body: JSON.stringify(payload)
          });
          if (timer) clearTimeout(timer);
          if (res.ok) {
            deliveredResult = await res.json();
            console.log('CRM Ingestion Response from ' + base + ':', deliveredResult);
            break;
          }
          if (attempt < maxAttempts && (res.status === 502 || res.status === 503 || res.status === 504 || res.status === 408)) {
            await new Promise(r => setTimeout(r, 1500 * attempt));
            continue;
          }
          break;
        } catch (err) {
          if (timer) clearTimeout(timer);
          if (attempt < maxAttempts) {
            await new Promise(r => setTimeout(r, 1500 * attempt));
            continue;
          }
        }
      }
      if (deliveredResult) break;
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

              <div class="radhya-consent-box" id="radhyaConsentBox">
                <label class="radhya-consent-label" for="radhyaLeadConsent">
                  <input type="checkbox" id="radhyaLeadConsent" name="consent" class="radhya-consent-checkbox" required>
                  <span class="radhya-consent-text">
                    <strong>Terms &amp; Conditions &amp; DPDP Rule 3 Consent (2026&ndash;2027) <span class="req">*</span></strong><br>
                    I confirm I am 18+ (or have verifiable guardian consent), agree to Radhya Realty's <a href="terms.html" target="_blank" rel="noopener">Terms &amp; Conditions</a> and <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a>, and give specific consent to process my Name, Phone, Email, Locality, Budget &amp; Enquiry strictly for requested advisory fulfillment under India's DPDP Act, 2023 &amp; DPDP Rules, 2025. You may withdraw consent or request erasure anytime via Footer &rarr; <em>Data Rights</em>.
                  </span>
                </label>
              </div>

              <div class="radhya-form-error" id="radhyaFormError"></div>

              <button type="submit" class="radhya-submit-btn" id="radhyaSubmitBtn">
                <span class="btn-text">Submit Enquiry</span>
              </button>
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
      const consentInput = form.querySelector('#radhyaLeadConsent');
      const consentBox = form.querySelector('#radhyaConsentBox');
      if (consentInput && !consentInput.checked) {
        if (consentBox) consentBox.classList.add('radhya-field-error');
        errBox.textContent = 'Please tick the Terms & Conditions checkbox to submit your enquiry';
        errBox.style.display = 'block';
        consentInput.focus();
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
        message: messageVal,
        consentGranted: true,
        consentTimestamp: new Date().toISOString(),
        consentVersion: 'DPDP-2026-2027-v1',
        consentPurpose: selectedDivisionText
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
      banner.className = 'radhya-cookie-banner';
      banner.setAttribute('data-nosnippet', '');
      banner.setAttribute('role', 'region');
      banner.setAttribute('aria-label', 'Cookie Consent Notice');
      banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:150;background:#0a1730;border-top:1px solid rgba(201,162,75,0.35);box-shadow:0 -8px 24px rgba(0,0,0,0.45);padding:14px 20px;font-family:\'Manrope\',-apple-system,sans-serif;color:#f2f4f8;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;';

      banner.innerHTML = `
        <div style="flex:1 1 320px;max-width:760px;">
          <div style="font-weight:700;color:#e3c883;font-size:12px;letter-spacing:0.02em;margin-bottom:4px;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;"></span>
            DPDP Act &amp; Rules (2026&ndash;2027) Statutory Privacy &amp; Cookie Notice
          </div>
          <p style="margin:0;font-size:11.5px;line-height:1.45;color:#cbd5e1;">
            Radhya Realty (Anubhav Bharat Group) uses strictly essential cookies for secure portal session authentication, inquiry routing, and lawful advisory services in compliance with India's Digital Personal Data Protection Act, 2023 &amp; DPDP Rules, 2025 (2026&ndash;2027 Enforcement Framework). Zero third-party behavioral trackers. Review our <a href="privacy-policy.html" style="color:#c9a24b;text-decoration:underline;">Privacy Policy</a> and <a href="terms.html" style="color:#c9a24b;text-decoration:underline;">Terms</a>.
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <button id="btnAcceptAllCookies" type="button" class="radhya-cookie-btn radhya-cookie-btn--accept" style="min-height:44px;min-width:44px;padding:9px 18px;border-radius:6px;background:#c9a24b;color:#060f20;font-size:12px;font-weight:700;border:none;cursor:pointer;touch-action:manipulation;">
            Accept All
          </button>
          <button id="btnEssentialCookies" type="button" class="radhya-cookie-btn radhya-cookie-btn--essential" style="min-height:44px;min-width:44px;padding:9px 16px;border-radius:6px;background:transparent;color:#f2f4f8;font-size:12px;font-weight:600;border:1px solid rgba(201,162,75,0.45);cursor:pointer;touch-action:manipulation;">
            Essential Only
          </button>
          <button id="btnDeclineCookies" type="button" class="radhya-cookie-btn radhya-cookie-btn--decline" style="min-height:44px;min-width:44px;padding:9px 16px;border-radius:6px;background:rgba(255,255,255,0.04);color:#cbd5e1;font-size:12px;font-weight:600;border:1px solid rgba(233,237,245,0.22);cursor:pointer;touch-action:manipulation;">
            Decline Cookies
          </button>
        </div>
      `;

      document.body.appendChild(banner);
      if (window.__radhyaDeepLinkState && window.__radhyaDeepLinkState.timings.bannerVisible === null) {
        window.__radhyaDeepLinkState.timings.bannerVisible = performance.now();
      }

      const saveCookieChoice = (consented, tier) => {
        try {
          localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
            consented,
            tier,
            version: 'DPDP-2026-2027-v1',
            timestamp: new Date().toISOString()
          }));
        } catch (e) {}
        if (!consented || tier === 'declined') {
          purgeOptionalLocalStorage();
        }
        banner.hidden = true;
        banner.style.display = 'none';
      };

      document.getElementById('btnAcceptAllCookies')?.addEventListener('click', () => saveCookieChoice(true, 'all'));
      document.getElementById('btnEssentialCookies')?.addEventListener('click', () => saveCookieChoice(true, 'essential'));
      document.getElementById('btnDeclineCookies')?.addEventListener('click', () => saveCookieChoice(false, 'declined'));
    }

    // Interactive DPDP 2026-2027 Data Rights & Withdraw Consent Desk (Section 6(4) & Rule 14)
    function openDataRightsModal() {
      let modal = document.getElementById('radhyaDataRightsModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'radhyaDataRightsModal';
        modal.className = 'radhya-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'radhyaDataRightsTitle');
        modal.innerHTML = `<div class="radhya-modal__overlay"></div><div class="radhya-modal__box"><button type="button" class="radhya-modal__close" aria-label="Close Data Rights Desk">&#10005;</button><div class="radhya-modal__form-view" id="radhyaRightsFormView"><p class="radhya-modal__eyebrow"><span style="color:var(--gold)">&#10022;</span> DPDP ACT &amp; RULES (2026&ndash;2027)</p><h2 class="radhya-modal__title" id="radhyaDataRightsTitle">Data Rights &amp; Withdraw Consent</h2><p class="radhya-modal__sub">Exercise your statutory rights (Access, Correction, Erasure, Grievance Redressal) or withdraw browser consent immediately.</p><div class="radhya-rights-banner"><span><strong>1-Click Browser Opt-Out:</strong> Decline optional storage and clear cached portal data from this browser.</span><button type="button" id="btnInstantWithdrawConsent" class="radhya-rights-optout-btn">Withdraw &amp; Clear</button></div><form id="radhyaDataRightsForm" novalidate><div class="radhya-form-grid"><div class="radhya-form-group"><label for="dpdpReqType">Request Type <span class="req">*</span></label><select id="dpdpReqType" name="reqType"><option value="Withdraw Consent">Withdraw Advisory Consent</option><option value="Erase / Delete My Data">Erase / Delete My Data</option><option value="Access My Data">Access Summary of My Data</option><option value="Correct My Data">Correct / Update My Data</option><option value="Lodge Grievance">Lodge DPDP Grievance (Rule 14)</option></select></div><div class="radhya-form-group"><label for="dpdpReqName">Full Name <span class="req">*</span></label><input type="text" id="dpdpReqName" name="name" placeholder="Your full name"></div></div><div class="radhya-form-grid"><div class="radhya-form-group"><label for="dpdpReqPhone">Registered Phone <span class="req">*</span></label><input type="tel" id="dpdpReqPhone" name="phone" placeholder="+91 98765 43210"></div><div class="radhya-form-group"><label for="dpdpReqEmail">Email <span class="opt">(optional)</span></label><input type="email" id="dpdpReqEmail" name="email" placeholder="name@example.com"></div></div><div class="radhya-form-group"><label for="dpdpReqNotes">Request Details <span class="opt">(optional)</span></label><textarea id="dpdpReqNotes" name="notes" rows="2" placeholder="Specify any enquiry date, correction, or erasure detail..."></textarea></div><div class="radhya-form-error" id="dpdpReqError"></div><button type="submit" class="radhya-submit-btn" id="dpdpReqSubmit"><span class="btn-text">Submit Data Rights Request</span></button><p style="margin:0.65rem 0 0;font-size:11px;color:#94a3b8;line-height:1.45;">Grievance Officer: Rakesh Raj Shukla &bull; anubhav.insurance09@gmail.com &bull; Acknowledgment within 48 hours; statutory resolution within 90 days (DPDP Rule 14).</p></form></div><div class="radhya-modal__success" id="radhyaRightsSuccess"><div class="radhya-success-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><h3 class="radhya-success-title">Request Logged</h3><p class="radhya-success-desc" id="radhyaRightsSuccessDesc"></p><button type="button" class="btn radhya-rights-done-btn" style="min-width:140px;margin-top:1rem;">Done</button></div></div>`;
        document.body.appendChild(modal);

        const closeRights = () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        };
        modal.querySelector('.radhya-modal__overlay')?.addEventListener('click', closeRights);
        modal.querySelector('.radhya-modal__close')?.addEventListener('click', closeRights);
        modal.querySelector('.radhya-rights-done-btn')?.addEventListener('click', closeRights);

        modal.querySelector('#btnInstantWithdrawConsent')?.addEventListener('click', () => {
          purgeOptionalLocalStorage();
          try {
            localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
              consented: false,
              tier: 'declined',
              version: 'DPDP-2026-2027-v1',
              timestamp: new Date().toISOString()
            }));
          } catch (_) {}
          const b = document.getElementById('radhyaCookieBanner');
          if (b) { b.hidden = true; b.style.display = 'none'; }
          if (typeof window.__radhyaShowToast === 'function') {
            window.__radhyaShowToast('Browser consent withdrawn & optional data cleared', 2600);
          }
        });

        modal.querySelector('#radhyaDataRightsForm')?.addEventListener('submit', async ev => {
          ev.preventDefault();
          const f = ev.target;
          const err = modal.querySelector('#dpdpReqError');
          const btn = modal.querySelector('#dpdpReqSubmit');
          const reqType = f.reqType.value;
          const reqName = (f.name.value || '').trim();
          const reqPhone = (f.phone.value || '').trim();
          const reqEmail = (f.email.value || '').trim();
          const reqNotes = (f.notes.value || '').trim();
          err.style.display = 'none';
          if (!reqName || reqPhone.replace(/\D/g, '').length < 10) {
            err.textContent = 'Please enter your Full Name and a valid 10-digit Phone Number.';
            err.style.display = 'block';
            return;
          }
          btn.disabled = true;
          btn.querySelector('.btn-text').textContent = 'Logging request...';
          const refId = 'DPDP-' + Date.now().toString(36).toUpperCase();
          try {
            await fetch('/api/whatsapp-enquiry.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                fullName: reqName,
                phone: reqPhone,
                email: reqEmail,
                division: 'DPDP_DATA_RIGHTS',
                productInterest: '[' + refId + '] ' + reqType,
                message: reqNotes || ('Data Principal request: ' + reqType),
                consentGranted: reqType !== 'Withdraw Consent',
                consentTimestamp: new Date().toISOString(),
                consentVersion: 'DPDP-2026-2027-v1',
                consentPurpose: 'DPDP Rule 14 - ' + reqType
              })
            });
          } catch (_) {}
          if (reqType === 'Withdraw Consent' || reqType === 'Erase / Delete My Data') {
            purgeOptionalLocalStorage();
          }
          modal.querySelector('#radhyaRightsFormView').style.display = 'none';
          const ok = modal.querySelector('#radhyaRightsSuccess');
          ok.classList.add('visible');
          modal.querySelector('#radhyaRightsSuccessDesc').textContent = 'Reference ' + refId + ': Your "' + reqType + '" request has been logged with our Grievance Officer (Rakesh Raj Shukla). You will receive acknowledgment within 48 hours and statutory resolution within 90 days.';
          f.reset();
          btn.disabled = false;
          btn.querySelector('.btn-text').textContent = 'Submit Data Rights Request';
        });
      }
      modal.querySelector('#radhyaRightsFormView').style.display = 'block';
      modal.querySelector('#radhyaRightsSuccess').classList.remove('visible');
      modal.querySelector('#dpdpReqError').style.display = 'none';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    window.openRadhyaDataRightsModal = openDataRightsModal;

    // Bind persistent "Cookie Settings" and "Data Rights & Withdraw Consent" controls inside footer .footer-legal-nav
    function attachFooterSettingsTrigger() {
      const footer = document.querySelector('footer, #site-footer, .footer');
      if (!footer) return;
      const footerLinks = footer.querySelector('.footer-legal-nav, .footer-links, .footer__links, .footer-legal, .wrap') || footer;
      let cookieBtn = document.getElementById('btnOpenCookieSettings');
      if (!cookieBtn) {
        cookieBtn = document.createElement('button');
        cookieBtn.id = 'btnOpenCookieSettings';
        cookieBtn.type = 'button';
        cookieBtn.className = 'footer-control-btn';
        cookieBtn.textContent = 'Cookie Settings';
        footerLinks.appendChild(cookieBtn);
      }
      if (!cookieBtn.dataset.bound) {
        cookieBtn.dataset.bound = '1';
        cookieBtn.addEventListener('click', showBanner);
      }
      let rightsBtn = document.getElementById('btnOpenDataRights');
      if (!rightsBtn) {
        rightsBtn = document.createElement('button');
        rightsBtn.id = 'btnOpenDataRights';
        rightsBtn.type = 'button';
        rightsBtn.className = 'footer-control-btn footer-control-btn--accent';
        rightsBtn.textContent = 'Data Rights & Withdraw Consent';
        footerLinks.appendChild(rightsBtn);
      }
      if (!rightsBtn.dataset.bound) {
        rightsBtn.dataset.bound = '1';
        rightsBtn.addEventListener('click', openDataRightsModal);
      }
    }

    // Public method to reopen settings
    window.openRadhyaCookieSettings = showBanner;

    // Check existing consent — NEVER mount or show banner before introDone resolves and introState === "done"
    const dls = window.__radhyaDeepLinkState;
    const isIndexDeepLinkRedirect = document.body?.dataset?.page === 'home' && !!(dls && dls.validCardId);
    if (!isIndexDeepLinkRedirect) {
      let existing = null;
      try { existing = localStorage.getItem(COOKIE_STORAGE_KEY); } catch (e) {}
      if (!existing) {
        Promise.resolve(window.__radhyaIntroDone).then(() => {
          if (document.documentElement.dataset.introState !== 'done') return;
          let stillEmpty = true;
          try { stillEmpty = !localStorage.getItem(COOKIE_STORAGE_KEY); } catch (e) {}
          if (stillEmpty) showBanner();
        });
      }
    }

    attachFooterSettingsTrigger();
  }

  // =========================================================================
  // TASK 2: FAST SILENT DEEP-LINK CONTROLLER (<2s OPEN, ZERO LOADING WINDOW)
  // =========================================================================
  function showDeepLinkLoader() {
    // Intentionally silent: zero loading windows or blocking spinners
    const existing = document.getElementById('radhyaDeepLinkLoader');
    if (existing) existing.remove();
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

  async function resolveFastSingleCard(targetId) {
    if (window.__radhyaSingleCardPrefetchPromise) {
      try {
        const data = await window.__radhyaSingleCardPrefetchPromise;
        if (data && Array.isArray(data.cards)) {
          const found = data.cards.find(c => c && c.id === targetId);
          if (found) return found;
        }
      } catch (_) {}
    }
    return null;
  }

  async function initDeepLinkFlow() {
    const dls = window.__radhyaDeepLinkState;
    if (!dls || !dls.hasCardParam) return;

    const pageType = document.body?.dataset?.page || '';

    if (dls.invalidCardParam) {
      showWebsiteToast('This listing is no longer available', 3000);
      cleanCardParamFallback();
      return;
    }

    const targetId = dls.validCardId;
    if (!targetId) return;

    // index.html?card=<id>: resolve via fast single-card prefetch first, then redirect silently
    if (pageType === 'home') {
      let found = await resolveFastSingleCard(targetId);
      let syncResult = { ok: !!found, apiFailed: false };
      if (!found) {
        syncResult = await initialCardsLoadedPromise;
        const registry = Array.isArray(window.__radhyaCardsRegistry) ? window.__radhyaCardsRegistry : [];
        found = registry.find(c => c && c.id === targetId) || null;
      }
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

    // Role pages: check DOM immediately (instant if cached in v2), otherwise race fast single-card prefetch
    const escapedId = (typeof CSS !== 'undefined' && typeof CSS.escape === 'function')
      ? CSS.escape(targetId)
      : targetId.replace(/[^A-Za-z0-9_-]/g, '');

    let cardEl = document.querySelector(`.prop-card[data-card-id="${escapedId}"]`);
    let syncResult = { ok: !!cardEl, apiFailed: false };

    if (!cardEl) {
      const fastCard = await resolveFastSingleCard(targetId);
      if (fastCard) {
        const correctRolePage = resolveCardRolePage(fastCard);
        const currFile = (window.location.pathname.split('/').pop() || '').toLowerCase();
        if (correctRolePage && currFile && correctRolePage.toLowerCase() !== currFile) {
          window.location.replace(correctRolePage + window.location.search + window.location.hash);
          return;
        }
        const existingReg = Array.isArray(window.__radhyaCardsRegistry) ? window.__radhyaCardsRegistry : [];
        const merged = existingReg.some(c => c && c.id === fastCard.id) ? existingReg : [fastCard, ...existingReg];
        rebindInteractiveCards(merged);
        ensureAllCardShareButtons();
        cardEl = document.querySelector(`.prop-card[data-card-id="${escapedId}"]`);
        syncResult = { ok: true, apiFailed: false };
      }
    }

    if (!cardEl) {
      syncResult = await initialCardsLoadedPromise;
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
      ensureAllCardShareButtons();
      cardEl = document.querySelector(`.prop-card[data-card-id="${escapedId}"]`);
    }

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

    // 0. Clear any active search/filter hiding the target card
    const searchInp = document.getElementById('pfcSearchInput') || document.getElementById('tsfSearchInput');
    if (cardEl.classList.contains('is-filtered-out') || (searchInp && searchInp.value.trim() !== '')) {
      if (typeof window.__radhyaResetPortalFilters === 'function') {
        window.__radhyaResetPortalFilters();
      }
      cardEl.classList.remove('is-filtered-out');
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

    // 2. Wait for first-time intro animation to complete before revealing & opening the card modal
    await Promise.resolve(window.__radhyaIntroDone);

    // 3. Scroll card smoothly into center view (respecting prefers-reduced-motion)
    try {
      cardEl.scrollIntoView({
        block: 'center',
        behavior: dls.reduced ? 'auto' : 'smooth'
      });
    } catch (_) {}

    // 4. Yield one micro-frame so cookie banner renders right after introDone, then open existing View details modal
    await new Promise(r => requestAnimationFrame(() => setTimeout(r, 30)));
    if (typeof window.__radhyaOpenPropModal === 'function') {
      window.__radhyaOpenPropModal(cardEl);
      dls.timings.modalOpen = performance.now();
      window.dispatchEvent(new CustomEvent('radhya:deeplink-opened', { detail: { cardId: targetId } }));
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
  window.__radhyaCardRolePageMap = CARD_ROLE_PAGE_MAP;

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
    const origin = (window.location && window.location.origin && window.location.origin !== 'null' && window.location.protocol !== 'file:')
      ? window.location.origin
      : 'https://anubhavbharatgroup.com';
    return `${origin}/${rolePage}?card=${encodeURIComponent(id)}`;
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
    const price = (moreBtn?.dataset?.price || cardEl.querySelector('.prop-card__price')?.textContent || '').trim();
    const url = buildCardShareUrl(cardEl);
    const text = price ? `${title} — ${price} | Radhya Realty` : `${title} | Radhya Realty`;

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function' && window.isSecureContext) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    await copyToClipboard(url);
    showWebsiteToast('Product link copied', 2000);
  }
  window.shareCard = shareCard;

  const SHARE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

  function ensureCardShareButton(cardEl) {
    if (!cardEl) return;
    getStableCardId(cardEl);
    // Share button appears ONLY inside #propModal right beside Enquire Now — remove any card-thumbnail share buttons
    cardEl.querySelectorAll('.card-share-btn, .prop-card__share').forEach(el => el.remove());
  }

  function ensureAllCardShareButtons(root = document) {
    if (!root) return;
    if (root instanceof Element && root.classList.contains('prop-card')) {
      ensureCardShareButton(root);
      return;
    }
    if (typeof root.querySelectorAll === 'function') {
      root.querySelectorAll('.prop-card').forEach(ensureCardShareButton);
    }
  }
  window.__radhyaEnsureShareButtons = ensureAllCardShareButtons;
  window.ensureShareButtons = ensureAllCardShareButtons;

  // MutationObserver safety net so dynamically added/re-rendered cards receive stable IDs and no card-corner share buttons
  if (typeof MutationObserver !== 'undefined' && !window.__radhyaShareObserverBound) {
    window.__radhyaShareObserverBound = true;
    const attachObserver = () => {
      const targets = document.querySelectorAll('.service-sections, .dropdown-cards');
      const obs = new MutationObserver(mutations => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node.classList.contains('prop-card')) {
              ensureCardShareButton(node);
            } else if (node.querySelector && node.querySelector('.prop-card')) {
              ensureAllCardShareButtons(node);
            }
          }
        }
      });
      targets.forEach(t => obs.observe(t, { childList: true, subtree: true }));
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachObserver, { once: true });
    } else {
      attachObserver();
    }
  }

  // Single delegated click listener for the modal Share button (guarded against double binding)
  if (!window.__radhyaShareClickBound) {
    window.__radhyaShareClickBound = true;
    document.addEventListener('click', e => {
      const shareBtn = e.target.closest('.prop-modal__share, .card-share-btn, .prop-card__share');
      if (!shareBtn) return;
      e.preventDefault();
      e.stopPropagation();
      const openPropModal = shareBtn.closest('#propModal');
      let card = (openPropModal && openPropModal._activeCard) || shareBtn.closest('.prop-card');
      if (!card && shareBtn.dataset.cardId) {
        const escId = (typeof CSS !== 'undefined' && typeof CSS.escape === 'function')
          ? CSS.escape(shareBtn.dataset.cardId)
          : shareBtn.dataset.cardId.replace(/[^A-Za-z0-9_-]/g, '');
        card = document.querySelector(`.prop-card[data-card-id="${escId}"]`);
      }
      if (card) shareCard(card);
    }, true);
  }

})();
