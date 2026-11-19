---
description: Server security, API integrity, CRM ingestion and WhatsApp dispatch rules
paths:
  - "api/**"
  - "publish_website/api/**"
  - ".htaccess"
  - "publish_website/.htaccess"
  - "main.js"
  - "publish_website/main.js"
---

# Security & API Engineering Rules

1. **Lead Ledger Protection**:
   - `enquiries-log.json` must be strictly forbidden from public web requests using Apache `Require all denied` in `.htaccess` and `api/.htaccess`.
   - Never print or return raw client lead records in public API responses.

2. **Production CRM Ingestion Endpoint**:
   - `crmEndpoint` must dynamically route to `http://localhost:3000/api/v1/webhooks/website-ingest` in local environments (`localhost`/`127.0.0.1`) and `https://crm.radhyarealty.com/api/v1/webhooks/website-ingest` in production.
   - Enforce header `X-Radhya-Webhook-Token: radhya-sec-99532-enterprise-token-2026`.

3. **Non-Blocking WhatsApp & API Dispatches**:
   - Direct WhatsApp dispatches must target owner `919953227091` (+91 99532 27091, Rakesh Raj Shukla).
   - Background API logging (`api/whatsapp-enquiry.php`) must be non-blocking with zero unhandled promise rejections.
