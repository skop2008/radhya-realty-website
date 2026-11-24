# Architecture Documentation — Radhya Realty Website

This document describes the repository layout, API contracts, data-sync mechanisms, runtime flows, and deployment pipeline for the **Radhya Realty** public web platform (`https://anubhavbharatgroup.com/`).

---

## 1. Repository & Folder Structure

```text
/Users/sakshamsaini/Documents/Radha reality/
├── index.html                    # Corporate flagship homepage & division hub
├── real-estate.html              # Real Estate catalog page (data-role="real-estate")
├── renovation.html               # Turnkey Renovation catalog page (data-role="renovation")
├── loan.html                     # Loans & LAP catalog page (data-role="loan")
├── vehicle-sale-purchase.html    # Canonical Vehicle catalog page (data-role="vehicle-sale-purchase")
├── auto-moto.html                # Legacy alias (canonical -> vehicle-sale-purchase.html; 301 in .htaccess)
├── insurance.html                # Insurance Advisory catalog page (data-role="insurance")
├── decoration.html               # Legacy redirect stub (canonical -> /)
├── privacy-policy.html           # DPDP Act 2023 Privacy Policy (data-page="legal")
├── terms.html                    # Terms & Conditions (data-page="legal")
├── 404.html                      # Branded fallback error page
├── style.css                     # Unified enterprise stylesheet (tokens, glass UI, responsive rules)
├── main.js                       # Client engine (header/footer, intro, sliders, filters, CMS sync, modals, deep links)
├── .htaccess                     # Apache HTTPS enforcement, 301 alias rules, security headers, compression
├── .cpanel.yml                   # Automated MilesWeb cPanel Git deployment script
├── build-milesweb.sh             # Pre-flight audit + zero-leakage MilesWeb ZIP/TAR packager
├── robots.txt                    # Search & AI crawler directives + Sitemap pointer
├── sitemap.xml                   # Canonical XML sitemap (8 indexable URLs)
├── llms.txt                      # Structured AI/LLM discovery summary for Anubhav Bharat Group
├── manifest.json                 # Web app manifest
├── favicon.svg                   # Vector brand mark (paired with PNG/ICO favicons in production)
├── radhya-realty-preview.jpg     # Brand preview / About section background visual
├── api/
│   ├── whatsapp-enquiry.php      # Server-side PHP lead ledger, email alert & CRM webhook forwarder
│   ├── .htaccess                 # Apache rule blocking public access to enquiries-log.json (Require all denied)
│   └── (enquiries-log.json)      # Runtime-only server log — NEVER committed or packaged
├── data/
│   └── cards-registry.json       # Static JSON catalog fallback when Render CRM is sleeping/unreachable
├── uploads/                      # Locally hosted card images/videos
├── docs/
│   ├── prd.md                    # Product Requirements Document
│   ├── architecture.md           # This file — structure, APIs, and runtime flows
│   ├── design.md                 # Visual design system, typography, colors, and button specs
│   ├── memory.md                 # Project context, verified history, commits, and gotchas
│   ├── rules.md                  # Engineering rules, dependency lock, API lock, testing protocol
│   └── tracker.md                # Model task tracker (completed & active work items)
├── tests/
│   ├── package.json              # Dev-only Playwright + pixelmatch + pngjs test harness
│   ├── run-gates.mjs             # Dual-engine 8-gate verification runner
│   ├── v3-gates.spec.js          # Full Playwright gate suite (Chromium + WebKit)
│   └── share-deeplink.spec.js    # Share & deep-link regression specs
├── baseline/                     # Visual regression baseline screenshots (excluded from prod deploy)
├── proof/                        # Cycle gate reports (excluded from prod deploy)
├── GEMINI.md / CLAUDE.md         # Agent guardrail summaries
├── LOOP_STATE.md                 # v3 8-gate loop audit state (excluded from prod deploy)
└── README.md                     # Repository overview & quick-start guide
```

---

## 2. API Contracts & Integrations

