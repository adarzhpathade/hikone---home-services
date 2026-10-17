"use client";

import type { ServiceItem } from "../types";
import { ServiceCard } from "./service-card";

interface ServiceGridProps {
  services: ServiceItem[];
  isLoading?: boolean;
  onSelectService?: (service: ServiceItem) => void;
}

export function ServiceGrid({
  services,
  isLoading = false,
  onSelectService,
}: ServiceGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 lg:gap-y-14">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex flex-col animate-pulse">
            <div className="aspect-square w-full bg-canvas-surface rounded-sm" />
            <div className="mt-4 h-3 w-3/5 bg-canvas-surface rounded" />
            <div className="mt-2 h-3 w-2/5 bg-canvas-surface rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-sans text-sm text-ink-secondary">
          No services found in this category.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Available services catalog">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 lg:gap-y-14">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={onSelectService}
            priority={index < 3}
          />
        ))}
      </div>
    </section>
  );
}
