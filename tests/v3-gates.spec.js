/**
 * Radhya Realty v3 Locked Website Gate Suite
 * Covers Gates 1, 2, 4, 5, 6, 7 (Website), 8 (Website Pixel + Diff + Deploy Hygiene)
 * Engines: Chromium (12-viewport full matrix) + WebKit (5-viewport iOS matrix)
 */
const { chromium, webkit } = require('playwright');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
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

const WEB_BASE = (process.env.WEB_BASE || 'http://localhost:5500').replace(/\/+$/, '');
const IS_LIVE_BASE = !WEB_BASE.includes('localhost') && !WEB_BASE.includes('127.0.0.1');
const CRM_LOCAL = 'http://localhost:3000';
const CRM_RENDER = 'https://radhya-crm.onrender.com';

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
const CANONICAL_5_PAGES = ['real-estate.html', 'renovation.html', 'loan.html', 'vehicle-sale-purchase.html', 'insurance.html'];

const CHROMIUM_MATRIX = [
  { key: '320x568', width: 320, height: 568, mobile: true },
  { key: '375x667', width: 375, height: 667, mobile: true },
  { key: '390x844', width: 390, height: 844, mobile: true },
  { key: '430x932', width: 430, height: 932, mobile: true },
  { key: '640x900', width: 640, height: 900, mobile: true },
  { key: '768x1024', width: 768, height: 1024, mobile: true },
  { key: '1024x768', width: 1024, height: 768, mobile: false },
  { key: '1280x800', width: 1280, height: 800, mobile: false },
  { key: '1440x900', width: 1440, height: 900, mobile: false },
  { key: '1920x1080', width: 1920, height: 1080, mobile: false },
  { key: '667x375', width: 667, height: 375, mobile: true },
  { key: '844x390', width: 844, height: 390, mobile: true },
];

const WEBKIT_MATRIX = [
  { key: '320x568', width: 320, height: 568, mobile: true },
  { key: '375x667', width: 375, height: 667, mobile: true },
  { key: '390x844', width: 390, height: 844, mobile: true },
  { key: '844x390', width: 844, height: 390, mobile: true },
  { key: '768x1024', width: 768, height: 1024, mobile: true },
];

function httpJson(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, { method: 'GET' }, res => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, text: data }); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function makeCtxOpts(engineName, vp, extra = {}) {
  return {
    viewport: { width: vp.width, height: vp.height },
    serviceWorkers: 'block',
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    deviceScaleFactor: vp.mobile ? 2 : 1,
    ...(engineName === 'chromium' ? { permissions: ['clipboard-read', 'clipboard-write'] } : {}),
    ...extra,
  };
}

async function waitForPageReady(page, opts = {}) {
  const timeout = opts.timeout || 12000;
  await page.evaluate(async t => {
    try { await document.fonts.ready; } catch {}
    const waitEventOrFlag = (flagFn, evtName, ms) => new Promise(resolve => {
      if (flagFn()) return resolve();
      const timer = setTimeout(resolve, ms);
      window.addEventListener(evtName, () => { clearTimeout(timer); resolve(); }, { once: true });
    });
    await waitEventOrFlag(
      () => document.documentElement.dataset.introState === 'done',
      'radhya:intro-end',
      t
    );
    if (window.__radhyaIntroDone) {
      try { await Promise.race([window.__radhyaIntroDone, new Promise(r => setTimeout(r, 2000))]); } catch {}
    }
    await waitEventOrFlag(
      () => !!window.__radhyaCardsReadyResolved,
      'radhya:cards-ready',
      5000
    );
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, timeout);
}

function attachErrorListeners(page, errs) {
  page.on('pageerror', e => errs.push(`pageerror: ${e.message}`));
  page.on('console', m => {
    if (m.type() === 'error') {
      const txt = m.text();
      if (!txt.includes('favicon')) errs.push(`console.error: ${txt}`);
    }
  });
}

function pixelCompareWithPixelmatch(basePath, currPath, masks = [], shiftInfo = null) {
  const imgA = PNG.sync.read(fs.readFileSync(basePath));
  const imgB = PNG.sync.read(fs.readFileSync(currPath));
  const w = Math.min(imgA.width, imgB.width);
  const hA = imgA.height;
  const hB = imgB.height;
  const hCmp = Math.min(hA, hB);

  const bufA = Buffer.alloc(w * hCmp * 4);
  const bufB = Buffer.alloc(w * hCmp * 4);

  const splitY = shiftInfo ? shiftInfo.splitY : Infinity;
  const dy = shiftInfo ? shiftInfo.dy : 0;

  let maskedPixels = 0;
  for (let y = 0; y < hCmp; y++) {
    const useShift = y >= splitY && dy !== 0;
    const yA = useShift ? y + dy : y;
    for (let x = 0; x < w; x++) {
      let isMasked = false;
      for (let m = 0; m < masks.length; m++) {
        const b = masks[m];
        if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
          isMasked = true;
          break;
        }
      }
      const dstIdx = (y * w + x) * 4;
      if (isMasked || yA < 0 || yA >= hA) {
        maskedPixels++;
        bufA[dstIdx] = bufB[dstIdx] = 0;
        bufA[dstIdx + 1] = bufB[dstIdx + 1] = 0;
        bufA[dstIdx + 2] = bufB[dstIdx + 2] = 0;
        bufA[dstIdx + 3] = bufB[dstIdx + 3] = 255;
        continue;
      }
      const idxB = (y * imgB.width + x) * 4;
      let bestYA = yA;
      if (useShift) {
        let bestD = Infinity;
        for (const off of [-2, -1, 0, 1, 2]) {
          const yy = yA + off;
          if (yy < 0 || yy >= hA) continue;
          const idxA = (yy * imgA.width + x) * 4;
          const d = Math.abs(imgA.data[idxA] - imgB.data[idxB])
            + Math.abs(imgA.data[idxA + 1] - imgB.data[idxB + 1])
            + Math.abs(imgA.data[idxA + 2] - imgB.data[idxB + 2]);
          if (d < bestD) { bestD = d; bestYA = yy; }
        }
      }
      const idxA = (bestYA * imgA.width + x) * 4;
      bufA[dstIdx] = imgA.data[idxA];
      bufA[dstIdx + 1] = imgA.data[idxA + 1];
      bufA[dstIdx + 2] = imgA.data[idxA + 2];
      bufA[dstIdx + 3] = 255;
      bufB[dstIdx] = imgB.data[idxB];
      bufB[dstIdx + 1] = imgB.data[idxB + 1];
      bufB[dstIdx + 2] = imgB.data[idxB + 2];
      bufB[dstIdx + 3] = 255;
    }
  }

  const diffPixels = pixelmatch(bufA, bufB, null, w, hCmp, { threshold: 0.15, includeAA: false });
  const totalChecked = Math.max(1, w * hCmp - maskedPixels);
  return {
    widthA: imgA.width,
    heightA: hA,
    widthB: imgB.width,
    heightB: hB,
    dyApplied: dy,
    diffPixels,
    totalChecked,
    diffPct: +((diffPixels / totalChecked) * 100).toFixed(4),
  };
}

