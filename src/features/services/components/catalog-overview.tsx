"use client";

import type { CatalogSummary } from "../types";

interface CatalogHeroProps {
  summary: CatalogSummary;
  title?: string;
}

export function CatalogHero({
  summary,
  title = "AC Services",
}: CatalogHeroProps) {
  return (
    <div className="mb-16 sm:mb-24 lg:mb-28 pt-4 sm:pt-8">
      <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-ink">
        {title}
      </h1>
      <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-num font-tabular text-xs sm:text-sm text-ink-secondary">
        <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
          <span aria-hidden="true" className="text-accent-terracotta text-sm">
            ★
          </span>
          {summary.rating}
        </span>
        <span aria-hidden="true" className="text-hairline">
          ·
        </span>
        <span>{summary.bookingsLabel}</span>
        <span aria-hidden="true" className="text-hairline">
          ·
        </span>
        <span className="font-sans text-xs sm:text-[13px] text-ink-secondary font-medium">
          Verified Experts
        </span>
      </div>
    </div>
  );
}

// Backward-compatible exports
export const CatalogHeading = CatalogHero;
export const CatalogCover = CatalogHero;
export const CategoryNav = () => null;
export const CategoryTiles = () => null;
