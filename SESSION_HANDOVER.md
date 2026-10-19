# Session Handover: Urban Service Platform

**Date:** 2026-10-19
**Workspace:** `E:\Projects\Products\Urban`
**Status:** Four routes work: home (`/`), AC catalog (`/ac`), Fridge catalog (`/fridge`) and service detail (`/services/[slug]`), with a working cart. `tsc`, `npm run lint` and `next build` pass. All pages prerender (static). Git repository configured on branch `main` and pushed to remote `origin` (`https://github.com/adarzhpathade/hikone---home-services.git`). Working tree clean, ready for Vercel deployment.

---

## 1. Read these first (in order)
1. `AGENTS.md`: strict rules for agents and developers (design, motion, performance, architecture).
2. `REQUIREMENTS.md`: stack, working method, requirements.
3. `references/design-system.md` and `references/design-tokens.json`: visual spec and colors.
4. `references/screenshots/color ref.jpg`: the "Hikone" visual reference.

## 2. Project goal
A modern, high-motion, fast-loading frontend prototype of an on-demand appliance service platform (Urban Company style) in the **latest Next.js (App Router, `cacheComponents` on)**. Frontend only, built so a backend can be plugged in later with **zero UI changes**. The brand shown in the UI is **Hikone**. Scope is **AC and Fridge services only**, single-unit.

## 3. Working method (decided by the user)
- Build **page by page, component by component**. Don't scaffold pages that were not asked for.
- For visual or layout changes the user often asks "tell me first" or "what vision do you have?". Propose (what, why, files, a recommendation, open questions), then wait for "go" / "do it". Small, clearly specified edits can just be done.
- Keep loading time low (`AGENTS.md` section 5).
- The user views a **phone-width window** mostly. Check mobile first, desktop second.
- **Other agents and the user edit this repo concurrently** (home page, menu and catalog header were changed after I wrote them). Re-read a file right before editing it and never revert changes you didn't make.

## 4. Routes and what is built