(async () => {
  const baselineMetrics = fs.existsSync(path.join(BASELINE_DIR, 'metrics.json'))
    ? JSON.parse(fs.readFileSync(path.join(BASELINE_DIR, 'metrics.json'), 'utf8'))
    : null;

  const report = {
    cycle: CYCLE,
    baseUrl: WEB_BASE,
    timestamp: new Date().toISOString(),
    gates: {
      GATE_1: { pass: true, matrix: { chromium: {}, webkit: {} }, failures: [] },
      GATE_2: { pass: true, pages: {}, checks: {}, failures: [] },
      GATE_4: { pass: true, scenarios: {}, failures: [] },
      GATE_5: { pass: true, scenarios: {}, failures: [] },
      GATE_6: { pass: true, matrix: { chromium: {}, webkit: {} }, failures: [] },
      GATE_7_WEBSITE: { pass: true, matrix: { chromium: {}, webkit: {} }, liveResize: {}, failures: [] },
      GATE_8_WEBSITE: { pass: true, pixelChecks: {}, totalBaselineCompared: 0, maxDiffPct: 0, purpleMatches: [], deployExclusionsOk: false, failures: [] },
    },
    exampleUrls: {},
  };

  const browsers = {
    chromium: await chromium.launch({ headless: true }),
    webkit: await webkit.launch({ headless: true }),
  };

  try {
    // =========================================================================
    // GATES 1 (Gap Parity), 6 (Social Icons), 7-Matrix (Overflow + Edge + Errors),
    // and 8-Pixel (Baseline comparison) across ALL 7 pages × Chromium(12) + WebKit(5)
    // =========================================================================
    const g8ShotDir = path.join(PROOF_DIR, 'gate8-web');
    fs.mkdirSync(g8ShotDir, { recursive: true });

    for (const [engineName, matrix] of [['chromium', CHROMIUM_MATRIX], ['webkit', WEBKIT_MATRIX]]) {
      const browser = browsers[engineName];
      for (const pageFile of ALL_7_PAGES) {
        const slug = pageFile.replace('.html', '');
        const isRole = ROLE_6_PAGES.includes(pageFile);
        if (isRole) report.gates.GATE_1.matrix[engineName][pageFile] = {};
        report.gates.GATE_6.matrix[engineName][pageFile] = {};
        report.gates.GATE_7_WEBSITE.matrix[engineName][pageFile] = {};

        for (const vp of matrix) {
          const ctx = await browser.newContext(makeCtxOpts(engineName, vp, { reducedMotion: 'reduce' }));
          const page = await ctx.newPage();
          const errs = [];
          attachErrorListeners(page, errs);
          // Pre-set cookie consent for layout/gap/social/pixel matrix (Gate 5 tests fresh unconsented intro->cookie)
          await page.addInitScript(() => {
            localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
          });

          await page.goto(`${WEB_BASE}/${pageFile}`, { waitUntil: 'load', timeout: 45000 });
          await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
          await waitForPageReady(page);

          // Gate 1 + Gate 6 + Gate 7 measurements
          const meas = await page.evaluate(vpWidth => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const sw = document.documentElement.scrollWidth;

            // Gate 1: Gap
            let gap = null;
            const heroHeader = document.querySelector('.role-hero-header');
            const heroLeft = document.querySelector('.role-hero-left');
            const eyebrow = document.querySelector('.role-hero-left p.eyebrow');
            const h1 = document.querySelector('.role-hero-left h1');
            const searchBar = document.querySelector('#filterConsole');
            if (heroHeader && heroLeft && eyebrow && h1 && searchBar) {
              const er = eyebrow.getBoundingClientRect();
              const h1r = h1.getBoundingClientRect();
              const hlr = heroLeft.getBoundingClientRect();
              const sr = searchBar.getBoundingClientRect();
              const nonEmpty = Array.from(heroLeft.children).filter(el => {
                const st = getComputedStyle(el);
                return st.display !== 'none' && (el.textContent || '').trim().length > 0 && el.getBoundingClientRect().height > 0;
              });
              const lastChild = nonEmpty[nonEmpty.length - 1] || h1;
              const lcr = lastChild.getBoundingClientRect();
              gap = {
                flexDirection: getComputedStyle(heroHeader).flexDirection,
                eyebrowToH1: +(h1r.top - er.bottom).toFixed(2),
                deadSpaceInsideHeroLeft: +(hlr.bottom - lcr.bottom).toFixed(2),
                heroLeftToSearch: +(sr.top - hlr.bottom).toFixed(2),
                gapFromRadhyaP: +(sr.top - er.bottom).toFixed(2),
                sideBySide: sr.left > hlr.left + 100 && Math.abs(sr.top - hlr.top) < 60,
              };
            }

            // Gate 6: Social icons
            const socialLinks = Array.from(document.querySelectorAll('.social a'));
            const socialBoxes = socialLinks.map(a => {
              const r = a.getBoundingClientRect();
              const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
              return {
                label: a.getAttribute('aria-label'),
                left: +r.left.toFixed(2),
                right: +r.right.toFixed(2),
                top: +r.top.toFixed(2),
                bottom: +r.bottom.toFixed(2),
                w: +r.width.toFixed(2),
                h: +r.height.toFixed(2),
                opacity: parseFloat(getComputedStyle(a).opacity),
                inViewport: r.left >= -0.5 && r.right <= vw + 0.5 && r.top >= -0.5 && r.bottom <= vh + 0.5,
                hitIsSelf: !!(hit && (hit === a || a.contains(hit))),
              };
            });
            const gaps = [];
            let socialOverlap = false;
            for (let i = 1; i < socialBoxes.length; i++) {
              const g = +(socialBoxes[i].left - socialBoxes[i - 1].right).toFixed(2);
              gaps.push(g);
              if (g < -0.5) socialOverlap = true;
            }
            const brandR = document.querySelector('.brand')?.getBoundingClientRect();
            const menuR = document.querySelector('.menu-btn')?.getBoundingClientRect();
            const hitBox = (a, b) => !!(a && b && a.right > b.left + 0.5 && a.left < b.right - 0.5 && a.bottom > b.top + 0.5 && a.top < b.bottom - 0.5);
            const brandOverlap = !!(brandR && socialBoxes.some(b => hitBox(brandR, b)));
            const menuOverlap = !!(menuR && socialBoxes.some(b => hitBox(menuR, b)));

            // Gate 7: Edge offenders scan
            const offenders = [];
            document.querySelectorAll('header, main, section, footer, .prop-card, .card, .contact-list p, .top-search-filter-bar, .social a').forEach(el => {
              if (el.closest('[data-scroll-x]') || el.closest('.dreams-layer') || el.closest('.prop-slider__track')) return;
              const st = getComputedStyle(el);
              if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) return;
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) return;
              if (r.right > vw + 1.5 || r.left < -1.5) {
                offenders.push(`${el.tagName}.${(el.className || '').toString().slice(0, 28)}(${r.left.toFixed(0)}..${r.right.toFixed(0)}/${vw})`);
              }
            });

            // Masks for Gate 8 pixel comparison
            const dpr = window.devicePixelRatio || 1;
            const masks = [];
            const addMask = el => {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.height > 0) {
                masks.push({
                  x: Math.max(0, Math.floor((r.left + window.scrollX - 3) * dpr)),
                  y: Math.max(0, Math.floor((r.top + window.scrollY - 3) * dpr)),
                  w: Math.ceil((r.width + 6) * dpr),
                  h: Math.ceil((r.height + 6) * dpr),
                });
              }
            };
            document.querySelectorAll('.card-share-btn, .prop-card__share, .social, .prop-slider, .dreams-showcase, .sc-cloud').forEach(addMask);
            if (vpWidth <= 1024) {
              document.querySelectorAll('.role-hero-header, .site-header').forEach(addMask);
            }
            const heroH = document.querySelector('.role-hero-header');
            const heroBottomPx = heroH ? Math.ceil((heroH.getBoundingClientRect().bottom + window.scrollY + 4) * dpr) : null;

            return {
              vw, vh, sw, overflowX: sw > vw, offenders: offenders.slice(0, 5),
              gap,
              social: {
                count: socialBoxes.length,
                boxes: socialBoxes,
                gaps,
                gapSpread: gaps.length ? +(Math.max(...gaps) - Math.min(...gaps)).toFixed(2) : 0,
                socialOverlap,
                brandOverlap,
                menuOverlap,
              },
              masks,
              heroBottomPx,
            };
          }, vp.width);

          // Check focus-visible ring on first social link on representative viewports (375, 1440)
          let socialFocusRingOk = true;
          if (vp.key === '375x667' || vp.key === '1440x900') {
            socialFocusRingOk = await page.evaluate(() => {
              const a = document.querySelector('.social a');
              if (!a) return false;
              // Simulate keyboard focus via focus({ focusVisible: true }) fallback check on stylesheet rules
              a.focus();
              const rules = Array.from(document.styleSheets).flatMap(s => {
                try { return Array.from(s.cssRules || []); } catch { return []; }
              });
              const hasFocusVisibleRule = rules.some(r => r.selectorText && r.selectorText.includes('.social a:focus-visible'));
              return hasFocusVisibleRule;
            });
            if (!socialFocusRingOk) {
              report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: missing .social a:focus-visible ring CSS rule`);
            }
          }

          // Evaluate Gate 1
          if (isRole && meas.gap) {
            const g = meas.gap;
            const baseG = baselineMetrics?.website?.[engineName]?.[pageFile]?.[vp.key]?.gap || null;
            report.gates.GATE_1.matrix[engineName][pageFile][vp.key] = {
              baseline: baseG ? { eyebrowToH1: baseG.eyebrowToH1, deadSpaceInsideHeroLeft: baseG.deadSpaceInsideHeroLeft, heroLeftToSearch: baseG.heroLeftToSearch, gapFromRadhyaP: baseG.gapFromRadhyaP } : null,
              now: g,
            };
            if (g.eyebrowToH1 > 24) {
              report.gates.GATE_1.failures.push(`${engineName} ${pageFile}@${vp.key}: eyebrowToH1=${g.eyebrowToH1}px > 24px`);
            }
            if (g.deadSpaceInsideHeroLeft > 8) {
              report.gates.GATE_1.failures.push(`${engineName} ${pageFile}@${vp.key}: deadSpaceInsideHeroLeft=${g.deadSpaceInsideHeroLeft}px > 8px`);
            }
            if (vp.width <= 840) {
              if (g.flexDirection !== 'column' || g.heroLeftToSearch < 8 || g.heroLeftToSearch > 24) {
                report.gates.GATE_1.failures.push(`${engineName} ${pageFile}@${vp.key}: stacked heroLeftToSearch=${g.heroLeftToSearch}px (dir=${g.flexDirection}) outside 8..24px`);
              }
            }
            if (vp.width >= 1280) {
              if (!g.sideBySide) {
                report.gates.GATE_1.failures.push(`${engineName} ${pageFile}@${vp.key}: desktop #filterConsole not aligned beside .role-hero-left`);
              }
              if (baseG && Math.abs(g.gapFromRadhyaP - baseG.gapFromRadhyaP) > 1) {
                report.gates.GATE_1.failures.push(`${engineName} ${pageFile}@${vp.key}: desktop gapFromRadhyaP drifted (base=${baseG.gapFromRadhyaP}, now=${g.gapFromRadhyaP})`);
              }
            }
            if (pageFile === 'real-estate.html' && (vp.key === '375x667' || vp.key === '1440x900')) {
              await page.screenshot({ path: path.join(PROOF_DIR, `gate1-${engineName}-real-estate-${vp.key}.png`) });
            }
          }

          // Evaluate Gate 6 (Social)
          const s = meas.social;
          report.gates.GATE_6.matrix[engineName][pageFile][vp.key] = {
            count: s.count,
            size: s.boxes[0] ? `${s.boxes[0].w}x${s.boxes[0].h}` : 'none',
            gaps: s.gaps,
            gapSpread: s.gapSpread,
            overlap: s.socialOverlap || s.brandOverlap || s.menuOverlap,
            focusRingOk: socialFocusRingOk,
          };
          if (s.count !== 4) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: expected 4 social icons, got ${s.count}`);
          if (s.socialOverlap) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: social icons overlap`);
          if (s.brandOverlap) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: .brand overlaps .social`);
          if (s.menuOverlap) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: .menu-btn overlaps .social`);
          if (s.gapSpread > 1.1) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: uneven social gaps ${JSON.stringify(s.gaps)}`);
          for (const b of s.boxes) {
            if (b.opacity <= 0) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: ${b.label} opacity=${b.opacity}`);
            if (!b.inViewport) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: ${b.label} outside viewport`);
            if (!b.hitIsSelf) report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: elementFromPoint missed ${b.label}`);
            if (vp.width <= 768 && (b.w < 43.9 || b.h < 43.9)) {
              report.gates.GATE_6.failures.push(`${engineName} ${pageFile}@${vp.key}: ${b.label} tap area ${b.w}x${b.h} < 44x44`);
            }
          }
          if (pageFile === 'real-estate.html' && (vp.key === '320x568' || vp.key === '375x667')) {
            await page.screenshot({ path: path.join(PROOF_DIR, `gate6-${engineName}-header-${vp.key}.png`), clip: { x: 0, y: 0, width: vp.width, height: 110 } });
          }

          // Evaluate Gate 7-Matrix
          report.gates.GATE_7_WEBSITE.matrix[engineName][pageFile][vp.key] = {
            vw: meas.vw, sw: meas.sw, overflowX: meas.overflowX, offenders: meas.offenders.length, errs: errs.length,
          };
          if (meas.overflowX) report.gates.GATE_7_WEBSITE.failures.push(`${engineName} ${pageFile}@${vp.key}: scrollWidth ${meas.sw} > innerWidth ${meas.vw}`);
          if (meas.offenders.length) report.gates.GATE_7_WEBSITE.failures.push(`${engineName} ${pageFile}@${vp.key}: edge offenders ${meas.offenders.join(', ')}`);
          if (errs.length) report.gates.GATE_7_WEBSITE.failures.push(`${engineName} ${pageFile}@${vp.key}: ${errs.join(' | ')}`);

          // Evaluate Gate 8-Pixel (only on local runs where baseline exists)
          if (!IS_LIVE_BASE) {
            const baseShot = path.join(BASELINE_DIR, 'website', engineName, slug, `${vp.key}.png`);
            if (fs.existsSync(baseShot)) {
              const currShot = path.join(g8ShotDir, `${engineName}-${slug}-${vp.key}.png`);
              await page.screenshot({ path: currShot, fullPage: true });
              let shiftInfo = null;
              if (vp.width <= 1024 && meas.heroBottomPx !== null) {
                const pngA = PNG.sync.read(fs.readFileSync(baseShot));
                const pngB = PNG.sync.read(fs.readFileSync(currShot));
                const dy = pngA.height - pngB.height;
                if (Math.abs(dy) > 4) shiftInfo = { splitY: meas.heroBottomPx, dy };
              }
              const cmp = pixelCompareWithPixelmatch(baseShot, currShot, meas.masks, shiftInfo);
              const k = `${engineName}:${pageFile}@${vp.key}`;
              report.gates.GATE_8_WEBSITE.totalBaselineCompared++;
              if (cmp.diffPct > report.gates.GATE_8_WEBSITE.maxDiffPct) report.gates.GATE_8_WEBSITE.maxDiffPct = cmp.diffPct;
              report.gates.GATE_8_WEBSITE.pixelChecks[k] = { diffPct: cmp.diffPct, dy: cmp.dyApplied };
              if (cmp.diffPct > 1.5) {
                report.gates.GATE_8_WEBSITE.failures.push(`Pixel diff ${k}: ${cmp.diffPct}% > 1.5% (${cmp.diffPixels}/${cmp.totalChecked} px)`);
              }
            }
          }

          await ctx.close();
        }
      }
    }
    console.log(`GATE 1 (Gap Parity): ${report.gates.GATE_1.failures.length === 0 ? 'PASS' : 'FAIL'}`, report.gates.GATE_1.failures.slice(0, 5));
    console.log(`GATE 6 (Social Icons): ${report.gates.GATE_6.failures.length === 0 ? 'PASS' : 'FAIL'}`, report.gates.GATE_6.failures.slice(0, 5));

    // =========================================================================
    // GATE 2 — Website Share (.card-share-btn, filter/category/API refresh,
    // unique URLs, mobile navigator.share, desktop clipboard + toast, Tab+Enter, CLS = 0)
    // =========================================================================
    {
      const g2 = report.gates.GATE_2;
      const allUrls = new Set();
      const urlRe = /^https?:\/\/[^/]+\/(real-estate|renovation|loan|vehicle-sale-purchase|insurance)\.html\?card=([^&]+)$/;

      for (const pageFile of ALL_7_PAGES) {
        const ctx = await browsers.chromium.newContext(makeCtxOpts('chromium', { width: 375, height: 667, mobile: true }, { reducedMotion: 'reduce' }));
        const page = await ctx.newPage();
        const errs = [];
        attachErrorListeners(page, errs);
        await page.addInitScript(() => {
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
          window.__clsEntries = [];
          try {
            new PerformanceObserver(list => {
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) window.__clsEntries.push({ value: entry.value, sources: (entry.sources || []).map(s => s.node?.className || '') });
              }
            }).observe({ type: 'layout-shift', buffered: true });
          } catch {}
        });

        await page.goto(`${WEB_BASE}/${pageFile}`, { waitUntil: 'load', timeout: 45000 });
        await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
        await waitForPageReady(page);

        const inspectShare = () => page.evaluate(() => {
          const allCards = Array.from(document.querySelectorAll('.prop-card'));
          const visCards = allCards.filter(c => {
            const r = c.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && getComputedStyle(c).display !== 'none';
          });
          const visBtns = Array.from(document.querySelectorAll('.prop-card .card-share-btn')).filter(b => {
            const r = b.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && getComputedStyle(b).opacity !== '0';
          });
          const allBtns = Array.from(document.querySelectorAll('.prop-card .card-share-btn'));
          const ids = allCards.map(c => c.dataset.cardId || '');
          const urls = allBtns.map(b => ({ id: b.dataset.cardId || '', url: b.dataset.shareUrl || '' }));
          const taps = visBtns.map(b => {
            const r = b.getBoundingClientRect();
            return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), type: b.type, aria: b.getAttribute('aria-label') };
          });
          const cardCls = (window.__clsEntries || []).filter(e => e.sources.some(s => String(s).includes('prop-card'))).reduce((a, b) => a + b.value, 0);
          return { totalCards: allCards.length, totalBtns: allBtns.length, visCards: visCards.length, visBtns: visBtns.length, ids, urls, taps, cardCls };
        });

        const s1 = await inspectShare();
        if (s1.totalCards !== s1.totalBtns) g2.failures.push(`${pageFile}: totalCards(${s1.totalCards}) !== .card-share-btn(${s1.totalBtns})`);
        if (s1.visCards !== s1.visBtns) g2.failures.push(`${pageFile}: visibleCards(${s1.visCards}) !== visible .card-share-btn(${s1.visBtns})`);
        const dupes = s1.ids.filter((id, i) => !id || s1.ids.indexOf(id) !== i);
        if (dupes.length) g2.failures.push(`${pageFile}: duplicate/empty card IDs ${JSON.stringify(dupes.slice(0, 3))}`);
        for (const u of s1.urls) {
          const m = u.url.match(urlRe);
          if (!m || decodeURIComponent(m[2]) !== u.id) {
            g2.failures.push(`${pageFile}: bad share URL "${u.url}" for id "${u.id}"`);
          }
          if (pageFile !== 'auto-moto.html') {
            if (allUrls.has(u.url)) g2.failures.push(`Cross-page duplicate share URL: ${u.url}`);
            allUrls.add(u.url);
          }
        }
        if (s1.urls[0]) report.exampleUrls[pageFile] = s1.urls[0].url;
        const badTaps = s1.taps.filter(t => t.w < 43.9 || t.h < 43.9 || t.type !== 'button' || !t.aria?.startsWith('Share '));
        if (badTaps.length) g2.failures.push(`${pageFile}: invalid share tap/attrs at 375px: ${JSON.stringify(badTaps[0])}`);
        if (s1.cardCls > 0.001) g2.failures.push(`${pageFile}: card CLS = ${s1.cardCls} > 0`);

        // After changing category & filter AND triggering API refresh on role pages
        if (ROLE_6_PAGES.includes(pageFile)) {
          const secondHeader = page.locator('.service-dropdown-item').nth(1).locator('.service-toggle, .service-dropdown-header, h2, h3').first();
          if (await secondHeader.isVisible().catch(() => false)) {
            await secondHeader.click();
            await page.waitForTimeout(300);
          }
          const sCat = await inspectShare();
          if (sCat.visCards !== sCat.visBtns || sCat.visBtns === 0) {
            g2.failures.push(`${pageFile}: after category change visCards(${sCat.visCards}) !== visBtns(${sCat.visBtns})`);
          }
          // Trigger API refresh via window.rebindInteractiveCards()
          await page.evaluate(() => { if (typeof window.rebindInteractiveCards === 'function') window.rebindInteractiveCards(); });
          await page.waitForTimeout(250);
          const sRef = await inspectShare();
          if (sRef.visCards !== sRef.visBtns) {
            g2.failures.push(`${pageFile}: after API refresh visCards(${sRef.visCards}) !== visBtns(${sRef.visBtns})`);
          }
        }
        if (errs.length) g2.failures.push(`${pageFile}: ${errs.join(' | ')}`);
        g2.pages[pageFile] = { totalCards: s1.totalCards, totalBtns: s1.totalBtns, cardCls: s1.cardCls };
        await ctx.close();
      }

      // Mobile navigator.share test (375px)
      {
        const ctx = await browsers.chromium.newContext(makeCtxOpts('chromium', { width: 375, height: 667, mobile: true }, { reducedMotion: 'reduce' }));
        const page = await ctx.newPage();
        await page.addInitScript(() => {
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
          window.__sharePayload = null;
          Object.defineProperty(navigator, 'share', {
            configurable: true,
            value: async p => { window.__sharePayload = p; },
          });
        });
        await page.goto(`${WEB_BASE}/real-estate.html`, { waitUntil: 'load', timeout: 45000 });
        await waitForPageReady(page);
        const btn = page.locator('.service-dropdown-item.open .prop-card .card-share-btn').first();
        if (await btn.count() === 0) {
          g2.failures.push('Mobile share test: no .card-share-btn found');
        } else {
          const expectedUrl = await btn.getAttribute('data-share-url');
          await btn.click();
          await page.waitForTimeout(250);
          const modalCount = await page.locator('#propModal.open').count();
          const payload = await page.evaluate(() => window.__sharePayload);
          g2.checks.mobileShare = { modalCount, payload };
          if (modalCount !== 0) g2.failures.push('Mobile share click opened modal');
          if (!payload || payload.url !== expectedUrl || !String(payload.text || '').includes('Radhya Realty')) {
            g2.failures.push(`Mobile navigator.share invalid payload: ${JSON.stringify(payload)} expected ${expectedUrl}`);
          }
        }
        await ctx.close();
      }

      // Desktop clipboard + "Product link copied" toast + Tab/Enter keyboard accessibility
      {
        const ctx = await browsers.chromium.newContext(makeCtxOpts('chromium', { width: 1280, height: 800, mobile: false }, { reducedMotion: 'reduce' }));
        const page = await ctx.newPage();
        await page.addInitScript(() => {
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
          Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
        });
        await page.goto(`${WEB_BASE}/vehicle-sale-purchase.html`, { waitUntil: 'load', timeout: 45000 });
        await waitForPageReady(page);
        const btn = page.locator('.service-dropdown-item.open .prop-card .card-share-btn').first();
        if (await btn.count() === 0) {
          g2.failures.push('Desktop keyboard share test: no .card-share-btn found');
        } else {
          const expectedUrl = await btn.getAttribute('data-share-url');
          await btn.focus();
          await page.keyboard.press('Enter');
          await page.waitForTimeout(300);
          const modalCount = await page.locator('#propModal.open').count();
          const clip = await page.evaluate(() => navigator.clipboard.readText());
          const toastText = await page.locator('#radhyaToast.is-visible').innerText().catch(() => '');
          g2.checks.desktopKeyboardShare = { modalCount, clip, toastText };
          if (modalCount !== 0) g2.failures.push('Keyboard Enter on .card-share-btn opened modal');
          if (clip !== expectedUrl) g2.failures.push(`Desktop clipboard mismatch: "${clip}" !== "${expectedUrl}"`);
          if (!toastText.toLowerCase().includes('product link copied')) {
            g2.failures.push(`Expected toast "Product link copied", got "${toastText}"`);
          }
        }
        await page.screenshot({ path: path.join(PROOF_DIR, 'gate2-desktop-share-toast.png') });
        await ctx.close();
      }
      console.log(`GATE 2 (Website Share): ${g2.failures.length === 0 ? 'PASS' : 'FAIL'}`, g2.failures.slice(0, 5));
    }

    // =========================================================================
    // GATE 4 — Exact Card Opens (Chromium 375 & 1440 + WebKit 375)
    // =========================================================================
    {
      const g4 = report.gates.GATE_4;
      const cardsRes = await httpJson(`${IS_LIVE_BASE ? CRM_RENDER : CRM_LOCAL}/api/v1/public/cards`);
      const allApiCards = cardsRes.data?.cards || [];
      const findCard = (div, spaceIdx = 0) => allApiCards.find(c => c.division === div && Number(c.spaceIndex) === spaceIdx) || allApiCards.find(c => c.division === div);

      const reCard0 = findCard('REAL_ESTATE', 0);
      const reCardCollapsed = findCard('REAL_ESTATE', 1);
      const renoCard = findCard('RENOVATION', 0);
      const loanCard = findCard('LOAN', 0);
      const vehCard = findCard('AUTO_MOTO', 0);
      const insCard = findCard('INSURANCE', 0);

      report.exampleUrls.indexRedirect = `${WEB_BASE}/index.html?card=${encodeURIComponent(renoCard.id)}`;
      report.exampleUrls.autoMotoRedirect = `${WEB_BASE}/auto-moto.html?card=${encodeURIComponent(vehCard.id)}`;

      async function runGate4Scenario(engineName, vp, name, url, opts) {
        const ctx = await browsers[engineName].newContext(makeCtxOpts(engineName, vp, { reducedMotion: opts.reducedMotion || 'no-preference' }));
        const page = await ctx.newPage();
        const errs = [];
        attachErrorListeners(page, errs);

        let introStartCount = 0;
        await page.exposeFunction('__onIntroStartTrack', () => { introStartCount++; });
        await page.addInitScript(filterQuery => {
          window.addEventListener('radhya:intro-start', () => window.__onIntroStartTrack());
          window.__g4Events = {};
          for (const ev of ['radhya:intro-start', 'radhya:intro-end', 'radhya:cards-ready', 'radhya:deeplink-opened']) {
            window.addEventListener(ev, () => { window.__g4Events[ev] = performance.now(); });
          }
          if (filterQuery) {
            document.addEventListener('DOMContentLoaded', () => {
              setTimeout(() => {
                const inp = document.getElementById('tsfSearchInput');
                if (inp) {
                  inp.value = filterQuery;
                  inp.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }, 80);
            });
          }
        }, opts.preFilterQuery || '');

        await page.goto(url, { waitUntil: 'load', timeout: 45000 });
        await waitForPageReady(page, { timeout: 14000 });
        if (opts.expectModal) {
          await page.waitForSelector('#propModal.open', { timeout: 8000 }).catch(() => {});
          await page.waitForTimeout(450);
        } else {
          await page.waitForTimeout(700);
        }

        const st = await page.evaluate(() => {
          const modal = document.getElementById('propModal');
          const modalOpen = !!(modal && modal.classList.contains('open'));
          const firstMedia = modal?.querySelector('.prop-modal__fig img, .prop-modal__fig video');
          const activeInsideModal = !!(modal && document.activeElement && modal.contains(document.activeElement));
          const toast = document.getElementById('radhyaToast');
          return {
            href: window.location.href,
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            historyLen: window.history.length,
            modalOpen,
            title: modal?.querySelector('.prop-modal__title')?.textContent?.trim() || '',
            price: modal?.querySelector('.prop-modal__price')?.textContent?.trim() || '',
            firstMediaSrc: firstMedia ? firstMedia.getAttribute('src') : '',
            activeInsideModal,
            events: window.__g4Events || {},
            dls: window.__radhyaDeepLinkState || null,
            toastText: toast?.textContent?.trim() || '',
          };
        });

        const scErrs = [...errs];
        if (opts.expectEndPage && !st.pathname.endsWith('/' + opts.expectEndPage)) {
          scErrs.push(`Expected ${opts.expectEndPage}, got ${st.pathname}`);
        }
        if (opts.expectSingleIntro && introStartCount !== 1) {
          scErrs.push(`Expected intro played once (1), got ${introStartCount}`);
        }
        if (opts.expectModal) {
          if (!st.modalOpen) scErrs.push('Modal did not open');
          if (!st.events['radhya:deeplink-opened']) scErrs.push('radhya:deeplink-opened not dispatched');
          if (opts.card) {
            if (st.title !== opts.card.title) scErrs.push(`Title mismatch: "${st.title}" !== "${opts.card.title}"`);
            if (opts.card.priceText && st.price !== opts.card.priceText) scErrs.push(`Price mismatch: "${st.price}" !== "${opts.card.priceText}"`);
            const expSrc = opts.card.media?.[0]?.url || '';
            if (expSrc && st.firstMediaSrc !== expSrc) scErrs.push(`Media mismatch: "${st.firstMediaSrc}" !== "${expSrc}"`);
          }
          if (!st.activeInsideModal) scErrs.push('Focus did not move into #propModal');
          const tEnd = st.events['radhya:intro-end'] ?? st.dls?.timings?.introEnd;
          const tOpen = st.events['radhya:deeplink-opened'] ?? st.dls?.timings?.modalOpen;
          if (typeof tEnd === 'number' && typeof tOpen === 'number') {
            if (tOpen < tEnd) scErrs.push(`modalOpen(${tOpen}) < introEnd(${tEnd})`);
            if (tOpen - tEnd > 1500) scErrs.push(`Warm modal open lag ${(tOpen - tEnd).toFixed(0)}ms > 1500ms`);
          }
          if (opts.checkCloseQ3) {
            const histBefore = st.historyLen;
            // Test Tab focus trap inside modal
            await page.keyboard.press('Tab');
            const stillInModal = await page.evaluate(() => {
              const m = document.getElementById('propModal');
              return !!(m && document.activeElement && m.contains(document.activeElement));
            });
            if (!stillInModal) scErrs.push('Tab escaped #propModal focus trap');
            await page.keyboard.press('Escape');
            await page.waitForTimeout(300);
            const after = await page.evaluate(() => ({
              open: document.getElementById('propModal')?.classList.contains('open'),
              search: window.location.search,
              hash: window.location.hash,
              historyLen: window.history.length,
            }));
            if (after.open) scErrs.push('Escape did not close modal');
            if (after.search.includes('card=')) scErrs.push(`?card= not removed on close: ${after.search}`);
            if (opts.keepParam && !after.search.includes(opts.keepParam)) scErrs.push(`Other param lost: ${after.search}`);
            if (opts.keepHash && after.hash !== opts.keepHash) scErrs.push(`Hash lost: ${after.hash}`);
            if (after.historyLen !== histBefore) scErrs.push(`history.length changed (${histBefore} -> ${after.historyLen})`);
          }
        }
        if (opts.expectNoModal) {
          if (st.modalOpen) scErrs.push('Modal opened unexpectedly');
          if (st.search.includes('card=')) scErrs.push(`?card= not removed: ${st.search}`);
          if (!st.toastText.toLowerCase().includes('no longer available')) scErrs.push(`Missing toast, got "${st.toastText}"`);
        }

        if (name === 'chromium-375-real-estate-collapsed' || name === 'webkit-375-auto-moto') {
          await page.screenshot({ path: path.join(PROOF_DIR, `gate4-${name}.png`) });
        }

        g4.scenarios[name] = { ok: scErrs.length === 0, introStartCount, finalHref: st.href, modalOpen: st.modalOpen, errs: scErrs };
        if (scErrs.length) g4.failures.push(`${name}: ${scErrs.join(' | ')}`);
        await ctx.close();
      }

      const vp375 = { width: 375, height: 667, mobile: true };
      const vp1440 = { width: 1440, height: 900, mobile: false };

      // 1 card per canonical role page + collapsed + filter-hidden + index + auto-moto + wrong-role + deleted + invalid
      await runGate4Scenario('chromium', vp375, 'chromium-375-real-estate', `${WEB_BASE}/real-estate.html?utm_source=wa&card=${encodeURIComponent(reCard0.id)}#details`, { expectModal: true, expectEndPage: 'real-estate.html', expectSingleIntro: true, card: reCard0, checkCloseQ3: true, keepParam: 'utm_source=wa', keepHash: '#details' });
      await runGate4Scenario('chromium', vp375, 'chromium-375-real-estate-collapsed', `${WEB_BASE}/real-estate.html?card=${encodeURIComponent(reCardCollapsed.id)}`, { expectModal: true, expectEndPage: 'real-estate.html', expectSingleIntro: true, card: reCardCollapsed });
      await runGate4Scenario('chromium', vp375, 'chromium-375-filter-hidden', `${WEB_BASE}/real-estate.html?card=${encodeURIComponent(reCard0.id)}`, { expectModal: true, expectEndPage: 'real-estate.html', card: reCard0, preFilterQuery: 'zzzz_no_match_filter_999' });
      await runGate4Scenario('chromium', vp375, 'chromium-375-renovation', `${WEB_BASE}/renovation.html?card=${encodeURIComponent(renoCard.id)}`, { expectModal: true, expectEndPage: 'renovation.html', card: renoCard });
      await runGate4Scenario('chromium', vp375, 'chromium-375-loan', `${WEB_BASE}/loan.html?card=${encodeURIComponent(loanCard.id)}`, { expectModal: true, expectEndPage: 'loan.html', card: loanCard });
      await runGate4Scenario('chromium', vp375, 'chromium-375-vehicle', `${WEB_BASE}/vehicle-sale-purchase.html?card=${encodeURIComponent(vehCard.id)}`, { expectModal: true, expectEndPage: 'vehicle-sale-purchase.html', card: vehCard });
      await runGate4Scenario('chromium', vp375, 'chromium-375-insurance', `${WEB_BASE}/insurance.html?card=${encodeURIComponent(insCard.id)}`, { expectModal: true, expectEndPage: 'insurance.html', card: insCard });
      await runGate4Scenario('chromium', vp375, 'chromium-375-index-redirect', `${WEB_BASE}/index.html?card=${encodeURIComponent(renoCard.id)}`, { expectModal: true, expectEndPage: 'renovation.html', expectSingleIntro: true, card: renoCard });
      await runGate4Scenario('chromium', vp375, 'chromium-375-auto-moto', `${WEB_BASE}/auto-moto.html?card=${encodeURIComponent(vehCard.id)}`, { expectModal: true, expectEndPage: 'vehicle-sale-purchase.html', expectSingleIntro: true, card: vehCard });
      await runGate4Scenario('chromium', vp375, 'chromium-375-wrong-role', `${WEB_BASE}/loan.html?card=${encodeURIComponent(reCard0.id)}`, { expectModal: true, expectEndPage: 'real-estate.html', expectSingleIntro: true, card: reCard0 });
      await runGate4Scenario('chromium', vp375, 'chromium-375-deleted', `${WEB_BASE}/real-estate.html?card=__share_test_deleted_v3`, { expectNoModal: true });
      await runGate4Scenario('chromium', vp375, 'chromium-375-invalid', `${WEB_BASE}/real-estate.html?card=%3Cscript%3Ex`, { expectNoModal: true });
      await runGate4Scenario('chromium', vp1440, 'chromium-1440-real-estate', `${WEB_BASE}/real-estate.html?card=${encodeURIComponent(reCardCollapsed.id)}`, { expectModal: true, expectEndPage: 'real-estate.html', card: reCardCollapsed, checkCloseQ3: true });
      await runGate4Scenario('webkit', vp375, 'webkit-375-real-estate', `${WEB_BASE}/real-estate.html?card=${encodeURIComponent(reCard0.id)}`, { expectModal: true, expectEndPage: 'real-estate.html', expectSingleIntro: true, card: reCard0, checkCloseQ3: true });
      await runGate4Scenario('webkit', vp375, 'webkit-375-auto-moto', `${WEB_BASE}/auto-moto.html?card=${encodeURIComponent(vehCard.id)}`, { expectModal: true, expectEndPage: 'vehicle-sale-purchase.html', expectSingleIntro: true, card: vehCard });
      await runGate4Scenario('webkit', vp375, 'webkit-375-index-redirect', `${WEB_BASE}/index.html?card=${encodeURIComponent(insCard.id)}`, { expectModal: true, expectEndPage: 'insurance.html', expectSingleIntro: true, card: insCard });

      console.log(`GATE 4 (Exact Card Opens): ${g4.failures.length === 0 ? 'PASS' : 'FAIL'}`, g4.failures.slice(0, 5));
    }

    // =========================================================================
    // GATE 5 — Intro -> Cookies Order (ALL 7 pages + 3 ?card= links, both engines,
    // repeat visit, internal link click, reducedMotion, already-consented)
    // =========================================================================
    {
      const g5 = report.gates.GATE_5;
      const cardsRes = await httpJson(`${IS_LIVE_BASE ? CRM_RENDER : CRM_LOCAL}/api/v1/public/cards`);
      const allApiCards = cardsRes.data?.cards || [];
      const reCard = allApiCards.find(c => c.division === 'REAL_ESTATE');
      const loanCard = allApiCards.find(c => c.division === 'LOAN');
      const insCard = allApiCards.find(c => c.division === 'INSURANCE');

      const samplerInit = () => {
        window.__g5 = {
          introStart: null,
          introEnd: null,
          modalOpen: null,
          bannerFirstVisible: null,
          bannerVisibleBeforeIntroEndFrames: 0,
        };
        window.addEventListener('radhya:intro-start', () => {
          if (window.__g5.introStart === null) window.__g5.introStart = performance.now();
        });
        window.addEventListener('radhya:intro-end', () => {
          if (window.__g5.introEnd === null) window.__g5.introEnd = performance.now();
        });
        window.addEventListener('radhya:deeplink-opened', () => {
          if (window.__g5.modalOpen === null) window.__g5.modalOpen = performance.now();
        });
        function sample() {
          const b = document.getElementById('radhyaCookieBanner');
          const visible = !!(b && !b.hidden && b.offsetParent !== null && parseFloat(getComputedStyle(b).opacity) > 0 && b.getBoundingClientRect().height > 0);
          if (visible) {
            if (window.__g5.bannerFirstVisible === null) window.__g5.bannerFirstVisible = performance.now();
            if (window.__g5.introEnd === null || document.documentElement.dataset.introState !== 'done') {
              window.__g5.bannerVisibleBeforeIntroEndFrames++;
            }
          }
          requestAnimationFrame(sample);
        }
        requestAnimationFrame(sample);
      };

      async function checkIntroCookiePage(engineName, vp, name, url, opts = {}) {
        const ctx = await browsers[engineName].newContext(makeCtxOpts(engineName, vp, { reducedMotion: opts.reducedMotion || 'no-preference' }));
        const page = await ctx.newPage();
        const errs = [];
        attachErrorListeners(page, errs);
        await page.addInitScript(samplerInit);
        if (opts.preConsented) {
          await page.addInitScript(() => {
            localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'all' }));
          });
        }

        await page.goto(url, { waitUntil: 'load', timeout: 45000 });
        await waitForPageReady(page, { timeout: 14000 });
        if (opts.isDeepLink) {
          await page.waitForSelector('#propModal.open', { timeout: 6000 }).catch(() => {});
        }
        await page.waitForTimeout(550);

        const res = await page.evaluate(isDeepLink => {
          const g = window.__g5;
          const b = document.getElementById('radhyaCookieBanner');
          const accept = document.getElementById('btnAcceptAllCookies');
          const ess = document.getElementById('btnEssentialCookies');
          const hitCheck = el => {
            if (!el) return false;
            const r = el.getBoundingClientRect();
            if (r.width <= 0 || r.height <= 0) return false;
            const h = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return !!(h && (h === el || el.contains(h)));
          };
          let modalCloseOk = null;
          let modalCtaOk = null;
          if (isDeepLink) {
            const m = document.getElementById('propModal');
            const close = m?.querySelector('.prop-modal__close');
            const cta = m?.querySelector('.prop-modal__cta');
            modalCloseOk = hitCheck(close);
            if (cta) { cta.scrollIntoView({ block: 'center' }); modalCtaOk = hitCheck(cta); }
            modalCloseOk = modalCloseOk && hitCheck(close);
          }
          return {
            introState: document.documentElement.dataset.introState || null,
            ...g,
            bannerExistsVisible: !!(b && !b.hidden && b.offsetParent !== null && parseFloat(getComputedStyle(b).opacity) > 0),
            acceptClickable: hitCheck(accept),
            essentialClickable: hitCheck(ess),
            modalCloseOk,
            modalCtaOk,
          };
        }, !!opts.isDeepLink);

        const scErrs = [...errs];
        if (res.introState !== 'done') scErrs.push(`introState="${res.introState}" !== "done"`);
        if (res.introStart === null || res.introEnd === null || !(res.introEnd > res.introStart)) {
          scErrs.push(`Intro did not run properly: start=${res.introStart}, end=${res.introEnd}`);
        }
        if (res.bannerVisibleBeforeIntroEndFrames > 0) {
          scErrs.push(`Banner visible BEFORE introEnd for ${res.bannerVisibleBeforeIntroEndFrames} frames`);
        }
        if (opts.preConsented) {
          if (res.bannerExistsVisible) scErrs.push('Banner showed even though consent was already saved');
        } else {
          if (!res.bannerExistsVisible || res.bannerFirstVisible === null) {
            scErrs.push('Banner did not appear after introEnd');
          } else {
            const lag = res.bannerFirstVisible - res.introEnd;
            if (lag < -20 || lag > 1000) scErrs.push(`Banner lag ${lag.toFixed(1)}ms outside 0..1000ms`);
          }
          if (!opts.isDeepLink) {
            if (!res.acceptClickable || !res.essentialClickable) {
              scErrs.push(`Cookie buttons not clickable: accept=${res.acceptClickable}, essential=${res.essentialClickable}`);
            }
          }
        }
        if (opts.isDeepLink) {
          if (res.modalOpen === null || res.modalOpen <= res.introEnd) {
            scErrs.push(`modalOpen(${res.modalOpen}) did not occur strictly after introEnd(${res.introEnd})`);
          }
          if (!res.modalCloseOk || !res.modalCtaOk) {
            scErrs.push(`Modal controls covered at ${vp.width}px: close=${res.modalCloseOk}, cta=${res.modalCtaOk}`);
          }
        }

        g5.scenarios[name] = { ok: scErrs.length === 0, ...res, errs: scErrs };
        if (scErrs.length) g5.failures.push(`${name}: ${scErrs.join(' | ')}`);

        // Second visit in SAME context -> intro plays again!
        if (opts.checkSecondVisit) {
          await page.goto(url, { waitUntil: 'load', timeout: 45000 });
          await waitForPageReady(page, { timeout: 14000 });
          const res2 = await page.evaluate(() => window.__g5);
          if (!(res2.introEnd > res2.introStart)) {
            g5.failures.push(`${name}-second-visit: intro did NOT play again on 2nd visit (${JSON.stringify(res2)})`);
          }
          if (res2.bannerVisibleBeforeIntroEndFrames > 0) {
            g5.failures.push(`${name}-second-visit: banner flashed before introEnd`);
          }
        }

        // Internal link click (index -> real-estate) -> intro plays & banner order kept
        if (opts.checkInternalNav) {
          await page.click('#btnAcceptAllCookies').catch(() => {});
          await page.evaluate(() => localStorage.removeItem('radhya_cookie_consent_v1'));
          await page.locator('main a[href="real-estate.html"]').first().click();
          await page.waitForURL(/real-estate\.html/, { timeout: 15000 });
          await waitForPageReady(page, { timeout: 14000 });
          await page.waitForTimeout(450);
          const resNav = await page.evaluate(() => window.__g5);
          if (!(resNav.introEnd > resNav.introStart)) {
            g5.failures.push(`${name}-internal-nav: intro did NOT play after index->real-estate click`);
          }
          if (resNav.bannerVisibleBeforeIntroEndFrames > 0 || resNav.bannerFirstVisible === null) {
            g5.failures.push(`${name}-internal-nav: banner order failed (${JSON.stringify(resNav)})`);
          }
        }

        await ctx.close();
      }

      const vp375 = { width: 375, height: 667, mobile: true };
      const vp320 = { width: 320, height: 568, mobile: true };

      for (const eng of ['chromium', 'webkit']) {
        for (const pageFile of ALL_7_PAGES) {
          await checkIntroCookiePage(eng, vp375, `${eng}-${pageFile}`, `${WEB_BASE}/${pageFile}`, {
            checkSecondVisit: pageFile === 'real-estate.html',
            checkInternalNav: pageFile === 'index.html',
          });
        }
        await checkIntroCookiePage(eng, vp320, `${eng}-deeplink-re-320`, `${WEB_BASE}/real-estate.html?card=${encodeURIComponent(reCard.id)}`, { isDeepLink: true });
        await checkIntroCookiePage(eng, vp375, `${eng}-deeplink-loan`, `${WEB_BASE}/loan.html?card=${encodeURIComponent(loanCard.id)}`, { isDeepLink: true });
        await checkIntroCookiePage(eng, vp375, `${eng}-deeplink-ins`, `${WEB_BASE}/insurance.html?card=${encodeURIComponent(insCard.id)}`, { isDeepLink: true });
        await checkIntroCookiePage(eng, vp375, `${eng}-reduced-motion`, `${WEB_BASE}/real-estate.html?card=${encodeURIComponent(reCard.id)}`, { isDeepLink: true, reducedMotion: 'reduce' });
        await checkIntroCookiePage(eng, vp375, `${eng}-pre-consented`, `${WEB_BASE}/real-estate.html`, { preConsented: true });
      }
      console.log(`GATE 5 (Intro -> Cookies Order): ${g5.failures.length === 0 ? 'PASS' : 'FAIL'}`, g5.failures.slice(0, 5));
    }

    // =========================================================================
    // GATE 7 — Live Resize Sequence (1440->375->768->1280->320->1920->844x390) + Open Modal Bounds
    // =========================================================================
    {
      const g7 = report.gates.GATE_7_WEBSITE;
      const resizeSeq = [
        { width: 1440, height: 900 },
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1280, height: 800 },
        { width: 320, height: 568 },
        { width: 1920, height: 1080 },
        { width: 844, height: 390 },
      ];
      for (const pageFile of ALL_7_PAGES) {
        const ctx = await browsers.chromium.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
        const page = await ctx.newPage();
        const errs = [];
        attachErrorListeners(page, errs);
        await page.addInitScript(() => {
          localStorage.setItem('radhya_cookie_consent_v1', JSON.stringify({ consented: true, tier: 'essential' }));
        });
        await page.goto(`${WEB_BASE}/${pageFile}`, { waitUntil: 'load', timeout: 45000 });
        await waitForPageReady(page);
        for (const step of resizeSeq) {
          await page.setViewportSize(step);
          await page.waitForTimeout(160);
          const ov = await page.evaluate(() => ({ vw: window.innerWidth, sw: document.documentElement.scrollWidth }));
          if (ov.sw > ov.vw) g7.failures.push(`liveResize ${pageFile}@${step.width}x${step.height}: sw=${ov.sw} > vw=${ov.vw}`);
        }
        if (pageFile !== 'index.html') {
          await page.setViewportSize({ width: 320, height: 568 });
          await page.waitForTimeout(150);
          await page.locator('.service-dropdown-item.open .prop-card__more').first().click();
          await page.waitForTimeout(350);
          const mb = await page.evaluate(() => {
            const box = document.querySelector('#propModal .prop-modal__box');
            const close = document.querySelector('#propModal .prop-modal__close');
            if (!box || !close) return { ok: false };
            const br = box.getBoundingClientRect();
            const cr = close.getBoundingClientRect();
            return { ok: br.left >= -1 && br.right <= window.innerWidth + 1 && br.height <= window.innerHeight * 0.90 && cr.top >= 0 && cr.right <= window.innerWidth + 1 };
          });
          if (!mb.ok) g7.failures.push(`liveResize ${pageFile}@320 modal out of bounds`);
        }
        if (errs.length) g7.failures.push(`liveResize ${pageFile}: ${errs.join(' | ')}`);
        g7.liveResize[pageFile] = { steps: resizeSeq.length, errs: errs.length };
        await ctx.close();
      }
      console.log(`GATE 7 (Website Mobile + Live Resize): ${g7.failures.length === 0 ? 'PASS' : 'FAIL'}`, g7.failures.slice(0, 5));
    }

    // =========================================================================
    // GATE 8 — Diff Hue Audit, Deploy Workflow Exclusions, Zero __share_test_ Hygiene
    // =========================================================================
    if (!IS_LIVE_BASE) {
      const g8 = report.gates.GATE_8_WEBSITE;
      const webDiff = execSync(`cd "${WEB_DIR}" && git diff main..HEAD -- . ':!tests' ':!LOOP_STATE.md'`, { encoding: 'utf8' });
      const crmDiff = execSync(`cd "${CRM_DIR}" && git diff main..HEAD -- . ':!frontend/tests'`, { encoding: 'utf8' });
      const hueRe = /\b(purple|violet|indigo)\b|#8b5cf6|#7c3aed/gi;
      for (const line of (webDiff + '\n' + crmDiff).split('\n').filter(l => l.startsWith('+') && !l.startsWith('+++'))) {
        if (hueRe.test(line)) g8.purpleMatches.push(line.slice(0, 120));
      }
      if (g8.purpleMatches.length) g8.failures.push(`Forbidden hue in diff: ${JSON.stringify(g8.purpleMatches)}`);

      // Check .cpanel.yml excludes LOOP_STATE.md, tests, proof, baseline
      const cpanelYml = fs.readFileSync(path.join(WEB_DIR, '.cpanel.yml'), 'utf8');
      const excludesAll = ['LOOP_STATE.md', 'tests', 'proof', 'baseline'].every(tok => cpanelYml.includes(tok));
      g8.deployExclusionsOk = excludesAll;
      if (!excludesAll) g8.failures.push('.cpanel.yml does not explicitly exclude LOOP_STATE.md, tests/, proof/, baseline/');

      // Check zero __share_test_ in local & Render API AND website HTML files
      const [locRes, renRes] = await Promise.all([
        httpJson(`${CRM_LOCAL}/api/v1/public/cards`),
        httpJson(`${CRM_RENDER}/api/v1/public/cards`),
      ]);
      const locLeft = (locRes.data?.cards || []).filter(c => (c.title || '').includes('__share_test_')).length;
      const renLeft = (renRes.data?.cards || []).filter(c => (c.title || '').includes('__share_test_')).length;
      let htmlGrep = '';
      try {
        htmlGrep = execSync(`grep -rn "__share_test_" "${WEB_DIR}" --exclude-dir=node_modules --exclude-dir=proof --exclude-dir=tests --exclude-dir=.git --exclude=LOOP_STATE.md || true`, { encoding: 'utf8' }).trim();
      } catch {}
      g8.hygiene = { localLeft: locLeft, renderLeft: renLeft, htmlMatches: htmlGrep ? htmlGrep.split('\n').length : 0 };
      if (locLeft > 0 || renLeft > 0 || htmlGrep.length > 0) {
        g8.failures.push(`Test artifacts remain: local=${locLeft}, render=${renLeft}, html="${htmlGrep.slice(0, 100)}"`);
      }
      console.log(`GATE 8 (Website UI Lock + Hygiene, ${g8.totalBaselineCompared} baselines, maxDiff=${g8.maxDiffPct}%): ${g8.failures.length === 0 ? 'PASS' : 'FAIL'}`, g8.failures.slice(0, 5));
    }
  } finally {
    await browsers.chromium.close();
    await browsers.webkit.close();
  }

  for (const [k, v] of Object.entries(report.gates)) {
    v.pass = v.failures.length === 0;
  }

  const outFile = path.join(PROOF_DIR, 'website-report.json');
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  const failed = Object.entries(report.gates).filter(([, v]) => !v.pass).map(([k]) => k);
  if (failed.length) {
    console.error('WEBSITE SUITE FAILED GATES:', failed);
    process.exit(1);
  }
  console.log('ALL WEBSITE v3 GATES PASSED!');
})().catch(err => {
  console.error('FATAL WEBSITE v3 ERROR:', err);
  process.exit(1);
});
