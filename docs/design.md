# Design System — Radhya Realty Website

Radhya Realty uses a **White, Deep Navy & Royal Gold** luxury architectural palette paired with subtle frosted liquid-glass surfaces. All values below are grounded verbatim in `style.css`.

---

## 1. Color Palette & CSS Tokens

### 1.1 Core Brand Tokens (`:root` in `style.css`)
| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--navy-900` | `#060f20` | Deepest navy — dark text on gold buttons, legal header/footer, shadow base |
| `--navy-800` | `#0a1730` | Primary dark surface — `#intro`, buttons, filter inputs, popovers, cookie banner, body text on light canvas |
| `--navy-700` | `#0f2347` | Elevated dark surface — `.prop-card`, hover/focus inputs, modal gradient start |
| `--navy-600` | `#17305f` | Mid-navy — homepage division `.card`, liquid-glass gradient highlight |
| `--gold` | `#c9a24b` | Primary brand accent — borders, eyebrows, active chips, submit CTAs, brand SVG mark |
| `--gold-soft` | `#e3c883` | High-contrast light gold — button text on navy, prices, badges, toast text, `:focus-visible` rings |
| `--ink` | `#e9edf5` | Primary light text on navy surfaces |
| `--muted` | `#9aa8c2` | Secondary/body text on navy surfaces & placeholders |
| `--glass` | `rgba(255, 255, 255, .055)` | Subtle translucent glass fill on dark surfaces |
| `--line` | `rgba(255, 255, 255, .11)` | Subtle hairline borders on dark surfaces |

### 1.2 Page Canvas & Semantic Colors
| Context | Colors |
| :--- | :--- |
| **Main Page Canvas** | `#ffffff` (pure white), subtle `3%` SVG fractal-noise grain overlay, body prose `#4a5a78` |
| **Legal Pages (`data-page="legal"`)** | Editorial white `#ffffff`, headings `#0f172a`, body `#334155`, secondary `#475569`, muted meta `#64748b`, eyebrow `#926b1c`, card border `#e2e8f0`, contact box `#f8fafc` |
| **Status / Feedback** | Online/consent dot `#34c759` / `#22c55e`, WhatsApp accent `#25d366`, form error text `#ff9e9e` with `rgba(255, 60, 60, 0.16)` background and `#ff8585` border |
| **Strict Palette Rule** | **Zero purple or blue-violet gradients.** Every surface stays strictly within the White, Deep Navy, and Royal Gold palette. |

---

## 2. Typography

| Role | Font Family | Weight / Style | Size & Tracking |
| :--- | :--- | :--- | :--- |
| **Display Headings (`h1`, `h2`, `h3`, `.prop-card__body h4`, modal titles)** | `'Cormorant Garamond', Georgia, serif` | `600` (SemiBold), `line-height: 1.12–1.25` | `h1`: `clamp(2.4rem, 6vw, 4.4rem)`<br>`h2`: `clamp(1.8rem, 3.4vw, 2.6rem)`<br>`h3`: `1.45rem`<br>Card `h4`: `1.25rem`<br>Modal title: `clamp(1.5rem, 3vw, 2.2rem)` |
| **Body & UI Controls** | `'Manrope', system-ui, sans-serif` | `400`–`700`, `line-height: 1.6–1.75` | Body: `1rem` (`1.1rem` for `.lead`), Card copy: `0.88rem`, Modal desc: `0.95rem` |
| **Eyebrow Labels (`.eyebrow`, `.hero-eyebrow`)** | `'Manrope', system-ui, sans-serif` | `600`–`700`, `uppercase` | `0.75rem` (`clamp(0.96rem, 1.4vw, 1.15rem)` in hero), `letter-spacing: 0.22em–0.25em`, color `--gold` |
| **Price Readouts (`.prop-card__price`, `.prop-modal__price`)** | `'Manrope', system-ui, sans-serif` | `600`–`700`, `font-variant-numeric: tabular-nums` | Card: `0.92rem` (`--gold`), Modal: `1.05rem` (`--gold-soft`) |
| **Direct Leadership Modal (`#talkToTeamModal`)** | `-apple-system, BlinkMacSystemFont, "SF Pro Display" / "SF Pro Text", sans-serif` | `500`–`650`, tight `-0.015em`–`-0.025em` tracking | Native iOS-style clarity for direct call/WhatsApp cards |

---

## 3. Button & Interactive Control Styles

