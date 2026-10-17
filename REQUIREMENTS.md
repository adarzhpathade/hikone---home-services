# REQUIREMENTS.md

## Goal
A modern, high-motion, fast-loading frontend prototype of an on-demand service platform (Urban Company style). It is frontend only, with backend integration left for later.

## Working method
- Pages are built **one by one**, and each page **component by component**.
- Features are decided while building each part. Nothing is pre-scoped beyond the current component.
- After each component or page: review performance and visuals, then proceed.

## Stack
| Concern | Choice |
| --- | --- |
| Framework | Next.js (latest, App Router), TypeScript strict |
| Styling | Tailwind CSS, with tokens from `references/design-tokens.json` |
| Primitives | Radix UI |
| Motion | `motion` with `LazyMotion` (`domAnimation`, `m.*`) |
| State | Zustand with `persist` |
| Fonts | Mona Sans, Manrope, Inter (local variable `.woff2`) via `next/font/local` |
| Data | Typed service layer with mock implementations (~300ms delay) |

## Design requirements
- Use the existing color tokens only (`references/design-tokens.json`, `references/design-system.md`). No new colors.
- Hikone-style editorial minimalism: linen canvas, flat cards, hairline borders, small radii, and generous whitespace.
- Modern UI with smooth, purposeful motion (spring or short ease-out, transform/opacity only).
- Mobile-first, responsive, and accessible, with reduced-motion support.

## Performance requirements
- Server Components by default, with client components only at the leaves.
- Dynamic imports for drawers, sheets, and below-the-fold UI.
- `next/image` everywhere, with skeletons and no layout shift.
- Minimal dependencies and a small first-load JS per route.
- Lighthouse mobile performance of 90+ as the target.

## Architecture requirements
- Feature-based modules under `src/features/`.
- UI calls only service functions. Mock data is never imported into components.
- Swapping in a real backend must require changes only in the api layer.

## Out of scope for now
- Real backend, payments, and auth providers.
- Features not yet needed by the component currently being built.

## Reference files
- `AGENTS.md`: rules for agents and developers
- `SESSION_HANDOVER.md`: context and decisions so far
- `references/design-system.md`, `references/design-tokens.json`: visual spec
- `references/screenshots/color ref.jpg`: visual reference
- `references/fonts/`: font files
