# Website Cards, Pics & Video Manager and Two-Way CRM Synchronization Bridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Attach the Radhya Realty Website to the Radhya Realty CRM via a robust two-way live synchronization bridge (REST API + `BroadcastChannel` + `localStorage` persistence) and build a Developer-Only "Website Cards, Pics & Video Manager" in the CRM Developer Portal (`Editor / Developer` role ONLY) with automatic accordion expansion, video & image carousels, and filter synchronization.

**Architecture:**
- **Inbound Bridge (Website -> CRM)**: Dispatches enquiries from website modals (`#radhyaEnquiryModal`, `#propModal`) via `POST /api/v1/webhooks/website-ingest` (with `X-Radhya-Webhook-Token`), mirrored to `localStorage` (`radhya_crm_inbound_leads_v1`) and `BroadcastChannel('radhya_crm_bridge')`. The CRM ingests leads into Leads Section, Notes Section, Enquiry Desk, and Outbound Phone Dispatch Log.
- **Outbound CMS Bridge (CRM -> Website)**: Developer Portal provides full CRUD over website cards across all 5 divisions and all spaces. State is stored on disk via Next.js REST API (`/api/v1/cms/cards`), in `localStorage` (`radhya_cms_cards_registry_v1`), and broadcasted over `BroadcastChannel('radhya_cms_live_sync')`.
- **Public Website Hydration**: `main.js` listens to `radhya_cms_live_sync` and `localStorage`, hydrating new/edited cards using identical `.prop-card` DOM structures, supporting `<video class="prop-slide">` autoplay/loop/muted and `<img>` slides in `.prop-slider` and `#propModal`, recalculating accordion height dynamically so adding unlimited cards cleanly expands without clipping.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide Icons, Vanilla ES6+ JavaScript, CSS3 Grid/Flexbox, BroadcastChannel API, LocalStorage API, Playwright.

**Spec:** USER_REQUEST

## Global Constraints
- Zero mutation of existing public website styling, color variables, splash animations, or marquee.
- Public website must not expose any "Edit" or "Add" controls.
- CMS module restricted strictly to `Editor / Developer` (`DEVELOPER`) role inside CRM.
- Additive, non-destructive code updates only.

## Review Focus
1. Live cross-tab synchronization between CRM and Website without page reloads.
2. Mixed media carousel (pictures + videos) within `.prop-slider` and `#propModal`.
3. Auto-expanding height and padding in `.service-dropdown-item` when adding unlimited cards.
4. Filter console (`#filterConsole`) integration with new cards.
5. Inbound lead dual routing into CRM leads, notes, and enquiry desk.

---

### Task 1: Next.js CMS REST Endpoints
**Files:**
- Create: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/src/app/api/v1/cms/cards/route.ts`
- Create: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/src/app/api/v1/cms/cards/[cardId]/route.ts`

- [ ] **Step 1: Implement GET and POST in `/api/v1/cms/cards/route.ts`**
  Supports listing all cards (or filtering by `division` and `space`), and creating a new card. Persists to `frontend/data/cards-registry.json`. Returns CORS headers. Validates `X-Radhya-Webhook-Token: radhya-sec-99532-enterprise-token-2026`.
- [ ] **Step 2: Implement GET, PUT, and DELETE in `/api/v1/cms/cards/[cardId]/route.ts`**
  Supports updating existing card and deleting cards with token validation and persistence.

### Task 2: Two-Way Inbound Lead Bridge Upgrade
**Files:**
- Modify: `publish_website/main.js`
- Modify: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/src/lib/store.ts`

- [ ] **Step 1: Enhance `window.submitRadhyaLeadToCRM` in `main.js`**
  Add header `X-Radhya-Webhook-Token: radhya-sec-99532-enterprise-token-2026`, write to `localStorage.setItem('radhya_crm_inbound_leads_v1', ...)` and broadcast via `new BroadcastChannel('radhya_crm_bridge').postMessage(...)`.
- [ ] **Step 2: Update `store.ts` in CRM**
  Add reactive listener for `BroadcastChannel('radhya_crm_bridge')` and `localStorage` storage events, updating `leads`, `notes`, `enquiries`, and `dispatchLogs` in real-time.

### Task 3: Seed All Authentic Website Cards into CMS Registry
**Files:**
- Create: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/src/lib/defaultCardsRegistry.ts`
- Create / Seed: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/data/cards-registry.json`

- [ ] **Step 1: Extract and structure all existing cards from HTML files**
  Parse cards from `real-estate.html`, `renovation.html`, `loan.html`, `vehicle-sale-purchase.html` / `auto-moto.html`, and `insurance.html`.
- [ ] **Step 2: Assign stable `data-card-id`, division, accordion index (0-3), category (`data-type`), deal (`data-deal`), media slides (images & videos), price, title, and description.**

### Task 4: Developer Portal Website Cards & Media CMS
**Files:**
- Modify: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/src/components/EditorPortalView.tsx`
- Modify: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/src/lib/types.ts`
- Modify: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/src/app/page.tsx`

