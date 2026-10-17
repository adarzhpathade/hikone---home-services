# AGENTS.md: Urban Service Platform

Rules for any AI agent or developer working in this repo. Read this file, `REQUIREMENTS.md`, and `references/design-system.md` before writing code.

## 1. Project

A modern, high-motion frontend prototype for an on-demand service marketplace (Urban Company style) in the latest **Next.js (App Router)**. It is a frontend only, built so a backend can be plugged in later with zero UI changes.

## 2. How we work: page by page, component by component

- We build **one page at a time**, and each page **one component at a time**.
- Features are not decided up front. They emerge while building each component. Do not scaffold or implement pages that were not asked for.
- Per component: build it, make it work in isolation, check its performance and motion, then move on.
- Don't add speculative features, abstractions, or dependencies. Add only what the current component needs.
- Keep each component small, typed, and reusable. Page files compose components and stay thin.

## 3. Design system (strict)

Source of truth: `references/design-tokens.json`, `references/design-system.md`, and the reference image `references/screenshots/color ref.jpg`. **Colors already exist there. Do not invent new ones.**

- Use only the `canvas`, `ink`, `hairline`, and `accent` tokens. Wire them into Tailwind as CSS variables / theme tokens. **Never hardcode hex values in components.**
- Aesthetic: Scandinavian / Japanese editorial minimalism. Warm linen canvas, flat surfaces, 1px hairline borders, generous whitespace, and quiet luxury.
- Radii are small (4–8px). No bubbly pills for cards. Avoid heavy shadows and gradients.
- Primary CTA is solid ink `#0F100E` with `#EEEFEA` text. Secondary is a hairline-bordered ghost button.
- Pricing: strikethrough muted original price, then bold ink current price. Discounts use terracotta.
- Trust badges use indigo.

### Typography
| Role | Font | Use |
| --- | --- | --- |
| Display | Mona Sans (600–700) | Hero, headings, uppercase tracked tags |
| Numbers | Manrope (500–700) | Prices, ratings, times, tabular figures |
| Body | Inter (400–500) | Descriptions, forms, inclusions |

- Fonts are local variable `.woff2` files from `references/fonts/`, copied into the app and loaded with `next/font/local` (`display: swap`, CSS variables `--font-mona`, `--font-manrope`, `--font-inter`).
- Load only the fonts and weights actually used. Montserrat is not used unless explicitly requested.

## 4. Motion (modern, but light)

- Use **`motion`** (formerly Framer Motion) with **`LazyMotion` + `domAnimation`** and the `m.*` components. Never import the full `motion` component bundle.
- Use `AnimatePresence` for mount/unmount, `layout` / `layoutId` for shared transitions, and drag gestures for bottom sheets.
- Animate only `transform` and `opacity`. Never animate width, height, top, or left.
- Use spring or short ease-out transitions (150–400ms). Motion should feel quick and purposeful, not decorative.
- Respect `prefers-reduced-motion` via `useReducedMotion` or `MotionConfig reducedMotion="user"`.
- Other motion libraries (for example Lenis for smooth scroll) are allowed only if the user asks and the bundle cost is justified. GSAP is not used.

## 5. Performance rules (loading time is a priority)

- **Server Components by default.** Add `"use client"` only to leaf components that need state, effects, or motion.
- Dynamic-import heavy or below-the-fold client components (cart drawer, sheets, modals) with `next/dynamic`.
- All images go through `next/image` with explicit sizes, `priority` only for the LCP image, and blur or color placeholders. Prefer AVIF/WebP and SVG icons.
- Avoid layout shift: reserve space for images, fonts, and async content. Use skeletons for loading states.
- Stream with `Suspense` boundaries around data-dependent sections.
- Keep the dependency list short. Check bundle impact before adding any package. Tree-shake icon imports.
- Lazy-load anything not needed for first paint. Prefetch likely next routes.
- Target Lighthouse performance 90+ on mobile and a small first-load JS per route. Run `next build` and review the size output after each page.

## 6. Architecture (backend-ready)

```
src/
  app/                  # routes (thin, compose components)
  features/
    services/ cart/ booking/ tracking/   # feature modules: components, hooks, api, types
  components/ui/        # shared primitives (Button, Sheet, Badge, Price...)
  lib/                  # utils, fonts, motion presets
  mocks/                # seed data, used only by the api layer
  styles/               # tokens, globals
```

- **UI never touches mock data directly.** Components call service functions (`serviceApi.getCategories()`, `bookingApi.createBooking()`) that return typed promises. The mock implementation simulates a ~300ms delay. A real backend replaces only the api implementation.
- Define domain types and api interfaces first, per feature.
- State is **Zustand** with `persist` for cart and booking. Keep stores small and use selectors to avoid re-renders.
- Primitives are **Radix UI** + Tailwind, accessible by default.

## 7. Code standards

- TypeScript strict. No `any`.
- Mobile-first responsive. Touch targets are at least 44px.
- Accessible: semantic HTML, labels, focus rings, keyboard support.
- Match the surrounding code's naming, comment density, and idiom.
- No hardcoded data, colors, or magic strings in components. Use tokens, types, and the api layer.

## 8. Definition of done (per component)

1. Uses design tokens and the correct fonts only.
2. Typed, and fetches data only through the service layer.
3. Responsive, accessible, and reduced-motion safe.
4. Client JS kept minimal (server component where possible).
5. Verified in the browser, and the build passes.
