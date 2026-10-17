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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="border-r border-b border-hairline p-4 sm:p-5 lg:p-6 flex flex-col animate-pulse"
          >
            <div className="h-3 w-3 bg-canvas-surface rounded-full mb-2" />
            <div className="aspect-square w-full bg-canvas-surface rounded-sm mb-5" />
            <div className="flex justify-between items-center mb-1">
              <div className="h-3.5 w-12 bg-canvas-surface rounded" />
              <div className="h-3.5 w-3.5 bg-canvas-surface rounded" />
            </div>
            <div className="h-3 w-3/4 bg-canvas-surface rounded mt-1" />
            <div className="flex justify-between items-center mt-3.5">
              <div className="h-4 w-14 bg-canvas-surface rounded-full" />
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-canvas-surface" />
                <div className="w-2.5 h-2.5 rounded-full bg-canvas-surface" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="border border-hairline py-20 text-center bg-canvas">
        <p className="font-sans text-xs text-ink-secondary">
          No items found in this section.
        </p>
      </div>
    );
  }

  const gridClass =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid grid-cols-1 sm:grid-cols-2";

  return (
    <section aria-label="Catalog items">
      <div
        className={`${gridClass} border-t border-l border-hairline bg-hairline/20`}
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            className="border-r border-b border-hairline bg-canvas flex flex-col"
          >
            <ServiceCard
              service={service}
              onSelect={onSelectService}
              onAddToCart={onAddToCart}
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
