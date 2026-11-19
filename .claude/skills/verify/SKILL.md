---
name: verify
description: Verify git diff style.css is empty (unless CSS changes were explicitly requested), parse all JSON-LD blocks in *.html via JSON.parse(), check zero example.com / Gemini_Generated_Image strings remain, and run playwright-cli console check.
---

# Verification Protocol (/verify)

Execute comprehensive project audit:
1. **Style Protection**: Verify `style.css` has zero unintended modifications.
2. **Schema Integrity**: Parse all `<script type="application/ld+json">` blocks across `*.html` using `JSON.parse()`.
3. **Anti-AI-Slop & Placeholders**: Verify zero occurrences of `example.com` or `Gemini_Generated_Image`.
4. **Console & Browser Test**: Run Playwright headless check to confirm 0 console errors and 0 page exceptions.
