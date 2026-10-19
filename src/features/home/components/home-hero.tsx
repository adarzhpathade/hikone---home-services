"use client";

interface HomeHeroProps {
  onSearchClick: () => void;
}

export function HomeHero({ onSearchClick }: HomeHeroProps) {
  return (
    <section className="pt-8 sm:pt-14 text-center">
      <span className="mb-3 block font-display text-[11px] font-semibold uppercase tracking-widest text-ink-secondary">
        On-demand appliance care
      </span>

      <h1 className="mx-auto max-w-2xl text-balance font-display font-bold text-2xl sm:text-4xl uppercase tracking-wider leading-[1.15] text-ink">
        Precision care for modern living
      </h1>

      <p className="mt-3 flex items-center justify-center gap-2 font-num font-tabular text-sm text-ink-secondary">
        <span className="inline-flex items-center gap-1 font-semibold text-ink">
          <span aria-hidden="true" className="text-accent-terracotta">
            ★
          </span>
          4.82
        </span>
        <span aria-hidden="true" className="text-hairline">
          |
        </span>
        <span>23.0M+ bookings</span>
      </p>

      <button
        type="button"
        onClick={onSearchClick}
        aria-label="Search services"
        className="group mx-auto mt-6 flex min-h-12 w-full max-w-md items-center gap-3 rounded-sm border border-hairline bg-canvas-elevated px-4 text-left cursor-pointer transition-colors hover:border-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-ink-secondary group-hover:text-ink"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="truncate font-sans text-sm text-ink-muted">
          Search services
        </span>
      </button>
    </section>
  );
}
