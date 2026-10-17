# Session Handover: Urban Service Platform

**Date:** 2026-10-17
**Workspace:** `E:\Projects\Products\Urban`
**Status:** Planning and docs complete. **No code and no Next.js app exist yet.** The next step is scaffolding.

---

## 1. Read these first (in order)
1. `AGENTS.md`: strict rules for agents and developers (design, motion, performance, architecture).
2. `REQUIREMENTS.md`: stack, working method, and requirements.
3. `references/design-system.md` and `references/design-tokens.json`: visual spec and colors.
4. `references/screenshots/color ref.jpg`: the "Hikone" visual reference.

## 2. Project goal
A modern, high-motion, fast-loading frontend prototype of an on-demand service platform (Urban Company style) in the **latest Next.js (App Router)**. It is frontend only, built so a backend can be plugged in later with **zero UI changes**.

## 3. Working method (decided by the user)
- Build **page by page, and each page component by component**.
- Features are **not pre-scoped**. They are decided while building each component.
- Don't scaffold pages or features that were not asked for.
- Keep loading time low throughout (see Performance below).

## 4. Decisions made

### Stack
| Concern | Choice |
| --- | --- |
| Framework | Next.js latest, App Router, TypeScript strict |
| Styling | Tailwind CSS with tokens from `design-tokens.json` |
| Primitives | Radix UI |
| Motion | `motion` (formerly Framer Motion) with `LazyMotion` + `domAnimation` and `m.*`. GSAP is not used. |
| State | Zustand with `persist` (cart, booking) |
| Fonts | Mona Sans (display), Manrope (prices and numbers), Inter (body), local variable `.woff2` via `next/font/local` |

### Architecture (backend-ready)
- Feature modules in `src/features/{services,cart,booking,tracking}`, with shared UI in `src/components/ui`.
- UI never imports mock data. It calls typed service functions (`serviceApi.getCategories()`, `bookingApi.createBooking()`) that return promises with a ~300ms simulated delay. A real backend replaces only the api implementation.

### Design
- Scandinavian / Japanese editorial minimalism: warm linen canvas, flat surfaces, 1px hairline borders, small radii (4–8px), generous whitespace.
- **Use only the existing color tokens. Do not invent colors, and never hardcode hex in components.**
- Primary CTA is solid ink `#0F100E` with `#EEEFEA` text. Pricing is a muted strikethrough original price, then a bold ink current price. Terracotta is for discounts and indigo for trust badges.

| Token | Hex |
| --- | --- |
| Canvas | `#EEEFEA` |
| Surface | `#E5E6E1` |
| Elevated | `#F5F6F2` |
| Ink | `#0F100E` |
| Secondary | `#6B6C67` |
| Muted | `#9E9F99` |
| Hairline | `#D8D9D3` (default), `#E3E4DF` (subtle) |
| Terracotta | `#A96A4B` |
| Indigo | `#2D4263` |
| Kraft | `#A48A6C` |

### Motion rules
- Animate only `transform` and `opacity`, with spring or 150–400ms ease-out transitions.
- Use `AnimatePresence` for mount/unmount, `layout` / `layoutId` for shared transitions, and drag for bottom sheets.
- Respect `prefers-reduced-motion`.

### Performance rules
- Server Components by default, with `"use client"` only on leaf components.
- `next/dynamic` for drawers, sheets, and below-the-fold UI.
- `next/image` with explicit sizes, `priority` only for the LCP image, skeletons, and no layout shift.
- Minimal dependencies. Check bundle impact before adding any package.
- Target Lighthouse mobile 90+, and check `next build` size output after each page.

## 5. Known inconsistencies in the references
- The `border.strong` token is `#0F100E` in `design-system.md` but `#6B6C67` in `design-tokens.json`. **Follow the markdown (`#0F100E`) and update the JSON** when scaffolding.
- `references/README.md` shows Inter as the main sans font, with a Montserrat option. `AGENTS.md` takes priority: Mona Sans, Manrope, and Inter, with no Montserrat unless requested.
- The README's font loading example points at `references/fonts/`. **Copy the fonts into the app** (for example `src/app/fonts/`) instead.

## 6. File inventory

```text
E:\Projects\Products\Urban\
├── AGENTS.md                 # Agent/developer rules (strict)
├── REQUIREMENTS.md           # Stack, method, requirements
├── SESSION_HANDOVER.md       # This file
└── references/
    ├── README.md
    ├── design-system.md      # Visual and component spec (+ Tailwind snippet)
    ├── design-tokens.json    # Machine-readable tokens
    ├── screenshots/color ref.jpg
    └── fonts/                # Inter, Manrope, MonaSans, Montserrat (variable .woff2)
```

## 7. Next steps
1. Scaffold the Next.js app (App Router, TypeScript, Tailwind) in this workspace. Copy the fonts in, wire the tokens into Tailwind, and set up `LazyMotion` in the root layout.
2. Create the folder structure from `AGENTS.md` section 6, with shared `ui` primitives (Button, Badge, Price, Sheet) as needed.
3. Start with the **first page the user picks** (likely the Discovery Gateway: header with location selector and search, then editorial category cards). Build it component by component.
4. Later pages the user has mentioned: service catalog with cart drawer, slot booking, and live order tracking. These are not yet scoped.

## 8. Rules for the next agent
- Follow `AGENTS.md` strictly, especially the design tokens, the performance rules, and the service layer.
- Ask the user which page and component comes next. Don't build ahead.
- Verify each component in the browser and with `next build` before moving on.
