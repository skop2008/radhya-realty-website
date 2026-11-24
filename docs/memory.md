# Project Memory & Engineering Context — Radhya Realty Website

## 1. Verified Institutional & Environment Context
- **Brand Entity:** Radhya Realty (Parent: Anubhav Bharat Group) — Founder & MD: Rakesh Raj Shukla
- **Verified NAP:** Shop No 1, Budh Bazar Road, Kamalpur, Burari, Delhi, DL 110084, India (`28.7541° N, 77.1972° E`)
- **Live Domain:** `https://anubhavbharatgroup.com/` *(older strings in `README.md` / `GEMINI.md` / `whatsapp-enquiry.php` still reference `radhyarealty.com`)*
- **GitHub Website Repo:** `https://github.com/skop2008/radhya-realty-website.git` (`/Users/sakshamsaini/Documents/Radha reality`)
- **GitHub CRM Repo:** `https://github.com/skop2008/CRM-Radhya-Reality-.git` (`/Users/sakshamsaini/Documents/Crm for Radhya Reality`, Render: `https://radhya-crm.onrender.com`, `NEXT_PUBLIC_WEBSITE_URL=https://anubhavbharatgroup.com`)

## 2. Engineering Changelog & Verified Commits
- **v3 8-Gate Stabilization (`be4f5ba` → `877a24f`, Cycles 0–5):** Fixed mobile hero gap & desktop `margin-bottom` collapse (`padding-bottom: 1rem` at `>= 1280px`), pre-intro deep-link redirects, zero-flash cookie banner guard (`html:not([data-intro-state="done"])`), WebKit `Tab` trap, and reduced-motion header guard. Passed 8/8 Playwright gates × 2 consecutive runs (`proof/cycle-4`, `proof/cycle-5`).
- **`44bbc18` (Nov 21, 2026 — Modal-Only Share):** Removed card-thumbnail Share icons; mounted `.prop-modal__share` exclusively inside `#propModal` beside **Enquire Now**; bumped 7 HTML files to `?v=20261121-2200` (26/26 assertions PASS).
- **`bf18db7` (Nov 21, 2026 — Session-Once Intro):** Added `sessionStorage['radhya_intro_seen_v1']` (set only when `#intro` finishes, never on pre-intro redirects); bumped 7 HTML files to `?v=20261121-2230`.
- **`792808c` (Nov 21, 2026 — CRM Role Gating):** Enabled Website Cards & Media CMS for Admin (`OWNER`) + Worker (`WORKER`); restricted Worker Login Manager & Integration Settings strictly to `OWNER` in UI and API (`403` for `WORKER`). Passed `npx tsc --noEmit && npm run build`.
- **Favicon & SEO Audit (Nov 21, 2026):** Added PNG/ICO `<link>` favicon tags to `index.html`; built MilesWeb ZIPs (`radhya-realty-milesweb-20261121.zip`, `radhya-realty-milesweb-seo-20261121.zip`).

## 3. Known Gotchas & Findings
1. **Local `sitemap.xml` is `0` bytes:** Must be populated with the 8 canonical URLs and validated via `xmllint --noout sitemap.xml` before uploading to MilesWeb.
2. **Canonical Alias Pages (Exclude from Sitemap):** `auto-moto.html` canonicalizes to `vehicle-sale-purchase.html` (301 in `.htaccess`); `decoration.html` canonicalizes to `/`.
3. **WebKit Quirks Solved:** `position: fixed` has `offsetParent === null` (use `getComputedStyle`); explicit `Tab` stepping required in `#propModal`; disable `dashExpandPop` under `prefers-reduced-motion`.
4. **Minor Cleanup Note:** `main.js` currently has two identical `.site-header` scroll IIFEs (harmless, safe to deduplicate later).
5. **LocalStorage Quota Guard:** `syncFromCmsApi()` compacts media URLs if serialized registry `>= 3.5 MB`.
