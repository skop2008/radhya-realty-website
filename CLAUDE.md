# Radhya Realty (Anubhav Bharat Group) — Engineering Rules

## 1. Project Overview & Institutional Scope
- Multi-division enterprise web architecture: Real Estate, Turnkey Renovation, Loans & LAP, Vehicle Sale & Purchase, Insurance Advisory, and Tours & Travels.
- Core Files: `index.html`, `real-estate.html`, `renovation.html`, `loan.html`, `vehicle-sale-purchase.html`, `auto-moto.html`, `insurance.html`, `privacy-policy.html`, `terms.html`, `404.html`, `style.css`, `main.js`, `api/whatsapp-enquiry.php`.

## 2. Verified Institutional Entity & NAP
- **Brand Entity**: Radhya Realty (Parent: Anubhav Bharat Group)
- **Founder & MD**: Rakesh Raj Shukla
- **Headquarters**: Shop No 1, Budh Bazar Road, Kamalpur, Burari, Delhi, DL 110084, India
- **Geo-Coordinates**: Latitude 28.7541, Longitude 77.1972
- **Direct Telephones**: +91-99532-27091 (WhatsApp: 919953227091), +91-78400-12815
- **Official Email**: anubhav.insurance09@gmail.com
- **Production URL**: https://radhyarealty.com/

## 3. Strict Non-Destructive Guardrails
1. **Style Lock**: `style.css` is READ-ONLY unless visual modifications are explicitly ordered. Never use `svh` or non-standard CSS properties.
2. **HTML Structure Lock**: Never remove, rename, or alter `data-*` filter attributes (`data-page`, `data-role`, `data-deal`, `data-type`, `data-price`, `data-title`, etc.) in HTML templates.
3. **JS Functional Lock**: Preserve `#site-header`, `#site-footer`, `initPortalFilterConsole`, `.service-dropdown-item`, `.prop-slider`, `#propModal`, `#radhyaEnquiryModal`, and `window.submitRadhyaLeadToCRM` in `main.js`.
4. **Data Security Lock**: Never expose `api/enquiries-log.json` publicly. Maintain Apache access restrictions (`Require all denied`).
5. **Anti-AI-Slop**: Zero occurrences of `Gemini_Generated_Image...` or `example.com`. Maintain formal Indian statutory language for legal notices.

## 4. Standard Operational Workflow
`Explore` -> `Plan (/plan-feature)` -> `Code` -> `Verify (/verify)` -> `Commit (/commit)`
