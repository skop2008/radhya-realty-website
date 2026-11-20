# Radhya Realty (Anubhav Bharat Group) — Official Web Architecture

Official enterprise repository for **Radhya Realty**, a multi-division conglomerate based in Delhi-NCR operating under the parent entity **Anubhav Bharat Group**.

[![Production Status](https://img.shields.io/badge/Production-Live-gold)](https://radhyarealty.com/)
[![CRM Engine](https://img.shields.io/badge/CRM_Cloud-Render_Active-060f20)](https://radhya-crm.onrender.com)
[![Hosting](https://img.shields.io/badge/Hosting-MilesWeb_cPanel-blue)](https://radhyarealty.com/)
[![Compliance](https://img.shields.io/badge/DPDP-2023_Compliant-emerald)](https://radhyarealty.com/privacy-policy.html)

---

## 1. Verified Institutional NAP & Entity

- **Brand Entity:** Radhya Realty (Parent: Anubhav Bharat Group)
- **Founder & Managing Director:** Rakesh Raj Shukla
- **Corporate Headquarters:** Shop No 1, Budh Bazar Road, Kamalpur, Burari, Delhi, DL 110084, India
- **Geo-Coordinates:** Latitude `28.7541° N`, Longitude `77.1972° E`
- **Direct Telephones:**
  - Primary / WhatsApp: `+91 99532 27091`
  - Secondary: `+91 78400 12815`
  - Technical / Lead Developer: `+91 62839 66391`
- **Official Email:** `anubhav.insurance09@gmail.com`
- **Production URL:** [https://radhyarealty.com/](https://radhyarealty.com/)
- **Live Cloud CRM:** [https://radhya-crm.onrender.com/](https://radhya-crm.onrender.com/)

---

## 2. Commercial Divisions & Core Files

| Division | Primary Template | Scope / Offerings |
| :--- | :--- | :--- |
| **Real Estate** | `real-estate.html` | Luxury Floors, Plots, Commercial Shops, High-Street Retail across Delhi-NCR. |
| **Turnkey Renovation** | `renovation.html` | Full residential overhaul, modular kitchens, civil works, 12-month structural warranty. |
| **Loans & LAP** | `loan.html` | Home Loans, LAP (Loan Against Property), Business Loans, Project Finance. |
| **Vehicle Sale & Purchase** | `auto-moto.html` / `vehicle-sale-purchase.html` | Certified pre-owned luxury cars, SUVs, vehicle exchange, finance & RTO clearance. |
| **Insurance Advisory** | `insurance.html` | Life, Health, Motor, Commercial Fire/Burglary, IRDAI Ombudsman claims escalation. |
| **Tours & Travels** | `index.html#tours-travels` | Domestic & international holiday packages, corporate MICE retreats, visa assistance. |

### Supporting Architecture
- `index.html`: Corporate flagship homepage featuring the multi-division portal selector.
- `main.js`: Core client engine with live card sync, filter consoles, and CRM webhook dispatch.
- `style.css`: Unified enterprise stylesheet adhering to the strict mobile-first White & Gold theme.
- `api/whatsapp-enquiry.php`: Server-side lead processor with WhatsApp dispatch and email backup.
- `api/.htaccess`: Zero-leakage Apache protection for `enquiries-log.json` (`Require all denied`).
- `.htaccess`: Production routing, security headers, GZIP compression, and HTTPS enforcement.
- `.cpanel.yml`: Automated deployment pipeline for MilesWeb cPanel.

---

## 3. Real-Time CRM & Webhook Integration

The public website automatically synchronizes with the live CRM running on Render:
1. **Catalog Hydration (`/api/v1/public/cards`):**
   - On load, `main.js` queries `https://radhya-crm.onrender.com/api/v1/public/cards`.
   - Dynamic listing cards for properties, vehicles, and loan packages update automatically when edited in the CRM without modifying static HTML.
2. **Live Lead Ingestion (`/api/v1/webhooks/website-ingest`):**
   - Submissions from contact forms dispatch to the Render CRM webhook with cryptographic signature validation.
   - Leads appear instantly on the respective staff desk in the CRM while triggering WhatsApp alerts.

---

## 4. MilesWeb / cPanel Deployment Instructions

### Method A: Automated Deployment via Git Version Control (Recommended)
1. Log in to your **MilesWeb cPanel**.
2. Navigate to **Git™ Version Control** under the *Files* section.
3. Click **Create** and configure:
   - **Clone URL:** `https://github.com/skop2008/radhya-realty-website.git`
   - **Repository Path:** `repositories/radhya-realty-website`
   - **Repository Name:** `radhya-realty-website`
4. Click **Create**.
5. In the repository management screen, click **Deploy HEAD Commit**.
6. The included `.cpanel.yml` will automatically copy all files and `.htaccess` to your `public_html/` directory.

### Method B: Manual File Manager Upload
1. Run local packaging or create a ZIP archive of the repository root (excluding `.git` and development caches).
2. Open **cPanel File Manager** and navigate to `public_html/`.
3. Upload the archive and click **Extract**.
4. Ensure `.htaccess` and `api/.htaccess` are present in `public_html/` (enable "Show Hidden Files" in File Manager settings).

---

## 5. Local Development & Testing

Run a lightweight HTTP server in the repository root:
```bash
# Python 3
python3 -m http.server 8080 --bind 127.0.0.1

# Then open in browser:
open http://localhost:8080
```

---

## 6. Strict Engineering Guardrails (GEMINI.md / CLAUDE.md)

1. **Style Lock:** `style.css` is strictly locked unless visual updates are explicitly ordered. Never use `svh` or non-standard CSS properties.
2. **HTML Structure Lock:** Never remove or alter `data-*` attributes (`data-deal`, `data-type`, `data-price`, `data-title`, etc.) in HTML templates.
3. **Data Security Lock:** Never expose `api/enquiries-log.json` publicly. Apache restrictions must remain active (`Require all denied`).
4. **Anti-AI-Slop:** Zero occurrences of synthetic placeholders or placeholder domains (`example.com`). Maintain authentic Indian statutory language for legal notices.
