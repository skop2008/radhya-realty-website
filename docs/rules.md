# Engineering Rules & Guardrails — Radhya Realty Website

Every contributor and AI coding agent working on this repository **must** follow these rules without exception.

---

## 1. No Unnecessary Dependencies

1. **Zero Production Runtime Dependencies:** The live website is pure **HTML5 + CSS3 + Vanilla ES6+ JavaScript + native PHP 8.x**. Do **not** add React, Vue, Next.js, Tailwind, jQuery, Bootstrap, GSAP, Lodash, Axios, or any npm/CDN runtime library to the website root.
2. **Dev-Only Test Harness:** Third-party packages are permitted **only** inside `tests/package.json` (`playwright`, `pixelmatch`, `pngjs`). Do not install new dev packages unless explicitly approved by the user.
3. **No Build Step Required for Production:** Every file served in `public_html/` must run directly on MilesWeb Apache + PHP without a bundler or Node.js server.

---

## 2. Never Break Existing APIs or Contracts

1. **CRM Read Contract (`/api/v1/public/cards`):**
   - Preserve `getCrmBaseUrls()`, `syncFromCmsApi()`, `rebindInteractiveCards()`, `window.__radhyaCardsRegistry`, `BroadcastChannel('radhya_cms_live_sync')`, and the `/data/cards-registry.json` offline fallback.
   - Never change expected card field names (`id`, `role`, `division`, `spaceIndex`, `title`, `badge`, `priceText`, `shortDesc`, `fullDesc`, `media`, `dataType`, `dataDeal`, `dataPrice*`).
2. **Lead Ingestion Contract (`/api/whatsapp-enquiry.php` & `/api/v1/webhooks/website-ingest`):**
   - Preserve `window.submitRadhyaLeadToCRM(formData)` signature and all three delivery paths (localStorage/BroadcastChannel mirror, MilesWeb PHP endpoint, and Render CRM webhook with `X-Radhya-Webhook-Secret`).
   - Preserve backward-compatible field aliases in `api/whatsapp-enquiry.php` (`name`/`fullName`, `phone`/`phoneNumber`, `division`/`service`, `item`/`productInterest`/`productOrProperty`, `details`/`message`, `url`/`sourceWebsite`).
3. **Global JS & DOM Hooks Lock:**
   - Never remove or rename `#site-header`, `#site-footer`, `#propModal`, `#radhyaEnquiryModal`, `#talkToTeamModal`, `#radhyaCookieBanner`, `#filterConsole`, `.service-dropdown-item`, `.prop-slider`, `.prop-card`, `.prop-modal__actions`, `.prop-modal__cta`, or `.prop-modal__share`.
   - Never remove or rename `data-*` attributes on HTML templates (`data-page`, `data-role`, `data-card-id`, `data-deal`, `data-type`, `data-price`, `data-price-buy`, `data-price-rent`, `data-budget`, `data-amount`, `data-cover`, `data-title`).
   - Preserve CustomEvents (`radhya:intro-start`, `radhya:intro-end`, `radhya:cards-ready`, `radhya:deeplink-opened`) and `html[data-intro-state]`.
4. **URL & Redirect Stability:**
   - Keep `auto-moto.html` 301-redirecting to `vehicle-sale-purchase.html` while preserving `?card=` query strings (never add `QSD` to `.htaccess`).

---

## 3. Test After Every Change (Mandatory Verification Gate)

Never mark a change complete or package a MilesWeb ZIP until **every applicable check below passes**:

```bash
# 1. JavaScript syntax check (required after any main.js edit)
node --check main.js

# 2. PHP syntax check (required after any api/*.php edit)
php -l api/whatsapp-enquiry.php

# 3. XML sitemap validation (required after any sitemap.xml edit)
xmllint --noout sitemap.xml

# 4. Full dual-engine Playwright 8-gate regression suite (Chromium + WebKit)
cd tests && npm run gates

# 5. Pre-flight & zero-leakage MilesWeb package audit (required before deploy)
./build-milesweb.sh
```

- **Zero Test Weakening:** Never relax tolerances, delete assertions, or skip failing gates to force a pass.
- **Cache Busting:** After any edit to `style.css` or `main.js`, bump the `?v=YYYYMMDD-hhmm` query string on all `<link rel="preload">`, `<link rel="stylesheet">`, and `<script>` tags across all 7 HTML files.

---

## 4. Visual, UX & Security Guardrails

1. **Theme & Style Lock:** Keep `style.css` locked unless visual edits are explicitly requested. Maintain the White + Deep Navy (`#060f20`/`#0a1730`) + Royal Gold (`#c9a24b`/`#e3c883`) palette with **zero purple gradients** and no unsupported CSS units (`svh` avoided in favor of `vh`/`dvh`).
2. **UX Invariants:**
   - Share button appears **only** inside `#propModal` beside **Enquire Now** (never on card thumbnails).
   - `#intro` plays **once per session** (`radhya_intro_seen_v1`) on whichever link opens first.
   - `#radhyaCookieBanner` never renders or flashes before `html[data-intro-state="done"]`.
   - Minimum `44×44px` tap targets on mobile; `16px` input font size on `<= 768px`.
3. **Data Security Lock:**
   - Never expose `api/enquiries-log.json` publicly. Keep `api/.htaccess` (`Require all denied`) intact and verify `enquiries-log.json` is absent from every ZIP/TAR archive and Git commit.
   - Always sanitize `?card=` against `/^[A-Za-z0-9_-]{1,100}$/` and escape with `CSS.escape()`.
4. **Anti-AI-Slop & Honest SEO:**
   - Zero placeholder domains (`example.com`), zero `Gemini_Generated_Image` strings, and zero fake `#1` Google ranking guarantees.
   - Standard engineering workflow: `Explore` → `Plan` → `Code` → `Verify` → `Commit`.
