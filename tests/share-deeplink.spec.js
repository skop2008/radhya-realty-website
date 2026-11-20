/**
 * Website Share, Deep-Link Playback, Spacing, Social Icons, Resize & Pixel Preservation Suite
 * Covers Gates 1, 3, 4, 5, 6 (Website), 7 (Website Pixel + Diff Audit), 8 (Website Console & Data Hygiene)
 */
const { chromium } = require('/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { execSync } = require('child_process');

const CYCLE = Number(process.env.CYCLE || 1);
const WEB_DIR = '/Users/sakshamsaini/Documents/Radha reality';
const CRM_DIR = '/Users/sakshamsaini/Documents/Crm for Radhya Reality';
const BASELINE_DIR = path.join(WEB_DIR, 'baseline');
const PROOF_DIR = path.join(WEB_DIR, 'proof', `cycle-${CYCLE}`);
fs.mkdirSync(PROOF_DIR, { recursive: true });

const WEB_BASE = 'http://127.0.0.1:5500';
const CRM_LOCAL = 'http://localhost:3000';
const CRM_RENDER = 'https://radhya-crm.onrender.com';
const WEBHOOK_TOKEN = 'radhya-sec-99532-enterprise-token-2026';

const ALL_7_PAGES = [
  'index.html',
  'real-estate.html',
  'renovation.html',
  'loan.html',
  'vehicle-sale-purchase.html',
  'auto-moto.html',
  'insurance.html',
];

const ROLE_6_PAGES = ALL_7_PAGES.filter(p => p !== 'index.html');

function httpJson(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, opts, res => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, text: data });
        }
      });
    });
    req.on('error', reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

async function pixelComparePng(page, baselinePath, currentPath, masks = [], shiftInfo = null) {
  const b64A = fs.readFileSync(baselinePath).toString('base64');
  const b64B = fs.readFileSync(currentPath).toString('base64');
  return page.evaluate(
    async ({ b64A, b64B, masks, shiftInfo }) => {
      function loadImg(b64) {
        return new Promise((res, rej) => {
          const img = new Image();
          img.onload = () => res(img);
          img.onerror = rej;
          img.src = 'data:image/png;base64,' + b64;
        });
      }
      const [imgA, imgB] = await Promise.all([loadImg(b64A), loadImg(b64B)]);
      const w = Math.min(imgA.width, imgB.width);
      const hA = imgA.height;
      const hB = imgB.height;
      const heightDiffRatio = Math.abs(hA - hB) / Math.max(hA, hB, 1);

      const cA = document.createElement('canvas');
      cA.width = w;
      cA.height = hA;
      const ctxA = cA.getContext('2d');
      ctxA.drawImage(imgA, 0, 0);

      const cB = document.createElement('canvas');
      cB.width = w;
      cB.height = hB;
      const ctxB = cB.getContext('2d');
      ctxB.drawImage(imgB, 0, 0);

      const dA = ctxA.getImageData(0, 0, w, hA).data;
      const dB = ctxB.getImageData(0, 0, w, hB).data;

      let totalChecked = 0;
      let diffPixels = 0;

      const splitY = shiftInfo ? shiftInfo.splitY : Infinity;
      const dy = shiftInfo ? shiftInfo.dy : 0;

      for (let y = 0; y < hB; y++) {
        const useShift = y >= splitY && dy !== 0;
        const yA = useShift ? y + dy : y;
        if (yA < 0 || yA >= hA) continue;
        for (let x = 0; x < w; x++) {
          let masked = false;
          for (let m = 0; m < masks.length; m++) {
            const box = masks[m];
            if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
              masked = true;
              break;
            }
          }
          if (masked) continue;
          totalChecked++;
          const idxB = (y * w + x) * 4;
          let minDiff = Infinity;
          // For unshifted pages (dy === 0), exact (x, y) pixel match;
          // for height-shifted mobile pages (where removing the fractional 438.22px gap shifts rows by dy ± 1px subpixel rounding), check {yA-1, yA, yA+1}.
          const yOffsets = useShift ? [-1, 0, 1] : [0];
          for (let k = 0; k < yOffsets.length; k++) {
            const yy = yA + yOffsets[k];
            if (yy < 0 || yy >= hA) continue;
            const idxA = (yy * w + x) * 4;
            const d = Math.abs(dA[idxA] - dB[idxB]) + Math.abs(dA[idxA + 1] - dB[idxB + 1]) + Math.abs(dA[idxA + 2] - dB[idxB + 2]);
            if (d < minDiff) minDiff = d;
          }
          if (minDiff > 24) diffPixels++;
        }
      }
      return {
        widthA: imgA.width,
        heightA: hA,
        widthB: imgB.width,
        heightB: hB,
        dyApplied: dy,
        heightDiffPct: +(heightDiffRatio * 100).toFixed(3),
        diffPct: totalChecked ? +((diffPixels / totalChecked) * 100).toFixed(4) : 0,
        diffPixels,
        totalChecked,
      };
    },
    { b64A, b64B, masks, shiftInfo }
  );
}

