---
description: SEO, Semantic HTML, Schema and AEO validation rules
paths:
  - "*.html"
  - "publish_website/*.html"
  - "sitemap.xml"
  - "robots.txt"
  - "llms.txt"
---

# SEO and HTML Architectural Rules

1. **Title and Meta Description Constraints**:
   - Every page must have exactly ONE unique primary keyword target.
   - `<title>` length: 50–60 characters. Format: `{Target Keyword} in {Locality} | Radhya Realty`.
   - `<meta name="description">` length: 140–160 characters. Must contain active value proposition and contact callout.

2. **Semantic Schema & Structured Data**:
   - Embed valid Schema.org JSON-LD `@graph` linking Organization, LocalBusiness, BreadcrumbList, and FAQPage.
   - All JSON-LD blocks must parse cleanly via `JSON.parse()`.

3. **Social Card & Open Graph**:
   - Social preview image: `https://radhyarealty.com/radhya-realty-preview.jpg` (1200x630px, <300KB).
   - Zero occurrences of `Gemini_Generated_Image...` or `example.com`.

4. **Image & Resource Performance**:
   - All below-the-fold images must have `loading="lazy" decoding="async"` and descriptive alt text.
   - Core stylesheets and scripts must be preloaded in `<head>`.
