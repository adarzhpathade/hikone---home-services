"use client";

import Link from "next/link";
import type { ServiceItem } from "@/features/services/types";
import { ServiceCard } from "@/features/services/components/service-card";

interface TrendingServicesProps {
  services: ServiceItem[];
}

export function TrendingServices({ services }: TrendingServicesProps) {
  return (
    <section className="py-12 sm:py-20 border-b border-hairline-subtle">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-ink-secondary block mb-1.5">
            Most Requested
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-ink">
            Trending Services
          </h2>
        </div>

        <div className="flex items-center gap-6 font-display text-xs font-semibold uppercase tracking-wider">
          <Link
            href="/ac"
            className="text-ink-secondary hover:text-ink transition-colors flex items-center gap-1.5"
          >
            <span>All AC Services</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/fridge"
            className="text-ink-secondary hover:text-ink transition-colors flex items-center gap-1.5"
          >
            <span>All Fridge Services</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Shared Hairline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-px pl-px">
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
  );
}
