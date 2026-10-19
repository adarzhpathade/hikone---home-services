"use client";

import type { ServiceCategory, ServiceItem } from "../types";
import { ServiceCard } from "./service-card";

export interface ServiceSection {
  category: ServiceCategory;
  services: ServiceItem[];
}

interface ServiceGridProps {
  sections: ServiceSection[];
  isLoading?: boolean;
}

export function ServiceGrid({ sections, isLoading = false }: ServiceGridProps) {
  if (sections.length === 0) {
    return (
      <div className="border border-hairline py-16 text-center bg-canvas">
        <p className="font-sans text-xs text-ink-secondary">
          No services found.
        </p>
      </div>
    );
  }

  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      aria-busy={isLoading}
      className={`space-y-16 sm:space-y-24 lg:space-y-28 transition-opacity duration-200 motion-reduce:transition-none ${
        isLoading ? "opacity-60" : ""
      }`}
    >
      {sections.map(({ category, services }) => (
        <section
          key={category.id}
          id={`section-${category.slug}`}
          aria-labelledby={`category-${category.slug}`}
          className="scroll-mt-40 sm:scroll-mt-48"
        >
          <div className="mb-5 sm:mb-7 flex items-baseline justify-between gap-4">
            <h2
              id={`category-${category.slug}`}
              className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-ink"
            >
              {category.name}
            </h2>
            <p className="font-num font-tabular text-xs sm:text-sm text-ink-secondary font-medium">
              {services.length} {services.length === 1 ? "service" : "services"}
            </p>
          </div>

          <div className={`${gridClass} pt-px pl-px`}>
            {services.map((service) => (
              <div
                key={service.id}
                className="-mt-px -ml-px border border-hairline bg-canvas flex flex-col"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