| Route | Where | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` -> `features/home/components/*` | Home: centred compact hero (label, headline, rating line, search field), "Choose a service" hub cards (AC, Fridge) with image cutouts, 4 offers, 4 quality standards. One gap (56px mobile, 80px desktop) between the hero and every section, set on `main` with `gap-14 sm:gap-20`. |
| `/ac` | `src/app/ac/page.tsx` | `ServiceCatalogView` titled "AC Services": `CatalogHero` (title, rating line) then `ServiceGrid` grouped into one section per category. |
| `/fridge` | `src/app/fridge/page.tsx` | Same view with the fridge data. |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` + `service-detail-content.tsx` | Detail: image/tone hero, badge, title, rating, price and stepper, description (3 lines with Read more), highlights, inclusions, ratings and reviews, "You may also like". `generateStaticParams` covers all services. |

Pages use `"use cache"` (`cacheLife("hours")`) data helpers so they are static and navigation is instant. Home and catalog pages have **no Suspense fallback** on purpose; the detail route keeps one for unknown slugs.

### Navigation (`src/components/navigation/`)
- `site-header.tsx`: sticky, 64px mobile / 80px desktop, viewTransitionName `site-header`. Mobile: menu button (burger), brand, search icon. Desktop: brand, links (Home, Services, About, Contact), search icon. **There is no cart icon in the header**; the cart opens from the mobile menu's cart button (when the page passes `onCartClick`) and from the sticky `CartBar` once something is added. `Ctrl/Cmd+K` opens search.
- `mobile-menu.tsx` (+ `menu-icon.tsx`, `menu-items.ts`): full-screen flat menu as a Radix Dialog, opened with a hairline sweep then a canvas that grows from the header (transform and opacity only). Items come from `MENU_NAV_LINKS` (Home, Services -> `/#service-hubs`, About -> `#about`, Contact -> `#contact`), with an active marker and a cart button showing the item count. Dynamically imported on first open. Focus returns to the menu button on close. About and Contact point at dead anchors.
- `search-dialog.tsx`: flat search panel (full screen on mobile, 32rem top panel on desktop), no shadow, blur or scrim. Opens like the menu, popular-search chips, hairline result rows, arrow keys and Enter, combobox roles. Uses `serviceApi.searchServices`. State resets because the inner panel mounts per open; stale responses are ignored.
- `site-footer.tsx` (+ `footer-links.ts`, `back-to-top.tsx`): brand cell and three link groups in a collapsed hairline grid (Services, Company, Legal), Back to top, copyright, and a quiet oversized HIKONE wordmark. About, Contact, Terms, Privacy are shown muted with "Soon". No fake contact details or social links. Top margin equals the home section gap.

### Page transitions
Forward slides content in from the right, back from the left (350ms, 60px, transform and opacity). Implemented with `TransitionLink` (`components/ui/transition-link.tsx`) calling `document.startViewTransition`, plus `NavigationSettled` in the root layout and `lib/navigation-transition.ts`. `main` of each page has class `vt-page`. **Do not switch to React's `<ViewTransition>`**: it only fires when navigation is slow, so with cached pages it did nothing. The browser's own back button does not slide. Back links use `router.back()` when the previous in-app path matches, so scroll position is restored. Reduced motion, modifier-clicks and same-URL links skip the transition. Links prefetch the full page (`prefetch`).

### Catalog and cards (`src/features/services/`)
- `service-card.tsx`: tone block with `ServiceThumb`, title, rating line, optional badge line (indigo gets a check; terracotta/kraft plain text), price (strikethrough original, terracotta "Save"), stepper, two inclusion bullets. Image and title are `TransitionLink`s.
- `service-thumb.tsx`: fills a `relative` parent with `next/image` (object-contain, no alt, sizes passed in) and falls back to the monogram (`getMonogram`) if there is no image or it 404s. Used by the card, the detail hero (priority) and recommendation cards.
- `service-grid.tsx`: one `<section id="section-<slug>">` per category with an `h2` and count, grid of collapsed hairline cells, `scroll-mt-40 sm:scroll-mt-48`.
- `catalog-overview.tsx`: `CatalogHero` (big title and rating line). It also exports **compat stubs** (`CatalogHeading`, `CatalogCover`, `CategoryNav`, `CategoryTiles = () => null`) left by another agent; remove them when nothing imports them.
- The sort toolbar, category tabs, jump tiles, cover row and breadcrumb strip were all built and then **removed** by the user. `SORT_OPTIONS` and `getServices({ sortBy })` still exist but nothing uses them.
- `service-detail-hero.tsx`, `service-reviews.tsx`, `service-recommendations.tsx`: detail page sections. `service-detail-sheet.tsx` is **unused** (old hand-built sheet with `rounded-2xl`); delete it.

### Cart (`src/features/cart/`)
Zustand + `persist` (key `urban-cart`, `skipHydration: true`; pages call `persist.rehydrate()` in an effect). Selectors `selectQuantity`, `selectCount`, `selectTotal`, `selectSavings`. `quantity-stepper.tsx`, `cart-bar.tsx` (sticky bottom bar, dynamic), `cart-drawer.tsx` (Radix Dialog, bottom sheet on mobile, right panel from 640px, **Continue does nothing yet**). On the detail page the drawer belongs to `service-detail-content.tsx`, and the header is rendered without `onCartClick`, so **the menu's cart button is absent on detail pages** (CartBar still works).

### Data (`src/mocks/services-data.ts`, `src/features/services/api.ts`)
- Lists: `MOCK_AC_SERVICES` (9), `MOCK_FRIDGE_SERVICES` (8), categories, summaries (rating, bookings, cover). Detail extras (reviews, highlights, long descriptions, related ids) are keyed by service id for AC.
- Api methods include `getCategories`, `getACServices`, `getFridgeServices`, `getCatalogSummary`, `getServiceBySlug`, `getServiceSlugs`, `getRelatedServices`, `searchServices`, category overviews. The mock api simulates ~300ms latency (search 100ms).
- **All figures, ratings, promo codes, reviews and badge labels are invented placeholders.**
- Home page content (hubs, offers, standards, hero text) is written as typed constants **inside the components**, not behind the api layer. That breaks the "UI never touches mock data" rule; move it into the api when convenient.

### Images (`public/images/`)
- `home/home-ac.png`, `home/home-fridge.png`: hub card cutouts (transparent PNG 1536x1024, served as ~10KB WebP).
- `ac/<service-slug>.png`: AC thumbnails by slug. All 9 AC services have photos.
- `ac-not-cooling-inspection-repair-1-ac.png` and its duplicate copies were rejected by the user as poor quality. Replaced with `home/home-ac.png` (`HOME_AC_IMAGE` in `src/mocks/services-data.ts`).
- All fridge services share `home/home-fridge.png` (`FRIDGE_IMAGE` constant in the mocks).
- `public/images/services/` holds unrelated leftover template images (unused).

### Shared helpers
`lib/format.ts` (`formatPrice`, `getMonogram` which skips symbols like "&"), `lib/use-media-query.ts`, `lib/navigation-transition.ts`, `components/ui/bag-icon.tsx`, `transition-link.tsx`. `globals.css` has the `scrollbar-none` utility and all view-transition CSS.

### Dependencies added so far
`zustand`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu` (the dropdown is only needed if the sort control returns).

## 5. Design decisions
- **Flat and quiet.** No shadows, gradients, blur, scrims, filled coloured badge pills, dashed boxes or heavy borders. The card language is: 1px hairline collapsed cells (`-mt-px -ml-px`), flat tone blocks, text-only badge lines, mixed-case card titles, small tracked uppercase labels, solid ink primary button. The home page may differ in layout but must use the same pieces (it was restyled once because it looked like an ad landing page).
- **Rejected, do not reintroduce:** the frame + diagonal-hatch layout (2026-10-18), the tab strip for categories, the breadcrumb strip, the ad strip above the header, a floating shadowed search card.
- **Tokens only.** Canvas `#EEEFEA`, surface `#E5E6E1`, surface-hover `#DFE0DA`, elevated `#F5F6F2`, ink `#0F100E`, secondary `#6B6C67`, muted `#9E9F99`, hairline `#D8D9D3` / subtle `#E3E4DF`, terracotta `#A96A4B`, indigo `#2D4263`, kraft `#A48A6C`. A few `colorTone` hexes live in the mock data and a few `#E5E6E1` fallbacks remain in components (technical debt).

## 6. Known issues and gotchas
- **User's dev server on :3000 is usually running. Never kill it.** It can serve stale CSS and shows detail-page skeletons on cold routes that production does not. Verify with `npm run build`, `npx next start -p 3001`, then stop only the 3001 process. Playwright scripts need `NODE_PATH` pointing at the npx cache. Keep screenshots and scripts out of the repo.
- Browser back/swipe does not slide; breadcrumb and back arrow no longer exist, so detail pages have no on-screen back control besides the header and menu.
- `cartCount` was removed from `SiteHeader` props; the menu reads the cart store itself.
- `persist` carts saved before lines had `duration`, `colorTone`, `originalPrice` show blanks until re-added.
- `references/` inconsistencies: `border.strong` is `#0F100E` in the markdown but `#6B6C67` in the JSON (follow the markdown); `references/README.md` mentions Montserrat (not used).
- `TrendingServices` (`features/home`) and `serviceApi.getTrendingServices` are unused.
- The home page's `scroll-mt` and the services link `/#service-hubs` assume the hub section id `service-hubs`.

## 7. Suggested next steps
1. **Repository & Deploy**: Initial git commits pushed to `main` at `https://github.com/adarzhpathade/hikone---home-services.git` (COMPLETED).
2. **AC & Fridge Thumbnails**: All 9 AC services and 8 fridge services have active images without missing 404s (COMPLETED).
3. **Mobile & Theme Color**: Address bar theme-color `#EEEFEA` and safe-area insets configured (COMPLETED).
4. Replace About and Contact dead anchors with real pages or "Soon" states, and Terms/Privacy.
5. Lift cart state so the menu's cart button works on detail pages.
6. Booking step behind the cart's Continue button (`bookingApi`, `features/booking`).
7. Move the home page content behind `serviceApi`; delete `service-detail-sheet.tsx`, `TrendingServices` and the compat stubs.
8. Fridge-specific images and a real fridge category overview.

## 8. Rules for the next agent
- Follow `AGENTS.md` strictly (tokens, fonts, motion only transform/opacity, server components by default, service layer).
- Propose before sweeping visual changes; verify in a browser and with `next build` before calling a component done.
- Check any new page against the catalog for visual consistency, and measure spacing in the DOM instead of eyeballing.
- Memory notes for this project live in `C:\Users\adarz\.claude\projects\E--Projects-Products-Urban\memory\` (index in `MEMORY.md`).