- [ ] **Step 1: Add Card and Media types in `types.ts`**
  Define `WebsiteCardItem`, `CardMediaItem` (`type: 'image' | 'video'`, `url: string`, `alt?: string`).
- [ ] **Step 2: Build the Card & Media Manager UI inside `EditorPortalView.tsx`**
  - Level 1: Role / Division selector.
  - Level 2: Specific Space / Sub-Section selector (Accordion 0-3 and Category data-type).
  - Cards listing table / grid with Edit, Delete, Reorder buttons, and "Add New Card" action.
  - Card Editor Form modal / drawer:
    - Target Division & Accordion Space selector.
    - Title, Tag/Badge, Price, Short Description, Full Description.
    - Filter attributes: `data-deal`, `data-type`, `data-price-buy`, `data-price-rent`, `data-amount`, `data-cover`, `data-budget`.
    - Multi-Slide Video & Picture Manager: Add URL or upload file (via FileReader as data-URL or local path), reorder slides, delete slides, preview video/image.
  - Sync actions: Save triggers REST API + updates `localStorage` (`radhya_cms_cards_registry_v1`) + posts to `BroadcastChannel('radhya_cms_live_sync')`.
- [ ] **Step 3: Strictly enforce Developer role**
  Ensure only `store.role === 'DEVELOPER'` can render this manager.

### Task 5: Website Hydration, Video Slide Playback & Auto-Expanding Spacing
**Files:**
- Modify: `publish_website/style.css`
- Modify: `publish_website/main.js`
- Sync to: `.claude/style.css`, `.claude/main.js`

- [ ] **Step 1: Add additive CSS in `style.css`**
  - `.prop-slide video`: `width: 100%; height: 100%; object-fit: cover; flex-shrink: 0;`
  - `.dropdown-cards, .prop-grid`: clean grid wrapping, gap, and padding.
  - Dynamic accordion expansion support: `.service-dropdown-item.open .dropdown-cards, .service-dropdown-item.open .prop-grid`.
- [ ] **Step 2: Add `rebindInteractiveCards()` in `main.js`**
  - Load cards from `radhya_cms_cards_registry_v1` (with server fetch fallback to `/api/v1/cms/cards`).
  - Hydrate edited and newly added cards into the matching `.service-dropdown-item` and `.dropdown-cards` container.
  - Render `<video class="prop-slide" autoplay muted loop playsinline>` for video slides.
  - Initialize sliders (`.prop-slider`) without duplicate listeners.
  - Recalculate accordion height dynamically on open/filter: `body.style.maxHeight = body.scrollHeight + 48 + 'px'`.
  - Rebind `#propModal` to play video slides in `#modalSlides` / `mFig`.
  - Rebind `#filterConsole` to include newly added cards in filtering.
  - Listen to `BroadcastChannel('radhya_cms_live_sync')` and `localStorage` storage events for instant live sync.

### Task 6: Comprehensive Automated Verification (Playwright E2E)
**Files:**
- Create: `/Users/sakshamsaini/Documents/Crm for Radhya Reality/frontend/test-cms-website-sync.js`

- [ ] **Step 1: Automated test covering:**
  - Role gating verification (Developer sees CMS, Owner & Worker do not).
  - Edit existing card in Real Estate -> Commercial and verify live update on `real-estate.html`.
  - Add 4+ new cards with images and videos to `real-estate.html` and `vehicle-sale-purchase.html`.
  - Verify auto-expanding accordion height without clipping.
  - Verify video playback in carousel and `#propModal`.
  - Verify `#filterConsole` search and chip filtering on new cards.
  - Verify website-to-CRM lead ingestion.
- [ ] **Step 2: Run test in headless browser, check 0 console errors, log results.**
