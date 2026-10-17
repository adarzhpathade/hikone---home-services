# Design System & Visual Specification

This document defines the visual design system extracted directly from the design reference image [`color ref.jpg`](file:///E:/Projects/Products/Urban/references/screenshots/color%20ref.jpg). It serves as the primary guideline for all frontend components and will inform the **`AGENTS.md`** instruction file.

---

## 1. Aesthetic Identity

* **Theme**: Modern Japanese / Scandinavian Editorial Minimalist (*"Hikone"* aesthetic).
* **Tone**: Quiet luxury, architectural structure, generous white/cream space, subtle hairline borders, and high contrast typography.
* **Feel**: Unlike typical noisy on-demand apps with heavy primary gradients, this design treats service packages like high-end curated catalog items.

---

## 2. Extracted Color Palette

```
  [ Base Canvas ]     [ Card Surface ]     [ Hairline Border ]     [ Deep Ink Text ]
      #EEEFEA             #E5E6E1                #E3E4DF               #0F100E
```

### Canvas & Surfaces
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| **`bg-base`** | `#EEEFEA` | Main page body, header background, footer background. Warm linen/alabaster tone. |
| **`bg-surface`** | `#E5E6E1` | Service cards, category tile backgrounds, container blocks. |
| **`bg-surface-hover`** | `#DFE0DA` | Hover / active state on cards and category pills. |
| **`bg-elevated`** | `#F5F6F2` | Modals, bottom sheet drawers, dropdown popovers. |

### Typography & Ink
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| **`text-primary`** | `#0F100E` | Headings, service titles, bold active prices (`₹599`), brand logo. Pitch ink black. |
| **`text-secondary`** | `#6B6C67` | Subheaders, navigation links, duration tags (`45 mins`), inclusions. Warm slate gray. |
| **`text-muted`** | `#9E9F99` | Strikethrough original prices, placeholder text, footer copyright. |
| **`text-inverted`** | `#EEEFEA` | Text on solid dark buttons or active badges. |

### Borders & Structural Dividers
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| **`border-subtle`** | `#E3E4DF` | Thin 1px section divider lines, header bottom border, footer top border. |
| **`border-card`** | `#D8D9D3` | Service card outlines, slot button borders. |
| **`border-strong`** | `#0F100E` | Active selected state border (e.g. selected time slot, active category). |

### Editorial Accents
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| **`accent-indigo`** | `#2D4263` / `#4D6A94` | Architectural deep blue; trusted partner badges, warranty stamps. |
| **`accent-terracotta`** | `#A96A4B` | Warm copper/terracotta; promotional badges, discount callouts (*"Save ₹150"*). |
| **`accent-kraft`** | `#A48A6C` | Warm craft tan; secondary badges and neutral tags. |

---

## 3. Typography Hierarchy & Font Roles

Mapped to the local fonts in [`references/fonts/`](file:///E:/Projects/Products/Urban/references/fonts):

```
       BRAND / HERO HEADINGS           UI LABELS / PRICING               BODY TEXT & FORMS
   ┌───────────────────────────┐   ┌─────────────────────────┐   ┌───────────────────────────┐
   │     Mona Sans Variable    │   │     Manrope Variable    │   │       Inter Variable      │
   │  - Clean modern display   │   │  - Clean numerals       │   │  - High legibility        │
   │  - Uppercase section tags │   │  - ₹ Currency & ratings │   │  - Micro-descriptions     │
   └───────────────────────────┘   └─────────────────────────┘   └───────────────────────────┘
```

* **Display & Hero Titles**: `Mona Sans` (Weight `600` – `700`, uppercase tracking `tracking-tight` or wide letterspaced `tracking-widest` for tags like `"ALL SERVICES"`).
* **Service Names & Numbers**: `Manrope` (Weight `500` – `700`, perfect proportional tabular figures for `₹899` and `4.8★`).
* **Descriptions & Inclusions**: `Inter` (Weight `400` – `500`, high legibility for small print).

---

## 4. UI Component Design Rules

### A. Service Cards
* **Background**: Solid `#E5E6E1` with zero or minimal shadow.
* **Borders**: Clean 1px `#D8D9D3` or borderless against `#EEEFEA` base.
* **Border Radius**: Subtle (`rounded-sm` or `rounded-md`, 4px–8px). Avoid overly bubbly round pill corners for cards to preserve the editorial architecture.
* **Pricing Treatment**: Strikethrough original price in `#9E9F99` immediately followed by bold current price in `#0F100E`.

### B. Category Switcher / Navigation
* Clean horizontal text pills or minimal underline slider using `#0F100E` for the active indicator.
* Inactive items: `#6B6C67`. Hover: `#0F100E`.

### C. Buttons & CTAs
* **Primary CTA** (`[+ Add]`, `[Book Slot]`, `[View Cart]`):
  * Background: `#0F100E` (Solid ink black)
  * Text: `#EEEFEA` (Warm linen white)
  * Radius: Subtle 4px (`rounded-sm`) or 6px
* **Secondary / Ghost CTA**:
  * Border: 1px `#D8D9D3`
  * Text: `#0F100E`
  * Background: Transparent or `#E5E6E1`

### D. Bottom Sheet / Cart Drawer (Mobile & Responsive)
* Background: `#F5F6F2`
* Handle bar: `#D8D9D3` (32px wide, 4px high, rounded)
* Smooth spring drag-to-dismiss via `motion`.

---

## 5. Tailwind CSS Configuration Snippet

When configuring Tailwind CSS, use these mapped tokens:

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#EEEFEA',
          surface: '#E5E6E1',
          'surface-hover': '#DFE0DA',
          elevated: '#F5F6F2',
        },
        ink: {
          DEFAULT: '#0F100E',
          secondary: '#6B6C67',
          muted: '#9E9F99',
          inverted: '#EEEFEA',
        },
        hairline: {
          subtle: '#E3E4DF',
          DEFAULT: '#D8D9D3',
          strong: '#0F100E',
        },
        accent: {
          indigo: '#2D4263',
          terracotta: '#A96A4B',
          kraft: '#A48A6C',
          slate: '#4D6A94',
        },
      },
      fontFamily: {
        display: ['var(--font-mona)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        num: ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
};
```

---

## 6. How to Feed this into the `AGENTS.md` File

When creating the `AGENTS.md` file later:
1. Specify that any AI agent generating code **must adhere strictly** to the `canvas`, `ink`, and `hairline` color tokens.
2. Mandate the **font pairing rule** (Mona Sans for display, Inter for body, Manrope for numbers/pricing).
3. Enforce the **architectural service layer** (no hardcoded data inside components).
