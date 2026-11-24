# Product Requirements Document (PRD) — Radhya Realty Website

**Brand Entity:** Radhya Realty (Parent: Anubhav Bharat Group)
**Founder & Managing Director:** Rakesh Raj Shukla
**Headquarters:** Shop No 1, Budh Bazar Road, Kamalpur, Burari, Delhi, DL 110084, India
**Live Production URL:** `https://anubhavbharatgroup.com/`
**Connected CRM Cloud:** `https://radhya-crm.onrender.com/`
**Hosting Environment:** MilesWeb cPanel (Apache / PHP 8.x)

## 1. Product Vision & Goals
Radhya Realty is a multi-division local services portal serving Burari, North Delhi, and Delhi-NCR under the tagline **"One solution for all your needs."** It serves as both a luxury-styled digital catalog across five core service divisions (plus Tours & Travels) and a real-time lead-generation front end synced with the Radhya Realty CRM and direct leadership lines.

## 2. Target Users by Role / Division

| Division / Role | Page Route | Primary Target Users | User Goals & Pain Points | Core User Actions |
| :--- | :--- | :--- | :--- | :--- |
| **Corporate Overview (Home)** | `index.html` | First-time visitors, Burari/Delhi-NCR families, investors, referred clients | Verify company credibility, browse all divisions, reach leadership directly | Browse division cards, open Roles menu, use "Talk to our team" call/WhatsApp modal |
| **Real Estate** | `real-estate.html` | Homebuyers (1RK–4BHK, builder floors, plots), tenants, commercial investors | Find verified listings, filter Buy vs. Rent & budget (`₹25k/mo`–`₹15 Cr+`), inspect media before site visits | Search/filter, swipe sliders, inspect `#propModal`, share `?card=<id>`, submit enquiry |
| **Turnkey Renovation** | `renovation.html` | Homeowners, landlords, and office owners planning remodelling or civil upgrades | Compare fixed-budget packages (`₹2L`–`₹50L+`) with 12-month structural warranty | Filter by budget/type, inspect scope in modal, share package link, request quote |
| **Loans & LAP** | `loan.html` | Property buyers, business owners, and borrowers seeking Home Loans, LAP, or balance transfers | Compare financing brackets (`₹15L`–`₹15 Cr+`) and get quick bank approval guidance | Filter by loan type & amount, view details, submit consultation enquiry |
| **Vehicle Sale & Purchase** | `vehicle-sale-purchase.html` (alias `auto-moto.html`) | Buyers and sellers of certified pre-owned luxury cars, SUVs, and two-wheelers | Verify vehicle condition, pricing (`₹50k`–`₹1.5 Cr+`), RTO transfer, and finance/exchange | Filter vehicles, swipe photo/video sliders, share vehicle link, book inspection |
| **Insurance Advisory** | `insurance.html` | Families, homeowners, vehicle owners, and businesses seeking Life, Health, Motor, or Commercial cover | Compare sum-insured tiers (`₹15L`–`₹5 Cr+`) and get IRDAI claims escalation support | Filter by policy type & cover, inspect details, request quote or claims help |
| **Tours & Travels** | `index.html#tours-travels` (enquiry option) | Families and corporate teams planning holidays, MICE retreats, or visa support | Request tailored travel packages through one trusted local advisor | Submit Tours & Travels enquiry via `#radhyaEnquiryModal` or direct MD line |
| **Internal Staff (CRM Users)** | `radhya-crm.onrender.com` | Admin (`OWNER`) & Staff (`WORKER`) managing listings and leads | Publish/edit/reorder website cards without editing HTML; share read-only deep links; follow up on leads | Manage cards in CRM CMS, copy share links, process incoming leads |

## 3. Core Website Features
- **Floating Liquid-Glass Header (`#hdr`) & Roles Drawer (`#panel`):** Expands at top, shrinks to pill on scroll down, includes SVG brand mark and 4 social links.
- **Session-Once Brand Intro (`#intro`):** Plays once per session (`sessionStorage` key `radhya_intro_seen_v1`) on whichever URL/role/`?card=` opens first; shortens to a `190ms` fade under `prefers-reduced-motion`.
- **Search & Filter Console (`#filterConsole`):** Debounced (`120ms`) text search, deal chips, type dropdown + sub-chips, role-specific budget slider, live counters, match badges, and empty state.
- **Mixed-Media Sliders (`.prop-slider`) & Live CRM Hydration:** Multi-image + inline video carousels hydrated from `GET /api/v1/public/cards` with `data/cards-registry.json` offline fallback, 15s polling, `BroadcastChannel`, and `localStorage` caching.
- **Product Detail Modal (`#propModal`) & Exclusive Share:** Full media slider, formatted price (`tabular-nums`), **Enquire Now** CTA, and **Share** button side by side inside `.prop-modal__actions` (never on card thumbnails).
- **Unique Card Deep Linking (`?card=<id>`):** Pre-intro redirects for `index.html?card=`, `auto-moto.html?card=`, and wrong-role URLs; clears filters, opens accordion, scrolls card into view, traps `Tab` focus in `#propModal`, cleans URL on close.
- **Lead Capture (`#radhyaEnquiryModal`) & Direct Leadership Modal (`#talkToTeamModal`):** Dual-path delivery to local CRM bridge, `/api/whatsapp-enquiry.php`, and Render CRM webhook; 1-tap Call/WhatsApp/SMS/Maps for MD.
- **DPDP Act 2023 Compliance & SEO/GEO:** Cookie consent banner (`#radhyaCookieBanner`) strictly hidden until `introState="done"`, dedicated `privacy-policy.html` and `terms.html`, canonical tags, `robots.txt`, `sitemap.xml`, `llms.txt`, and PNG/ICO favicons.

## 4. Non-Functional Requirements
- **Responsiveness:** Zero horizontal overflow across `320px`–`1920px` in Chromium and WebKit.
- **Touch & Accessibility:** Minimum `44×44px` mobile tap targets, `16px` input font size on `<= 768px`, gold `:focus-visible` rings, keyboard `Escape` + `Tab` trapping, and `prefers-reduced-motion` support.
- **Security & Reliability:** `api/enquiries-log.json` blocked by Apache (`Require all denied`) and excluded from deployments; `?card=` validated via `/^[A-Za-z0-9_-]{1,100}$/` and escaped with `CSS.escape`; full offline fallback if Render sleeps.
