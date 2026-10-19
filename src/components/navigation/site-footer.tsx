import Link from "next/link";
import { TransitionLink } from "@/components/ui/transition-link";
import { BackToTop } from "./back-to-top";
import { FOOTER_GROUPS, FOOTER_TAGLINE } from "./footer-links";

const CELL_CLASS = "-mt-px -ml-px border border-hairline p-4 sm:p-5";

const LINK_CLASS =
  "flex min-h-11 items-center font-sans text-sm text-ink transition-colors hover:text-ink-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none";

export function SiteFooter() {
  return (
    <footer className="mt-14 w-full overflow-hidden border-t border-hairline bg-canvas sm:mt-20">
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-8 sm:pt-14 lg:px-12">
        {/* Bordered cells, the same grid language as the cards */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 pt-px pl-px md:grid-cols-4"
        >
          <div className={`${CELL_CLASS} col-span-2 md:col-span-1`}>
            <Link
              href="/"
              className="font-display text-lg font-bold uppercase tracking-wider text-ink"
            >
              Hikone
            </Link>
            <p className="mt-3 max-w-[16rem] font-sans text-sm leading-relaxed text-ink-secondary">
              {FOOTER_TAGLINE}
            </p>
          </div>

          {FOOTER_GROUPS.map((group, index) => (
            <div
              key={group.id}
              className={`${CELL_CLASS} ${
                index === FOOTER_GROUPS.length - 1
                  ? "col-span-2 md:col-span-1"
                  : ""
              }`}
            >
              <h2 className="mb-2 font-display text-[11px] font-semibold uppercase tracking-widest text-ink-secondary">
                {group.label}
              </h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <TransitionLink
                        href={link.href}
                        direction="forward"
                        className={LINK_CLASS}
                      >
                        {link.label}
                      </TransitionLink>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="flex min-h-11 items-center justify-between gap-2 font-sans text-sm text-ink-muted"
                      >
                        {link.label}
                        <span className="font-num text-[10px] font-medium uppercase tracking-widest">
                          Soon
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4 py-3">
          <p className="font-sans text-xs text-ink-muted">
            © Hikone. All rights reserved.
          </p>
          <BackToTop />
        </div>

        {/* Quiet oversized wordmark that closes the page */}
        <p
          aria-hidden="true"
          className="select-none pt-4 pb-3 text-center font-display text-[clamp(4.5rem,24vw,20rem)] font-bold uppercase leading-[0.8] tracking-tight text-canvas-surface-hover sm:pt-8"
        >
          Hikone
        </p>
      </div>
    </footer>
  );
}