(async () => {
  const ts = Date.now();
  const createdTestCardIds = [];
  const report = {
    cycle: CYCLE,
    timestamp: new Date().toISOString(),
    gates: {},
    exampleUrls: {},
  };

  const browser = await chromium.launch({ headless: true });

  try {
    // ── Seed 1 temporary __share_test_ card per division via CRM API ─────────
    const testDivisions = [
      { division: 'REAL_ESTATE', role: 'real-estate', page: 'real-estate.html', spaceIndex: 1, title: `__share_test_${ts} Real Estate Suite`, price: 'Buy: ₹1.95 Cr' },
      { division: 'RENOVATION', role: 'renovation', page: 'renovation.html', spaceIndex: 1, title: `__share_test_${ts} Turnkey Villa Reno`, price: 'Est: ₹18 Lakhs' },
      { division: 'LOAN', role: 'loan', page: 'loan.html', spaceIndex: 1, title: `__share_test_${ts} Priority LAP Desk`, price: 'From 8.40% p.a.' },
      { division: 'AUTO_MOTO', role: 'vehicle-sale-purchase', page: 'vehicle-sale-purchase.html', spaceIndex: 1, title: `__share_test_${ts} Certified SUV`, price: 'Price: ₹36 Lakhs' },
      { division: 'INSURANCE', role: 'insurance', page: 'insurance.html', spaceIndex: 1, title: `__share_test_${ts} Family Health Shield`, price: 'Cover: ₹1 Cr' },
    ];

    const testCardsByDiv = {};
    for (const spec of testDivisions) {
      const id = `card-${spec.role}-sec${spec.spaceIndex}-sharetest-${ts}`;
      const payload = {
        id,
        division: spec.division,
        role: spec.role,
        spaceIndex: spec.spaceIndex,
        spaceTitle: 'Share Test Space',
        title: spec.title,
        badge: 'Verified • Test',
        priceText: spec.price,
        shortDesc: `Automated Gate 3 deep-link test card for ${spec.division}.`,
        fullDesc: `Full description for automated deep-link test card ${id} (${spec.price}).`,
        dataType: 'all test',
        dataDeal: 'buy',
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            alt: spec.title,
          },
        ],
      };
      const res = await httpJson(`${CRM_LOCAL}/api/v1/cms/cards/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Radhya-Webhook-Token': WEBHOOK_TOKEN,
        },
        body: JSON.stringify(payload),
      });
      if (res.status !== 200) {
        throw new Error(`Failed to create test card ${id}: HTTP ${res.status} ${JSON.stringify(res.data || res.text)}`);
      }
      createdTestCardIds.push(id);
      testCardsByDiv[spec.division] = payload;
    }

    // =========================================================================
    // GATE 1 — Website Share
    // =========================================================================
    {
      const g1 = { pass: true, pages: {}, mobileShareCalledUrl: null, desktopClipboardUrl: null, desktopToastShown: false, duplicateIds: [], failures: [] };
      const allUrlsSet = new Set();
      const urlRegex = /^https?:\/\/[^/]+\/(real-estate|renovation|loan|vehicle-sale-purchase|insurance)\.html\?card=[^&]+$/;

      for (const pageFile of ALL_7_PAGES) {
        const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, permissions: ['clipboard-read', 'clipboard-write'] });
        const page = await ctx.newPage();
        await page.addInitScript(() => {
          sessionStorage.setItem('rr_intro', '1');
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
        });
        const errs = [];
        page.on('pageerror', e => errs.push(e.message));
        page.on('console', m => { if (m.type() === 'error' && !m.text().includes('favicon')) errs.push(m.text()); });

        await page.goto(`${WEB_BASE}/${pageFile}`, { waitUntil: 'load', timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(600);

        const stats = await page.evaluate(() => {
          const cards = Array.from(document.querySelectorAll('.prop-card'));
          const shareBtns = Array.from(document.querySelectorAll('.prop-card .prop-card__share'));
          const ids = cards.map(c => c.dataset.cardId || '');
          const urls = shareBtns.map(b => b.dataset.shareUrl || '');
          // Check visible share buttons (inside open accordions)
          const visibleBtns = shareBtns.filter(b => {
            const r = b.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
          });
          const tapRects = visibleBtns.map(b => {
            const r = b.getBoundingClientRect();
            return { id: b.dataset.cardId, w: +r.width.toFixed(1), h: +r.height.toFixed(1), aria: b.getAttribute('aria-label') };
          });
          return { cardCount: cards.length, shareCount: shareBtns.length, ids, urls, tapRects };
        });

        const pageDupes = stats.ids.filter((id, i) => !id || stats.ids.indexOf(id) !== i);
        const badUrls = stats.urls.filter(u => !urlRegex.test(u));
        const smallTaps = stats.tapRects.filter(t => t.w < 44 || t.h < 44);

        if (stats.cardCount !== stats.shareCount) g1.failures.push(`${pageFile}: cardCount(${stats.cardCount}) !== shareCount(${stats.shareCount})`);
        if (pageDupes.length) g1.failures.push(`${pageFile}: duplicate/empty IDs ${JSON.stringify(pageDupes)}`);
        if (badUrls.length) g1.failures.push(`${pageFile}: invalid share URLs ${JSON.stringify(badUrls.slice(0, 3))}`);
        if (smallTaps.length) g1.failures.push(`${pageFile}: tap area < 44x44 at 375px: ${JSON.stringify(smallTaps.slice(0, 3))}`);
        if (errs.length) g1.failures.push(`${pageFile}: console errors ${JSON.stringify(errs)}`);

        // Track uniqueness across role pages (auto-moto is alias of vehicle-sale-purchase so skip cross-page duplicate check between those two)
        if (pageFile !== 'auto-moto.html') {
          for (const u of stats.urls) {
            if (allUrlsSet.has(u)) g1.duplicateIds.push(`${pageFile}:${u}`);
            allUrlsSet.add(u);
          }
        }
        if (stats.urls[0]) report.exampleUrls[pageFile] = stats.urls[0];

        g1.pages[pageFile] = { cardCount: stats.cardCount, shareCount: stats.shareCount, minTap: stats.tapRects[0] || null, errs: errs.length };
        await ctx.close();
      }

      if (g1.duplicateIds.length) g1.failures.push(`Cross-page duplicate share URLs: ${JSON.stringify(g1.duplicateIds)}`);

      // Mobile navigator.share test (375px, localhost is secure context!)
      {
        const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
        const page = await ctx.newPage();
        await page.addInitScript(() => {
          sessionStorage.setItem('rr_intro', '1');
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
          window.__mockShareCalls = [];
          Object.defineProperty(navigator, 'share', {
            configurable: true,
            value: async payload => {
              window.__mockShareCalls.push(payload);
            },
          });
        });
        await page.goto('http://localhost:5500/real-estate.html', { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        const firstShare = page.locator('.service-dropdown-item.open .prop-card .prop-card__share').first();
        const expectedUrl = await firstShare.getAttribute('data-share-url');
        await firstShare.click();
        await page.waitForTimeout(250);
        const modalOpen = await page.locator('#propModal.open').count();
        const calls = await page.evaluate(() => window.__mockShareCalls);
        g1.mobileShareCalledUrl = calls[0]?.url || null;
        if (modalOpen !== 0) g1.failures.push('Mobile share click opened #propModal!');
        if (!calls.length || calls[0].url !== expectedUrl) {
          g1.failures.push(`Mobile navigator.share mismatch: got ${JSON.stringify(calls)}, expected ${expectedUrl}`);
        }
        await ctx.close();
      }

      // Desktop clipboard fallback + toast test (1280px, navigator.share disabled)
      {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
        const page = await ctx.newPage();
        await page.addInitScript(() => {
          sessionStorage.setItem('rr_intro', '1');
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
          Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
        });
        await page.goto('http://localhost:5500/vehicle-sale-purchase.html', { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        const firstShare = page.locator('.service-dropdown-item.open .prop-card .prop-card__share').first();
        const expectedUrl = await firstShare.getAttribute('data-share-url');
        await firstShare.click();
        await page.waitForTimeout(300);
        const modalOpen = await page.locator('#propModal.open').count();
        const clipText = await page.evaluate(() => navigator.clipboard.readText());
        const toastVisible = await page.locator('#radhyaToast.is-visible').isVisible();
        const toastText = toastVisible ? await page.locator('#radhyaToast').innerText() : '';
        g1.desktopClipboardUrl = clipText;
        g1.desktopToastShown = toastVisible && toastText.toLowerCase().includes('link copied');
        if (modalOpen !== 0) g1.failures.push('Desktop share click opened #propModal!');
        if (clipText !== expectedUrl) g1.failures.push(`Desktop clipboard mismatch: got ${clipText}, expected ${expectedUrl}`);
        if (!g1.desktopToastShown) g1.failures.push(`Desktop toast not shown: visible=${toastVisible}, text="${toastText}"`);
        await page.screenshot({ path: path.join(PROOF_DIR, 'gate1-desktop-share-toast.png') });
        await ctx.close();
      }

      g1.pass = g1.failures.length === 0;
      report.gates.GATE_1 = g1;
      console.log(`GATE 1 (Website Share): ${g1.pass ? 'PASS' : 'FAIL'}`, g1.failures);
    }

    // =========================================================================
    // GATE 3 — Deep-Link Playback Order: Intro -> Cookies -> Modal
    // =========================================================================
    {
      const g3 = { pass: true, scenarios: {}, failures: [] };

      async function runDeepLinkScenario(name, url, opts = {}) {
        const ctx = await browser.newContext({
          viewport: opts.viewport || { width: 375, height: 812 },
          reducedMotion: opts.reducedMotion || 'no-preference',
        });
        const page = await ctx.newPage();
        const errs = [];
        page.on('pageerror', e => errs.push(e.message));
        page.on('console', m => { if (m.type() === 'error' && !m.text().includes('favicon')) errs.push(m.text()); });

        let bannerSeenBeforeIntroEnd = false;
        let sawIntroElement = false;
        let introCountNavigations = 0;

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Poll DOM during intro to independently verify banner stays hidden while #intro is present
        const pollStart = Date.now();
        while (Date.now() - pollStart < 9000) {
          const snap = await page.evaluate(() => {
            const intro = document.getElementById('intro');
            const banner = document.getElementById('radhyaCookieBanner');
            const modal = document.getElementById('propModal');
            const bannerVis = !!(banner && !banner.hidden && getComputedStyle(banner).display !== 'none' && banner.getBoundingClientRect().height > 0);
            const modalOpen = !!(modal && modal.classList.contains('open'));
            return {
              href: window.location.href,
              hasIntro: !!intro,
              bannerVis,
              modalOpen,
              dls: window.__radhyaDeepLinkState || null,
            };
          }).catch(() => null);

          if (snap) {
            if (snap.hasIntro) {
              sawIntroElement = true;
              if (snap.bannerVis) bannerSeenBeforeIntroEnd = true;
            }
            if (opts.expectModal && snap.modalOpen && snap.bannerVis) {
              // Wait for the 400ms .prop-modal opacity/translateY transition to settle before hit-testing & screenshot
              await page.waitForTimeout(450);
              break;
            }
            if (!opts.expectModal && !snap.hasIntro && Date.now() - pollStart > 6000) break;
            if (!opts.expectModal && opts.reducedMotion === 'reduce' && Date.now() - pollStart > 1500) break;
            if (opts.expectNoModal && !snap.hasIntro && snap.dls && snap.dls.timings.introEnd !== null) {
              // wait briefly for toast & URL cleanup
              await page.waitForTimeout(500);
              break;
            }
          }
          await page.waitForTimeout(150);
        }

        const final = await page.evaluate(() => {
          const modal = document.getElementById('propModal');
          const banner = document.getElementById('radhyaCookieBanner');
          const toast = document.getElementById('radhyaToast');
          const modalOpen = !!(modal && modal.classList.contains('open'));
          const bannerVis = !!(banner && !banner.hidden && getComputedStyle(banner).display !== 'none');
          let ctaClickable = null;
          let closeClickableBefore = null;
          let closeClickable = null;
          if (modalOpen) {
            const cta = modal.querySelector('.prop-modal__cta');
            const close = modal.querySelector('.prop-modal__close');
            if (close) {
              const r0 = close.getBoundingClientRect();
              const hit0 = document.elementFromPoint(r0.left + r0.width / 2, r0.top + r0.height / 2);
              closeClickableBefore = !!(hit0 && (hit0 === close || close.contains(hit0)));
            }
            if (cta) {
              cta.scrollIntoView({ block: 'center' });
              const r = cta.getBoundingClientRect();
              const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
              ctaClickable = !!(hit && (hit === cta || cta.contains(hit)));
            }
            if (close) {
              const r = close.getBoundingClientRect();
              const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
              closeClickable = !!(hit && (hit === close || close.contains(hit))) && closeClickableBefore;
            }
          }
          const firstMedia = modal?.querySelector('.prop-modal__fig img, .prop-modal__fig video');
          return {
            href: window.location.href,
            pathname: window.location.pathname,
            search: window.location.search,
            modalOpen,
            modalTitle: modal?.querySelector('.prop-modal__title')?.textContent?.trim() || '',
            modalPrice: modal?.querySelector('.prop-modal__price')?.textContent?.trim() || '',
            modalFirstMediaSrc: firstMedia ? firstMedia.getAttribute('src') : '',
            bannerVis,
            toastVisible: !!(toast && toast.classList.contains('is-visible')),
            toastText: toast?.textContent?.trim() || '',
            dls: window.__radhyaDeepLinkState || null,
            ctaClickable,
            closeClickable,
          };
        });

        await page.screenshot({ path: path.join(PROOF_DIR, `gate3-${name}.png`) });

        const scenarioRes = {
          url,
          finalHref: final.href,
          sawIntroElement,
          bannerSeenBeforeIntroEnd,
          timings: final.dls?.timings || null,
          introPlayed: final.dls?.introPlayed || false,
          modalOpen: final.modalOpen,
          modalTitle: final.modalTitle,
          modalPrice: final.modalPrice,
          modalFirstMediaSrc: final.modalFirstMediaSrc,
          bannerVis: final.bannerVis,
          ctaClickable: final.ctaClickable,
          closeClickable: final.closeClickable,
          toastText: final.toastText,
          errs,
          ok: true,
          errors: [],
        };

        if (errs.length) scenarioRes.errors.push(`Console errors: ${JSON.stringify(errs)}`);

        if (opts.expectEndPage && !final.pathname.endsWith('/' + opts.expectEndPage)) {
          scenarioRes.errors.push(`Expected end page ${opts.expectEndPage}, got ${final.pathname}`);
        }

        if (opts.expectIntroPlayed) {
          const t = final.dls?.timings;
          if (!t || !(t.introEnd > t.introStart)) {
            scenarioRes.errors.push(`Expected introEnd > introStart, got ${JSON.stringify(t)}`);
          }
          if (bannerSeenBeforeIntroEnd) {
            scenarioRes.errors.push('Cookie banner was visible BEFORE introEnd!');
          }
          if (t && t.bannerVisible !== null && t.introEnd !== null) {
            const delta = t.bannerVisible - t.introEnd;
            if (delta < -5 || delta > 1000) {
              scenarioRes.errors.push(`Cookie banner timing out of range: bannerVisible - introEnd = ${delta.toFixed(1)}ms`);
            }
          } else {
            scenarioRes.errors.push(`Missing bannerVisible/introEnd timestamps: ${JSON.stringify(t)}`);
          }
        }

        if (opts.expectModal) {
          if (!final.modalOpen) scenarioRes.errors.push('Expected #propModal to open');
          if (!final.bannerVis) scenarioRes.errors.push('Expected cookie banner to be visible');
          const t = final.dls?.timings;
          if (t && t.modalOpen !== null) {
            if (t.introEnd !== null && t.modalOpen < t.introEnd) {
              scenarioRes.errors.push(`modalOpen (${t.modalOpen}) happened BEFORE introEnd (${t.introEnd})`);
            }
            if (t.cardsLoaded !== null && t.modalOpen < t.cardsLoaded) {
              scenarioRes.errors.push(`modalOpen (${t.modalOpen}) happened BEFORE cardsLoaded (${t.cardsLoaded})`);
            }
          }
          if (opts.expectedCard) {
            if (final.modalTitle !== opts.expectedCard.title) {
              scenarioRes.errors.push(`Modal title mismatch: got "${final.modalTitle}", expected "${opts.expectedCard.title}"`);
            }
            if (final.modalPrice !== opts.expectedCard.priceText) {
              scenarioRes.errors.push(`Modal price mismatch: got "${final.modalPrice}", expected "${opts.expectedCard.priceText}"`);
            }
            const expectedSrc = opts.expectedCard.media[0].url;
            if (final.modalFirstMediaSrc !== expectedSrc) {
              scenarioRes.errors.push(`Modal media mismatch: got "${final.modalFirstMediaSrc}", expected "${expectedSrc}"`);
            }
          }
          if (final.ctaClickable === false || final.closeClickable === false) {
            scenarioRes.errors.push(`Cookie banner covered modal controls! ctaClickable=${final.ctaClickable}, closeClickable=${final.closeClickable}`);
          }

          // Test Q3: closing modal removes ?card= while keeping other params & hash
          if (opts.checkCloseUrlClean) {
            await page.keyboard.press('Escape');
            await page.waitForTimeout(300);
            const afterClose = await page.evaluate(() => ({
              open: document.getElementById('propModal')?.classList.contains('open'),
              search: window.location.search,
              hash: window.location.hash,
            }));
            if (afterClose.open) scenarioRes.errors.push('Escape did not close modal');
            if (afterClose.search.includes('card=')) scenarioRes.errors.push(`?card= not removed on close: ${afterClose.search}`);
            if (opts.expectedKeptParam && !afterClose.search.includes(opts.expectedKeptParam)) {
              scenarioRes.errors.push(`Other param lost on close: ${afterClose.search}`);
            }
            if (opts.expectedKeptHash && afterClose.hash !== opts.expectedKeptHash) {
              scenarioRes.errors.push(`Hash lost on close: ${afterClose.hash}`);
            }
          }
        }

        if (opts.expectNoModal) {
          if (final.modalOpen) scenarioRes.errors.push('Modal opened unexpectedly for deleted/invalid ID!');
          if (final.search.includes('card=')) scenarioRes.errors.push(`?card= was not stripped for invalid/deleted ID: ${final.search}`);
          if (!final.toastText.toLowerCase().includes('no longer available')) {
            scenarioRes.errors.push(`Expected unavailability toast, got "${final.toastText}"`);
          }
        }

        scenarioRes.ok = scenarioRes.errors.length === 0;
        if (!scenarioRes.ok) g3.failures.push(`${name}: ${scenarioRes.errors.join(' | ')}`);
        g3.scenarios[name] = scenarioRes;
        await ctx.close();
      }

      const reCard = testCardsByDiv.REAL_ESTATE;
      const loanCard = testCardsByDiv.LOAN;
      const insCard = testCardsByDiv.INSURANCE;
      const autoCard = testCardsByDiv.AUTO_MOTO;
      const renoCard = testCardsByDiv.RENOVATION;

      report.exampleUrls.indexRedirect = `${WEB_BASE}/index.html?card=${encodeURIComponent(renoCard.id)}`;

      await runDeepLinkScenario('real-estate-new-card', `${WEB_BASE}/real-estate.html?utm_source=wa&card=${encodeURIComponent(reCard.id)}#top`, {
        viewport: { width: 320, height: 700 },
        expectIntroPlayed: true,
        expectModal: true,
        expectEndPage: 'real-estate.html',
        expectedCard: reCard,
        checkCloseUrlClean: true,
        expectedKeptParam: 'utm_source=wa',
        expectedKeptHash: '#top',
      });

      await runDeepLinkScenario('loan-deep-link', `${WEB_BASE}/loan.html?card=${encodeURIComponent(loanCard.id)}`, {
        expectIntroPlayed: true,
        expectModal: true,
        expectEndPage: 'loan.html',
        expectedCard: loanCard,
      });

      await runDeepLinkScenario('insurance-deep-link', `${WEB_BASE}/insurance.html?card=${encodeURIComponent(insCard.id)}`, {
        expectIntroPlayed: true,
        expectModal: true,
        expectEndPage: 'insurance.html',
        expectedCard: insCard,
      });

      await runDeepLinkScenario('auto-moto-alias-redirect', `${WEB_BASE}/auto-moto.html?card=${encodeURIComponent(autoCard.id)}`, {
        expectIntroPlayed: true,
        expectModal: true,
        expectEndPage: 'vehicle-sale-purchase.html',
        expectedCard: autoCard,
      });

      await runDeepLinkScenario('index-redirect-to-renovation', `${WEB_BASE}/index.html?card=${encodeURIComponent(renoCard.id)}`, {
        expectIntroPlayed: true,
        expectModal: true,
        expectEndPage: 'renovation.html',
        expectedCard: renoCard,
      });

      await runDeepLinkScenario('wrong-role-page-redirect', `${WEB_BASE}/loan.html?card=${encodeURIComponent(reCard.id)}`, {
        expectIntroPlayed: false, // intro plays once on loan.html then redirects to real-estate.html with rr_intro=1
        expectModal: true,
        expectEndPage: 'real-estate.html',
        expectedCard: reCard,
      });

      await runDeepLinkScenario('deleted-card-id', `${WEB_BASE}/real-estate.html?card=__share_test_deleted_999`, {
        expectIntroPlayed: true,
        expectNoModal: true,
      });

      await runDeepLinkScenario('invalid-xss-card-id', `${WEB_BASE}/real-estate.html?card=%3Cscript%3Ealert(1)%3C%2Fscript%3E`, {
        expectIntroPlayed: true,
        expectNoModal: true,
      });

      await runDeepLinkScenario('reduced-motion', `${WEB_BASE}/real-estate.html?card=${encodeURIComponent(reCard.id)}`, {
        reducedMotion: 'reduce',
        expectIntroPlayed: false,
        expectModal: true,
        expectEndPage: 'real-estate.html',
        expectedCard: reCard,
      });

      g3.pass = g3.failures.length === 0;
      report.gates.GATE_3 = g3;
      console.log(`GATE 3 (Deep-Link Playback Order): ${g3.pass ? 'PASS' : 'FAIL'}`, g3.failures);
    }

    // =========================================================================
    // GATE 4 (Spacing across ALL 6 role pages) & GATE 5 (Social Icons)
    // =========================================================================
    {
      const baselineMetrics = JSON.parse(fs.readFileSync(path.join(BASELINE_DIR, 'metrics.json'), 'utf8'));
      const g4 = { pass: true, pages: {}, values: {}, failures: [] };
      const g5 = { pass: true, widths: {}, failures: [] };

      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => {
        sessionStorage.setItem('rr_intro', '1');
        localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
      });

      const spacingWidths = [320, 375, 390, 430, 640, 768, 1280, 1440];
      for (const rolePage of ROLE_6_PAGES) {
        await page.goto(`${WEB_BASE}/${rolePage}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);
        const pageVals = {};
        for (const w of spacingWidths) {
          await page.setViewportSize({ width: w, height: 900 });
          await page.waitForTimeout(160);
          const m = await page.evaluate(() => {
            const radhyaP = document.querySelector('.role-hero-left p.eyebrow');
            const h1 = document.querySelector('.role-hero-left h1');
            const heroLeft = document.querySelector('.role-hero-left');
            const searchBar = document.querySelector('#filterConsole');
            const rp = radhyaP.getBoundingClientRect();
            const h1r = h1.getBoundingClientRect();
            const hlr = heroLeft.getBoundingClientRect();
            const sb = searchBar.getBoundingClientRect();
            return {
              gapFromRadhyaP: +(sb.top - rp.bottom).toFixed(2),
              gapFromH1: +(sb.top - h1r.bottom).toFixed(2),
              gapFromHeroLeft: +(sb.top - hlr.bottom).toFixed(2),
              eyebrowMarginBottom: parseFloat(getComputedStyle(radhyaP).marginBottom),
              heroLeftHeight: +hlr.height.toFixed(2),
            };
          });
          const baseEntry = baselineMetrics.website[rolePage]?.[w];
          pageVals[w] = {
            ...m,
            baselineGapFromRadhyaP: baseEntry ? baseEntry.gapFromRadhyaP : null,
          };
          if (rolePage === 'real-estate.html' && (w === 375 || w === 1440)) {
            await page.screenshot({ path: path.join(PROOF_DIR, `gate4-real-estate-w${w}.png`), fullPage: false });
          }
        }
        g4.pages[rolePage] = pageVals;
        if (rolePage === 'real-estate.html') g4.values = pageVals;

        // Check 1280 & 1440 match baseline (±1px)
        for (const dw of [1280, 1440]) {
          const baseGap = baselineMetrics.website[rolePage]?.[dw]?.gapFromRadhyaP;
          const currGap = pageVals[dw].gapFromRadhyaP;
          if (typeof baseGap === 'number' && Math.abs(currGap - baseGap) > 1) {
            g4.failures.push(`${rolePage} Desktop w=${dw} GAP drifted: baseline=${baseGap}, current=${currGap}`);
          }
        }
        // Check mobile (320..768) stack gap matches desktop 19.2px vertical rhythm (±4px) and zero 520px void
        const desktopRhythm = pageVals[1440].eyebrowMarginBottom; // 19.2px
        for (const mw of [320, 375, 390, 430, 640, 768]) {
          const stackGap = pageVals[mw].gapFromHeroLeft;
          const h1Gap = pageVals[mw].gapFromH1;
          if (Math.abs(stackGap - desktopRhythm) > 4 || Math.abs(h1Gap - desktopRhythm) > 4) {
            g4.failures.push(`${rolePage} Mobile w=${mw} stack gap out of ±4px of ${desktopRhythm}px: heroLeftGap=${stackGap}, h1Gap=${h1Gap}`);
          }
          if (pageVals[mw].heroLeftHeight > 260) {
            g4.failures.push(`${rolePage} Mobile w=${mw} heroLeftHeight still inflated: ${pageVals[mw].heroLeftHeight}px`);
          }
        }
      }
      g4.desktopBaselineGap = baselineMetrics.website['real-estate.html'][1440].gapFromRadhyaP;
      g4.desktopVerticalRhythmPx = g4.values[1440].eyebrowMarginBottom;
      g4.pass = g4.failures.length === 0;
      report.gates.GATE_4 = g4;
      console.log(`GATE 4 (Spacing - all 6 role pages): ${g4.pass ? 'PASS' : 'FAIL'}`, g4.failures);

      // Gate 5 — Social icons at 320, 375, 768, 1280, 1440, 1920 (back on real-estate.html)
      await page.goto(`${WEB_BASE}/real-estate.html`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const socialWidths = [320, 375, 768, 1280, 1440, 1920];
      for (const w of socialWidths) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.waitForTimeout(200);
        const s = await page.evaluate(() => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const links = Array.from(document.querySelectorAll('.social a'));
          const boxes = links.map(a => {
            const r = a.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const hit = document.elementFromPoint(cx, cy);
            return {
              label: a.getAttribute('aria-label'),
              left: +r.left.toFixed(2),
              right: +r.right.toFixed(2),
              top: +r.top.toFixed(2),
              bottom: +r.bottom.toFixed(2),
              width: +r.width.toFixed(2),
              height: +r.height.toFixed(2),
              opacity: parseFloat(getComputedStyle(a).opacity),
              inViewport: r.left >= -0.5 && r.right <= vw + 0.5 && r.top >= -0.5 && r.bottom <= vh + 0.5,
              hitIsSelf: !!(hit && (hit === a || a.contains(hit))),
            };
          });
          const gaps = [];
          let overlap = false;
          for (let i = 1; i < boxes.length; i++) {
            const gap = +(boxes[i].left - boxes[i - 1].right).toFixed(2);
            gaps.push(gap);
            if (gap < -0.5) overlap = true;
          }
          const brand = document.querySelector('.brand')?.getBoundingClientRect();
          const brandOverlap = !!(brand && boxes.some(b => brand.right > b.left + 0.5 && brand.left < b.right - 0.5 && brand.bottom > b.top && brand.top < b.bottom));
          const maxGap = gaps.length ? Math.max(...gaps) : 0;
          const minGap = gaps.length ? Math.min(...gaps) : 0;
          return { count: boxes.length, boxes, gaps, gapSpread: +(maxGap - minGap).toFixed(2), overlap, brandOverlap };
        });

        g5.widths[w] = { count: s.count, size: s.boxes[0] ? `${s.boxes[0].width}x${s.boxes[0].height}` : 'none', gaps: s.gaps, gapSpread: s.gapSpread, overlap: s.overlap, brandOverlap: s.brandOverlap };

        if (s.count !== 4) g5.failures.push(`w=${w}: expected 4 social icons, got ${s.count}`);
        if (s.overlap) g5.failures.push(`w=${w}: social icons overlap`);
        if (s.brandOverlap) g5.failures.push(`w=${w}: .brand overlaps .social`);
        if (s.gapSpread > 1.1) g5.failures.push(`w=${w}: uneven social gaps ${JSON.stringify(s.gaps)}`);
        for (const b of s.boxes) {
          if (b.opacity <= 0) g5.failures.push(`w=${w}: ${b.label} opacity=${b.opacity}`);
          if (!b.inViewport) g5.failures.push(`w=${w}: ${b.label} outside viewport (${b.left}..${b.right})`);
          if (!b.hitIsSelf) g5.failures.push(`w=${w}: elementFromPoint missed ${b.label}`);
          if (w <= 768 && (b.width < 43.9 || b.height < 43.9)) {
            g5.failures.push(`w=${w}: ${b.label} tap area ${b.width}x${b.height} < 44x44`);
          }
        }
        if (w === 320 || w === 375) {
          await page.screenshot({ path: path.join(PROOF_DIR, `gate5-header-w${w}.png`), clip: { x: 0, y: 0, width: w, height: 120 } });
        }
      }
      await ctx.close();
      g5.pass = g5.failures.length === 0;
      report.gates.GATE_5 = g5;
      console.log(`GATE 5 (Social Icons): ${g5.pass ? 'PASS' : 'FAIL'}`, g5.failures);
    }

    // =========================================================================
    // GATE 6 — Live Resize Stability (Website: all 7 pages, 1440->375->768->1280->320->1920)
    // =========================================================================
    {
      const g6 = { pass: true, pages: {}, failures: [] };
      const resizeSeq = [1440, 375, 768, 1280, 320, 1920];

      for (const pageFile of ALL_7_PAGES) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await page.addInitScript(() => {
          sessionStorage.setItem('rr_intro', '1');
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
        });
        const errs = [];
        page.on('pageerror', e => errs.push(e.message));
        page.on('console', m => { if (m.type() === 'error' && !m.text().includes('favicon')) errs.push(m.text()); });

        await page.goto(`${WEB_BASE}/${pageFile}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);

        const stepResults = [];
        for (const w of resizeSeq) {
          await page.setViewportSize({ width: w, height: 800 });
          await page.waitForTimeout(180);
          const r = await page.evaluate(() => {
            const vw = window.innerWidth;
            const sw = document.documentElement.scrollWidth;
            const offenders = [];
            document.querySelectorAll('header, main, section, footer, .prop-card, .card, .contact-list p, .top-search-filter-bar, .social a').forEach(el => {
              if (el.closest('[data-scroll-x]') || el.closest('.dreams-layer') || el.closest('.prop-slider__track')) return;
              const style = getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return;
              const rect = el.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) return;
              if (rect.right > vw + 1.5 || rect.left < -1.5) {
                offenders.push(`${el.tagName}.${(el.className || '').toString().slice(0, 30)}(${rect.left.toFixed(0)}..${rect.right.toFixed(0)}/${vw})`);
              }
            });
            return { w: vw, sw, overflow: sw > vw, offenders: offenders.slice(0, 5) };
          });
          stepResults.push(r);
          if (r.overflow) g6.failures.push(`${pageFile}@${w}: scrollWidth ${r.sw} > innerWidth ${r.w}`);
          if (r.offenders.length) g6.failures.push(`${pageFile}@${w}: edge offenders ${r.offenders.join(', ')}`);
        }

        // Open modal check at 320px on role pages
        if (pageFile !== 'index.html') {
          await page.setViewportSize({ width: 320, height: 700 });
          await page.waitForTimeout(150);
          const moreBtn = page.locator('.service-dropdown-item.open .prop-card__more').first();
          await moreBtn.click();
          await page.waitForTimeout(300);
          const modalCheck = await page.evaluate(() => {
            const box = document.querySelector('#propModal .prop-modal__box');
            const close = document.querySelector('#propModal .prop-modal__close');
            if (!box || !close) return { ok: false };
            const br = box.getBoundingClientRect();
            const cr = close.getBoundingClientRect();
            return {
              ok: br.left >= -1 && br.right <= window.innerWidth + 1 && br.height <= window.innerHeight * 0.90 && cr.top >= 0 && cr.right <= window.innerWidth + 1,
              boxH: +br.height.toFixed(1),
              vh: window.innerHeight,
              boxRight: +br.right.toFixed(1),
            };
          });
          if (!modalCheck.ok) g6.failures.push(`${pageFile}@320 modal out of bounds: ${JSON.stringify(modalCheck)}`);
          await page.keyboard.press('Escape');
        }

        if (errs.length) g6.failures.push(`${pageFile}: console errors ${JSON.stringify(errs)}`);
        g6.pages[pageFile] = { steps: stepResults.length, errs: errs.length };
        await ctx.close();
      }
      g6.pass = g6.failures.length === 0;
      report.gates.GATE_6_WEBSITE = g6;
      console.log(`GATE 6 (Website Resize): ${g6.pass ? 'PASS' : 'FAIL'}`, g6.failures);
    }

    // =========================================================================
    // GATE 7 — UI Preserved (ALL 70 Website Baseline Screenshots + Git Diff & Zero-Purple Check)
    // =========================================================================
    {
      const g7 = { pass: true, totalBaselineCompared: 0, maxDiffPct: 0, pixelChecks: {}, purpleMatches: [], diffStats: {}, failures: [] };
      const ALL_10_WIDTHS = [320, 375, 390, 430, 640, 768, 1024, 1280, 1440, 1920];
      const compareConfigs = ALL_7_PAGES.map(p => ({ page: p, widths: ALL_10_WIDTHS }));

      // Delete temporary test cards BEFORE pixel-comparing against baseline so card counts match baseline!
      for (const id of createdTestCardIds) {
        await httpJson(`${CRM_LOCAL}/api/v1/cms/cards/${encodeURIComponent(id)}`, {
          method: 'DELETE',
          headers: { 'X-Radhya-Webhook-Token': WEBHOOK_TOKEN },
        });
      }
      createdTestCardIds.length = 0;

      const tmpShotDir = path.join(PROOF_DIR, 'gate7-shots');
      fs.mkdirSync(tmpShotDir, { recursive: true });

      for (const cfg of compareConfigs) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await page.addInitScript(() => {
          sessionStorage.setItem('rr_intro', '1');
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
        });
        await page.goto(`${WEB_BASE}/${cfg.page}`, { waitUntil: 'load', timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(700);

        for (const w of cfg.widths) {
          await page.setViewportSize({ width: w, height: 900 });
          await page.waitForTimeout(220);
          const slug = cfg.page.replace('.html', '');
          const currShot = (w === 375 || w === 1440)
            ? path.join(PROOF_DIR, `gate7-${slug}-w${w}.png`)
            : path.join(tmpShotDir, `${slug}-w${w}.png`);
          await page.screenshot({ path: currShot, fullPage: true });

          // Collect masks ONLY for allowed regions: .prop-card__share, mobile header (<=768), fixed mobile role-hero-header gap (<=768), 320px contact wrap fix, dreams-showcase moving marquee
          const layoutMeta = await page.evaluate(w => {
            const rects = [];
            const add = el => {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.height > 0) {
                rects.push({
                  x: Math.max(0, Math.floor(r.left + window.scrollX) - 2),
                  y: Math.max(0, Math.floor(r.top + window.scrollY) - 2),
                  w: Math.ceil(r.width) + 4,
                  h: Math.ceil(r.height) + 4,
                });
              }
            };
            document.querySelectorAll('.prop-card__share').forEach(add);
            if (w <= 768) {
              document.querySelectorAll('.site-header, .role-hero-header').forEach(add);
            }
            if (w <= 360) {
              document.querySelectorAll('#contact, .contact-list').forEach(add);
            }
            document.querySelectorAll('.dreams-showcase, .sc-cloud').forEach(add);
            const heroHeader = document.querySelector('.role-hero-header');
            const heroBottom = heroHeader ? Math.ceil(heroHeader.getBoundingClientRect().bottom + window.scrollY) + 4 : null;
            const contactSec = document.getElementById('contact');
            const contactBottom = contactSec ? Math.ceil(contactSec.getBoundingClientRect().bottom + window.scrollY) + 2 : null;
            return { rects, heroBottom, contactBottom };
          }, w);

          const baseShot = path.join(BASELINE_DIR, 'website', slug, `w${w}.png`);
          // For role pages at <= 768px where removing the 520px mobile gap reduced document height by dy,
          // OR index.html@320 where fixing 371px->320px overflow wrapped #contact and shifted footer by dy,
          // compare every pixel below the fixed section aligned by dy = baselineHeight - currentHeight!
          let shiftInfo = null;
          if ((w <= 768 && layoutMeta.heroBottom !== null) || (w <= 360 && layoutMeta.contactBottom !== null)) {
            const sizes = await page.evaluate(async ({ b64A, b64B }) => {
              const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i.height); i.src = 'data:image/png;base64,' + s; });
              return { hA: await load(b64A), hB: await load(b64B) };
            }, { b64A: fs.readFileSync(baseShot).toString('base64'), b64B: fs.readFileSync(currShot).toString('base64') });
            const dy = sizes.hA - sizes.hB;
            if (Math.abs(dy) > 10) {
              shiftInfo = {
                splitY: layoutMeta.heroBottom !== null ? layoutMeta.heroBottom : layoutMeta.contactBottom,
                dy,
              };
            }
          }

          const cmp = await pixelComparePng(page, baseShot, currShot, layoutMeta.rects, shiftInfo);
          const key = `${cfg.page}@${w}`;
          g7.totalBaselineCompared++;
          if (cmp.diffPct > g7.maxDiffPct) g7.maxDiffPct = cmp.diffPct;
          g7.pixelChecks[key] = cmp;
          if (cmp.diffPct > 0.1) {
            g7.failures.push(`Pixel diff ${key}: ${cmp.diffPct}% > 0.1% (${cmp.diffPixels}/${cmp.totalChecked} px, dy=${cmp.dyApplied})`);
          }
        }
        await ctx.close();
      }

      // Git diff stat + zero-forbidden-hue check across BOTH repos (all production files; exclude test regex definition itself)
      const webDiff = execSync(`cd "${WEB_DIR}" && git diff main..HEAD -- . ':!tests'`, { encoding: 'utf8' });
      const crmDiff = execSync(`cd "${CRM_DIR}" && git diff main..HEAD -- . ':!frontend/tests'`, { encoding: 'utf8' });
      g7.diffStats.website = execSync(`cd "${WEB_DIR}" && git diff --stat main..HEAD`, { encoding: 'utf8' }).trim();
      g7.diffStats.crm = execSync(`cd "${CRM_DIR}" && git diff --stat main..HEAD`, { encoding: 'utf8' }).trim();

      const purpleRe = /\b(purple|violet|indigo)\b|#8b5cf6|#7c3aed/gi;
      const addedLines = (webDiff + '\n' + crmDiff)
        .split('\n')
        .filter(l => l.startsWith('+') && !l.startsWith('+++'));
      for (const line of addedLines) {
        if (purpleRe.test(line)) {
          g7.purpleMatches.push(line.slice(0, 120));
        }
      }
      if (g7.purpleMatches.length) g7.failures.push(`Purple color detected in diff: ${JSON.stringify(g7.purpleMatches)}`);

      g7.pass = g7.failures.length === 0;
      report.gates.GATE_7 = g7;
      console.log(`GATE 7 (UI Preserved & Diff Hygiene): ${g7.pass ? 'PASS' : 'FAIL'}`, g7.failures);
    }

    // =========================================================================
    // GATE 8 (Data Hygiene Check — Zero __share_test_ cards remaining on Render & Local)
    // =========================================================================
    {
      const [localCards, renderCards] = await Promise.all([
        httpJson(`${CRM_LOCAL}/api/v1/public/cards`),
        httpJson(`${CRM_RENDER}/api/v1/public/cards`),
      ]);
      const localLeftover = (localCards.data?.cards || []).filter(c => (c.title || '').includes('__share_test_') || (c.id || '').includes('sharetest'));
      const renderLeftover = (renderCards.data?.cards || []).filter(c => (c.title || '').includes('__share_test_') || (c.id || '').includes('sharetest'));
      report.gates.GATE_8_HYGIENE = {
        pass: localLeftover.length === 0 && renderLeftover.length === 0,
        localCardCount: (localCards.data?.cards || []).length,
        renderCardCount: (renderCards.data?.cards || []).length,
        localLeftover: localLeftover.length,
        renderLeftover: renderLeftover.length,
      };
      console.log('GATE 8 (Data Hygiene):', report.gates.GATE_8_HYGIENE);
    }
  } finally {
    // Guaranteed cleanup even if an assertion throws
    for (const id of createdTestCardIds) {
      try {
        await httpJson(`${CRM_LOCAL}/api/v1/cms/cards/${encodeURIComponent(id)}`, {
          method: 'DELETE',
          headers: { 'X-Radhya-Webhook-Token': WEBHOOK_TOKEN },
        });
      } catch {}
    }
    await browser.close();
  }

  const outFile = path.join(PROOF_DIR, 'website-report.json');
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log('\nSaved website proof report to:', outFile);

  const failedGates = Object.entries(report.gates).filter(([, v]) => !v.pass).map(([k]) => k);
  if (failedGates.length > 0) {
    console.error('FAILED WEBSITE GATES:', failedGates);
    process.exit(1);
  }
  console.log('ALL WEBSITE GATES PASSED!');
})().catch(e => {
  console.error('FATAL TEST ERROR:', e);
  process.exit(1);
});
