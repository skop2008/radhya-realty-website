# Model Task Tracker — Radhya Realty Website

Central log of tasks assigned to the AI engineering model, their current status, verification proof, and next actions.

---

## 1. Active & Pending Tasks

| ID | Task Given to Model | Scope | Status | Verification / Next Action |
| :---: | :--- | :--- | :---: | :--- |
| **T-11** | Populate local `sitemap.xml` (currently `0` bytes) with all 8 canonical URLs | `sitemap.xml` | **Pending User Run** | Run provided `cat` + `xmllint --noout sitemap.xml` command, then upload to MilesWeb `public_html/` |
| **T-12** | Generate keyword-enriched Burari SEO & GEO deployment bundle (`radhya-realty-milesweb-seo-ready.zip`) | All HTML pages, `sitemap.xml`, `robots.txt` | **Pending User Run** | Run the verified keyword-enriched Terminal script and extract ZIP into MilesWeb `public_html/` |
| **T-13** | Verify Bing Webmaster Tools & complete off-page local SEO (Google Business Profile + NAP citations) | External consoles | **User Action** | Import `https://anubhavbharatgroup.com/` into Bing Webmaster Tools via 1-click Google Search Console import |

---

## 2. Completed Tasks Log

| ID | Date | Task Given to Model | Scope | Status | Proof / Commit |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **T-01** | 2026-11-20 | Fix mobile hero eyebrow-to-search gap, social icon alignment, and 320–1920px resize stability | `style.css`, 7 HTML files | **Done** | Website `877a24f` — Gates 1, 6, 7 PASS × 2 (`proof/cycle-4`, `proof/cycle-5`) |
| **T-02** | 2026-11-20 | Implement unique card `?card=<id>` deep linking with pre-intro cross-role redirect, filter reset, accordion expand, and focus-trapped modal | `main.js`, `style.css`, CRM `api/v1/cms/cards` | **Done** | Website `877a24f`, CRM `fc1772a` — Gates 2, 3, 4 PASS × 2 |
| **T-03** | 2026-11-20 | Enforce strict `#intro` → Cookie Banner → Modal sequence with zero flash and `prefers-reduced-motion` support | `main.js`, `style.css` | **Done** | Website `877a24f` — Gate 5 PASS × 2 |
| **T-04** | 2026-11-21 | Move Website Share button exclusively inside `#propModal` beside **Enquire Now** and remove card-thumbnail Share icons | `main.js`, `style.css`, 7 HTML files | **Done** | Website `44bbc18` — `node --check main.js` + 26/26 assertions PASS |
| **T-05** | 2026-11-21 | Play `#intro` animation once per browser session (`radhya_intro_seen_v1`) on whichever link/role/`?card=` opens first | `main.js`, 7 HTML files | **Done** | Website `bf18db7` — `node --check main.js` PASS |
| **T-06** | 2026-11-21 | Enable Website Cards & Media CMS for Admin + Worker; restrict Worker Login Manager & Integration Settings strictly to Admin (`OWNER`) | CRM UI & `/api/v1/auth/workers` (`403` for `WORKER`) | **Done** | CRM `792808c` — `npx tsc --noEmit && npm run build` 0 errors |
| **T-07** | 2026-11-21 | Push both repos to GitHub and build clean MilesWeb deployment ZIP | Website + CRM | **Done** | `radhya-realty-milesweb-20261121.zip` (430 KB) & `radhya-realty-milesweb-seo-20261121.zip` (420 KB) |
| **T-08** | 2026-11-21 | Diagnose missing Google Search favicon/logo and add PNG/ICO `<link>` favicon tags | `index.html` | **Done** | Added `favicon.ico`, `favicon-48x48.png`, `favicon-192x192.png`, `apple-touch-icon.png` |
| **T-09** | 2026-11-21 | Audit Burari/Delhi-NCR SEO & GEO readiness, produce keyword scan report, sitemap XML, and Webmaster verification guide | SEO/GEO audit, `sitemap.xml` | **Done** | Delivered keyword scan, verified Terminal command, canonical `sitemap.xml`, and Bing/GSC verification guide |
| **T-10** | 2026-11-22 | Create full project documentation suite (`prd.md`, `architecture.md`, `design.md`, `memory.md`, `rules.md`, `tracker.md`) | `docs/` | **Done** | All 6 Markdown docs created/prepared grounded in live codebase |
| **T-14** | 2026-11-23 | Fix verified SEO, GEO, AEO & snippet leakage issues (`data-nosnippet` on cookie banner & marquee, `privacy-policy.html` & `terms.html` titles/meta/copy, `robots.txt`, `llms.txt`, `?v=20261123-2320` cache-busting) | `main.js`, `index.html`, `privacy-policy.html`, `terms.html`, `robots.txt`, `llms.txt`, 6 role HTMLs | **Done** | Non-destructive edits applied per `docs/rules.md` (zero API/UI/CSS breaks); Terminal loop script provided for `sitemap.xml`, PNG/ICO favicons, `node --check`, JSON-LD parse & ZIP build |
| **T-15** | 2026-11-24 | Sync Burari-first real estate & renovation listings across static HTML and JSON fallback (`real-estate.html`, `renovation.html`, `data/cards-registry.json`), replace Gurugram/test cards, and add visible Burari Locality Guide & FAQ section matching `FAQPage` JSON-LD | `real-estate.html`, `renovation.html`, `data/cards-registry.json`, `docs/tracker.md` | **Done** | All existing `data-card-id` & `data-*` attributes preserved; zero `style.css` or API changes; old and new SEO updates 100% synced |
| **T-16** | 2026-11-24 | Fix Website → CRM lead ingestion bug: persist webhook leads/notes/enquiries directly to PostgreSQL (`crmDb.ts`) with 30s deduplication, add `force-dynamic` + 10s periodic DB sync in `store.ts`, raise `whatsapp-enquiry.php` cURL timeout (`2s → 25s`), and add Render cold-start retries in `main.js` | CRM `website-ingest/route.ts`, `ack/route.ts`, `store.ts`; Website `main.js`, `api/whatsapp-enquiry.php`, 8 HTMLs | **Done** | Zero API/UI/CSS regressions per `docs/rules.md`; verification & deploy loop ready |

---

## 3. Template for Future Tasks

```markdown
| **T-XX** | YYYY-MM-DD | <Short task description> | <Files / Modules> | **Planned / In Progress / Done** | <Test command output + Commit hash> |
```