### 2.1 CRM Base URL Resolution (`getCrmBaseUrls()` in `main.js`)
- **Override:** `window.__RADHYA_CRM_URL` (used in local tests or custom staging).
- **Local dev (`localhost` / `127.0.0.1` / `file:`):** `['http://localhost:3000', 'http://127.0.0.1:3000', 'https://radhya-crm.onrender.com']`
- **Production:** `['https://radhya-crm.onrender.com', 'https://crm.radhyarealty.com']`

### 2.2 Public Cards Catalog Sync (Read)
- **Endpoint:** `GET <CRM_BASE>/api/v1/public/cards?t=<timestamp>`
- **Headers:** `Cache-Control: no-cache, no-store, must-revalidate`, `Pragma: no-cache`
- **Timeouts & Retry:**
  - Standard load: `3500ms` timeout, 1 attempt per host.
  - Deep-link load (`?card=<id>`): `60000ms` timeout on Render (`5000ms` on localhost), up to 2 attempts (`1200ms` backoff) to survive Render cold starts.
- **Expected Response:** `{ "cards": [ { "id", "role", "division", "spaceIndex", "title", "badge", "priceText", "shortDesc", "fullDesc", "media": [{ "type", "url", "alt" }], "dataType", "dataDeal", "dataPriceBuy", "dataPriceRent", "dataPrice", "dataAmount", "dataCover", "dataBudget" } ] }`
- **Fallback & Live Sync Chain:**
  1. In-memory registry `window.__radhyaCardsRegistry`
  2. `localStorage` cache (`radhya_cms_cards_registry_v1`, compacted if `>= 3.5 MB`)
  3. Live REST fetch from `<CRM_BASE>/api/v1/public/cards`
  4. Static file fallback: `GET /data/cards-registry.json?t=<timestamp>`
  5. Reactive updates via `setInterval` (`15s`), `window.focus`, `visibilitychange`, `BroadcastChannel('radhya_cms_live_sync')`, and `window.storage`.

### 2.3 MilesWeb Server-Side Lead API (Write)
- **Endpoint:** `POST /api/whatsapp-enquiry.php`
- **Headers:** `Content-Type: application/json` (CORS enabled for `POST, GET, OPTIONS`)
- **Request Payload:**
  ```json
  {
    "name": "Rahul Sharma",
    "phone": "+91 98765 43210",
    "division": "REAL_ESTATE",
    "item": "3BHK Builder Floor (₹65 Lakhs)",
    "details": "Interested in Burari site visit",
    "url": "https://anubhavbharatgroup.com/real-estate.html"
  }
  ```
  *(Also accepts aliases `fullName`, `phoneNumber`, `service`, `productInterest`, `productOrProperty`, `message`, `sourceWebsite`.)*
