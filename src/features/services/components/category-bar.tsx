"use client";

import type { ServiceCategory } from "../types";

interface CategoryBarProps {
  categories: ServiceCategory[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  activeSort: string;
  onSelectSort: (sort: "default" | "price-asc" | "price-desc" | "rating") => void;
}

export function CategoryBar({
  categories,
  activeCategory,
  onSelectCategory,
  activeSort,
  onSelectSort,
}: CategoryBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 mb-8 text-[11px] sm:text-xs">
      {/* Category Pills / Links */}
      <nav
        aria-label="Service categories"
        className="flex items-center gap-5 sm:gap-8 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`font-sans tracking-wide transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-ink font-semibold"
                  : "text-ink-secondary hover:text-ink font-normal"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </nav>

      {/* Sorting Dropdown */}
      <div className="flex items-center self-end sm:self-auto">
        <label htmlFor="service-sorting" className="sr-only">
          Sort services
        </label>
        <div className="relative inline-flex items-center">
          <select
            id="service-sorting"
            value={activeSort}
            onChange={(e) =>
              onSelectSort(
                e.target.value as "default" | "price-asc" | "price-desc" | "rating"
              )
            }
            className="appearance-none bg-transparent pr-5 text-ink-secondary hover:text-ink font-sans text-[11px] sm:text-xs tracking-wide cursor-pointer focus:outline-none"
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Sort by price: low to high</option>
            <option value="price-desc">Sort by price: high to low</option>
            <option value="rating">Sort by popularity</option>
          </select>
          <span className="pointer-events-none absolute right-0 text-[10px] text-ink-secondary">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}
