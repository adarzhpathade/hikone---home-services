"use client";

import type { ServiceItem } from "../types";
import { ServiceCard } from "./service-card";

interface ServiceGridProps {
  services: ServiceItem[];
  isLoading?: boolean;
  onSelectService?: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  viewMode?: "grid" | "list";
}

export function ServiceGrid({
  services,
  isLoading = false,
  onSelectService,
  onAddToCart,
  viewMode = "grid",
}: ServiceGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="border-r border-b border-hairline p-4 sm:p-5 flex flex-col animate-pulse"
          >
            <div className="flex justify-between items-center mb-2.5">
              <div className="h-3 w-3 bg-canvas-surface rounded-full" />
              <div className="h-3 w-16 bg-canvas-surface rounded" />
            </div>
            <div className="aspect-[16/10] sm:aspect-[4/3] w-full bg-canvas-surface rounded-sm mb-4" />
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-16 bg-canvas-surface rounded" />
              <div className="h-6 w-6 bg-canvas-surface rounded-sm" />
            </div>
            <div className="h-3.5 w-3/4 bg-canvas-surface rounded mb-2" />
            <div className="h-3 w-1/2 bg-canvas-surface rounded mb-4" />
            <div className="pt-3 border-t border-hairline-subtle space-y-1.5">
              <div className="h-2.5 w-5/6 bg-canvas-surface rounded" />
              <div className="h-2.5 w-4/6 bg-canvas-surface rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="border border-hairline py-16 text-center bg-canvas">
        <p className="font-sans text-xs text-ink-secondary">
          No services found in this category.
        </p>
      </div>
    );
  }

  const gridClass =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid grid-cols-1";

  return (
    <section aria-label="Available services">
      <div
        className={`${gridClass} border-t border-l border-hairline bg-hairline/20`}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="border-r border-b border-hairline bg-canvas flex flex-col"
          >
            <ServiceCard
              service={service}
              onSelect={onSelectService}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