- **Server Actions:**
  1. Validates non-empty `phone` (`400` if missing).
  2. Appends record (max 500 rolling entries, `LOCK_EX`) to `api/enquiries-log.json` (protected by `api/.htaccess`).
  3. Sends backup email alert via PHP `mail()` to `anubhav.insurance09@gmail.com`.
  4. Forwards payload via cURL (`2s` timeout) to Render CRM webhook (`https://radhya-crm.onrender.com/api/v1/webhooks/website-ingest`).
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Enquiry registered and dispatched to owner WhatsApp",
    "enquiryId": "enq_<timestamp>_<hex>",
    "ownerWhatsApp": "919953227091",
    "ownerName": "Rakesh Raj Shukla",
    "timestamp": "<ISO-8601>"
  }
  ```

### 2.4 Live CRM Webhook Ingestion (Write)
- **Endpoint:** `POST <CRM_BASE>/api/v1/webhooks/website-ingest`
- **Headers:** `Content-Type: application/json`, `X-Radhya-Webhook-Secret: <enterprise-token>`
- **Request Payload:** `{ fullName, phone, email, cityLocality, division, productInterest, estimatedBudget, message, sourceWebsite, secretKey }`
- **Client-Side Mirror:** Before network calls, `window.submitRadhyaLeadToCRM` writes to `localStorage['radhya_crm_inbound_leads_v1']` (max 50 items) and broadcasts `{ type: 'INBOUND_LEAD', lead }` over `BroadcastChannel('radhya_crm_bridge')` for instant same-browser CRM updates.

---

## 3. Core Runtime Flows

### 3.1 Boot, Session-Once Intro & Cookie Order Flow
```text
Page Load
  ├─ Check sessionStorage['radhya_intro_seen_v1'] === '1'
  ├─ Check ?card=<id> against /^[A-Za-z0-9_-]{1,100}$/
  │    ├─ If auto-moto.html?card=... -> location.replace('vehicle-sale-purchase.html?...') [Pre-Intro]
  │    ├─ If wrong role page (inferred from card ID) -> location.replace('<target>.html?...') [Pre-Intro]
  │    └─ If index.html?card=<valid> -> hold overlay, fetch cards, resolve role, redirect [Pre-Intro]
  ├─ If intro NOT seen in this session:
  │    └─ html[data-intro-state="running"] -> play #intro (~5.1s or 190ms reduced-motion fade)
  │       -> set sessionStorage['radhya_intro_seen_v1']='1'
  │       -> html[data-intro-state="done"] + dispatch 'radhya:intro-end' + resolve __radhyaIntroDone
  ├─ If intro ALREADY seen in this session:
  │    └─ Skip #intro -> html[data-intro-state="done"] + resolve __radhyaIntroDone immediately
  └─ After __radhyaIntroDone:
       ├─ Mount #radhyaCookieBanner ONLY if localStorage['radhya_cookie_consent_v1'] is absent
       └─ If ?card=<valid>: await __radhyaInitialCardsPromise -> clear filters -> expand section -> open #propModal
```

### 3.2 Listing Hydration, Modal & Share Flow
```text
syncFromCmsApi()
  ├─ GET /api/v1/public/cards (fallback: /data/cards-registry.json)
  ├─ rebindInteractiveCards(cards) -> renders .prop-card inside matching .service-dropdown-item
  ├─ initPropSliders() -> binds prev/next arrows, dots, touch swipe, video play/pause
  ├─ ensureAllCardShareButtons() -> assigns stable data-card-id & strips any card-corner share buttons
  └─ applyPortalFilters() -> updates counters, match badges & visibility

User clicks card body or "View details"
  └─ openModal(card) -> populates #propModal (slider, tag, title, price, desc)
       ├─ Mounts .prop-modal__actions containing:
       │    ├─ .prop-modal__cta ("Enquire Now") -> opens #radhyaEnquiryModal prefilled with division + item
       │    └─ .prop-modal__share ("Share") -> navigator.share() or clipboard copy + "Product link copied" toast
       └─ Traps Tab focus inside #propModal; on close -> pauses videos, strips ?card= via replaceState, restores focus
```

### 3.3 Lead Capture & Dual-Path Delivery Flow
```text
User submits #radhyaEnquiryForm
  ├─ Client validation (Full Name, >=10-digit Phone, Division)
  ├─ 1. Local mirror: localStorage['radhya_crm_inbound_leads_v1'] + BroadcastChannel('radhya_crm_bridge')
  ├─ 2. Fire-and-forget POST /api/whatsapp-enquiry.php -> logs enquiries-log.json + emails MD + cURL to CRM
  ├─ 3. Direct POST <CRM_BASE>/api/v1/webhooks/website-ingest -> creates Lead in Render CRM
  └─ Displays inline #radhyaModalSuccess view (zero external redirects or popups)
```

---

## 4. Deployment Pipeline (MilesWeb cPanel)

- **Automated Git Deploy (`.cpanel.yml`):** Copies production web files and `.htaccess` into `public_html/`, strictly excluding `LOOP_STATE.md`, `tests/`, `proof/`, `baseline/`, and `api/enquiries-log.json`.
- **ZIP Packaging (`build-milesweb.sh`):** Runs a 4-step pre-flight check (17 required files, live CRM URL check, zero-leakage exclusion of `enquiries-log.json` and dev folders) and outputs a flat-root ZIP ready for cPanel File Manager extraction into `public_html/`.