| Component | Class / Selector | Default Appearance | Hover / Active / Focus State |
| :--- | :--- | :--- | :--- |
| **Primary Classic Button** | `.btn` | `background: var(--navy-800)`, `color: var(--gold-soft)`, `border: 1px solid var(--gold)`, `border-radius: 2px`, `padding: .9rem 1.7rem`, `letter-spacing: .04em` | Hover: `background: var(--gold)`, `color: var(--navy-900)` |
| **Card "View details" CTA** | `.prop-card__more` | `min-height: 44px`, `padding: .65rem 1.2rem`, `background: rgba(201,162,75,0.16)`, `border: 1px solid rgba(201,162,75,0.5)`, `border-radius: 6px`, `color: var(--gold-soft)`, uppercase `0.8rem` + `↗` arrow | Hover: solid `--gold` fill, `--navy-800` text, `translateY(-2px)`, gold shadow |
| **Modal "Enquire Now" CTA** | `.prop-modal__cta` | `min-height: 44px`, `padding: .9rem 1.85rem`, `border-radius: 4px`, `background: var(--navy-800)`, `color: var(--gold-soft)`, `border: 1.5px solid var(--gold)` | Hover: solid `--gold` fill, `--navy-900` text, `translateY(-2px)` |
| **Modal "Share" Button (Exclusive)** | `.prop-modal__share` | Placed beside `.prop-modal__cta` in `.prop-modal__actions`. `min-height: 44px`, `padding: .85rem 1.45rem`, `border-radius: 4px`, `background: rgba(201,162,75,0.14)`, `border: 1.5px solid var(--gold)`, `color: var(--gold-soft)` + 17px SVG icon | Hover/Focus: solid `--gold` fill, `--navy-900` text, `translateY(-2px)`, `2px solid var(--gold-soft)` focus ring |
| **"Talk to our team" Pill** | `.talk-btn-liquid-glass` | Full pill (`border-radius: 9999px`), navy linear gradient + `blur(24px)`, `border: 1.5px solid var(--gold)`, white `600` text + gold phone SVG | Hover: gold gradient (`#dfbc62` → `#c9a24b`), `--navy-900` text, `translateY(-2px) scale(1.02)`; Active: `scale(0.97)` |
| **Form Submit CTA** | `.radhya-submit-btn` | Full-width `background: var(--gold)`, `color: var(--navy-900)`, `border-radius: 8px`, `font-weight: 700`, uppercase | Hover: `background: var(--gold-soft)`, `translateY(-1px)`; Disabled: `opacity: 0.7` |
| **Roles Menu Trigger** | `.menu-btn` | Pill (`999px`), `background: var(--navy-800)`, `border: 1px solid var(--line)`, `color: var(--ink)`, uppercase `0.85rem`, 2-line animated burger | Hover / `aria-expanded="true"`: `--navy-700`, gold border, `--gold-soft` text, burger morphs to `×` |
| **Filter Trigger & Chips** | `.tsf-filter-btn`, `.tsf-chip`, `.tsf-subchip` | Pill (`999px`) or `6px` subchips; `--navy-800` / `--glass` fill, `--line` border | Active chip: solid `--gold` fill, `--navy-900` bold text; active filter badge in `--gold` |
| **Header Social Icons** | `.social a` | `40×40px` desktop (`44×44px` mobile hit area with `32×32px` visual ring), circular `border: 1px solid var(--line)`, `18px` stroke icons | Hover: `--gold` border, `--glass` fill, `translateY(-2px)`; Focus: `2px solid var(--gold-soft)` outline |
| **Slider Arrows** | `.prop-slider__btn` | `32×32px` glass circle (expanded `44×44px` pseudo hit target), `rgba(10,23,48,0.75)` + gold border | Hover: `--gold` fill, `--navy-800` chevron, `scale(1.1)` |

---

## 4. Surfaces, Motion & Responsive Rules

- **Liquid-Glass Recipe:** Semi-transparent navy gradient (`rgba(23,48,95,.48)` → `rgba(10,23,48,.64)`), `backdrop-filter: blur(16px–28px) saturate(180%–200%)`, `1px solid rgba(227,200,131,.35)`, and `inset 0 1px 0 rgba(255,255,255,.25)` top specular edge.
- **Easing Curves:**
  - Standard smooth: `--ease: cubic-bezier(.22, .8, .24, 1)`
  - Header pill bounce: `--ease-pop: cubic-bezier(.34, 1.56, .64, 1)`
- **Reduced Motion (`prefers-reduced-motion: reduce`):** Disables marquee ribbons, header bounce animations, modal transitions, and switches `#intro` to a `190ms` cross-fade while preserving event sequencing.
- **Key Responsive Breakpoints:**
  - `>= 1280px`: Desktop side-by-side `.role-hero-header` with `padding-bottom: 1rem` (non-collapsing).
  - `<= 1024px`: Stacked `.role-hero-header` (`gap: 0.9rem`), full-width search/filter bar.
  - `<= 768px`: `16px` forced input font size (prevents iOS Safari zoom); `44×44px` social tap targets.
  - `<= 620px`: Compact header (`height: 30px` brand mark, `44×44px` icon-only menu button).
  - `<= 480px`: Bottom-sheet modal presentation (`align-items: flex-end`, `max-height: 88dvh–90dvh`, safe-area bottom padding) and stacked/flex-wrapped `.prop-modal__actions`.
  - `<= 360px`: Tight single-column grids and `overflow-wrap: anywhere` contact rows for zero overflow.
