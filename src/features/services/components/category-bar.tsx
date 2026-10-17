"use client";

import type { ServiceCategory } from "../types";

interface CategoryBarProps {
  categories: ServiceCategory[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  activeSort: string;
  onSelectSort: (sort: "default" | "price-asc" | "price-desc" | "rating") => void;
  itemCount: number;
  viewMode: "grid" | "list";
  onChangeViewMode: (mode: "grid" | "list") => void;
}

export function CategoryBar({
  categories,
  activeCategory,
  onSelectCategory,
  activeSort,
  onSelectSort,
  itemCount,
  viewMode,
  onChangeViewMode,
}: CategoryBarProps) {
  const currentCategory =
    categories.find((c) => c.slug === activeCategory)?.name || "All Services";

  return (
    <div className="w-full mb-6">
      {/* Category Heading & Large Tabular Count */}
      <div className="flex items-baseline justify-between mb-4 sm:mb-8">
        <h1 className="font-display font-bold text-xl sm:text-3xl md:text-4xl uppercase tracking-wider text-ink">
          {currentCategory}
        </h1>
        <span className="font-display font-normal text-xl sm:text-3xl md:text-4xl text-ink font-tabular">
          {itemCount < 10 ? `0${itemCount}` : itemCount}
        </span>
      </div>

      {/* Mobile-first Horizontal Category Switcher */}
      <nav
        aria-label="Service categories"
        className="flex items-center gap-5 sm:gap-7 overflow-x-auto pb-2 mb-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`font-sans text-xs sm:text-[13px] tracking-tight transition-colors cursor-pointer whitespace-nowrap py-1 ${
                isActive
                  ? "text-ink font-semibold border-b-2 border-ink"
                  : "text-ink-secondary hover:text-ink font-normal"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </nav>

      {/* Hairline Divider Toolbar */}
      <div className="border-y border-hairline py-2.5 sm:py-3 flex items-center justify-between text-[11px] sm:text-xs">
        {/* Left: Filter label */}
        <div className="flex items-center gap-1.5 text-ink font-medium">
          <span className="font-sans">Filter</span>
          <span className="text-[9px] text-ink-secondary">▾</span>
        </div>

        {/* Center: View Switcher Icons (:: grid vs ≡ list) */}
        <div className="flex items-center gap-3 text-ink">
          <button
            type="button"
            onClick={() => onChangeViewMode("grid")}
            aria-label="Grid view"
            className={`p-1 cursor-pointer transition-opacity ${
              viewMode === "grid" ? "opacity-100" : "opacity-40 hover:opacity-80"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <rect x="1" y="1" width="5.5" height="5.5" rx="0.5" />
              <rect x="9.5" y="1" width="5.5" height="5.5" rx="0.5" />
              <rect x="1" y="9.5" width="5.5" height="5.5" rx="0.5" />
              <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="0.5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode("list")}
            aria-label="List view"
            className={`p-1 cursor-pointer transition-opacity ${
              viewMode === "list" ? "opacity-100" : "opacity-40 hover:opacity-80"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <rect x="1" y="2" width="14" height="2.5" rx="0.5" />
              <rect x="1" y="7" width="14" height="2.5" rx="0.5" />
              <rect x="1" y="12" width="14" height="2.5" rx="0.5" />
            </svg>
          </button>
        </div>

        {/* Right: Sort by Dropdown */}
        <div className="flex items-center">
          <label htmlFor="service-sorting" className="sr-only">
            Sort services
          </label>
          <div className="relative inline-flex items-center gap-1 cursor-pointer text-ink font-medium">
            <span className="font-sans text-[11px] sm:text-xs text-ink-secondary">
              Sort by
            </span>
            <select
              id="service-sorting"
              value={activeSort}
              onChange={(e) =>
                onSelectSort(
                  e.target.value as "default" | "price-asc" | "price-desc" | "rating"
                )
              }
              className="appearance-none bg-transparent pr-4 pl-1 text-ink font-sans text-[11px] sm:text-xs cursor-pointer focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
            <span className="pointer-events-none absolute right-0 text-[9px] text-ink-secondary">
              ▾
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
