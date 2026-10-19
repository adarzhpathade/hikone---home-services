"use client";

import { TransitionLink } from "@/components/ui/transition-link";
import { m, useReducedMotion } from "motion/react";
import type { ServiceItem } from "../types";
import { formatPrice } from "@/lib/format";
import { ServiceThumb } from "./service-thumb";

interface ServiceRecommendationsProps {
  services: ServiceItem[];
}

function RecommendationCard({ service }: { service: ServiceItem }) {
  const shouldReduceMotion = useReducedMotion();

  const hasDiscount =
    service.originalPrice && service.originalPrice > service.currentPrice;

  return (
    <m.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <TransitionLink
        href={`/services/${service.slug}`}
        direction="forward"
        className="group block w-56 sm:w-64 shrink-0 select-none"
      >
        {/* Tone block */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-hairline/60 bg-canvas-surface transition-colors group-hover:border-hairline"
          style={service.colorTone ? { backgroundColor: service.colorTone } : undefined}
        >
          <ServiceThumb
            service={service}
            sizes="256px"
            monogramClassName="text-lg"
          />
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-display text-sm font-semibold leading-snug text-ink line-clamp-2 group-hover:text-ink/80 transition-colors">
            {service.title}
          </h3>
          <p className="font-num text-xs text-ink-secondary">
            <span className="font-semibold text-ink">
              <span className="text-accent-terracotta">★</span> {service.rating}
            </span>{" "}
            ({service.reviewCount}) · {service.duration}
          </p>
          <p className="flex items-baseline gap-2 font-num font-tabular">
            <span className="text-sm font-bold text-ink">
              {service.currency}
              {formatPrice(service.currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-ink-muted line-through">
                {service.currency}
                {formatPrice(service.originalPrice!)}
              </span>
            )}
          </p>
        </div>
      </TransitionLink>
    </m.div>
  );
}

export function ServiceRecommendations({
  services,
}: ServiceRecommendationsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (services.length === 0) return null;

  return (
    <m.section
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <h2 className="font-display text-lg font-semibold text-ink">
        You may also like
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0">
        {services.map((service) => (
          <RecommendationCard key={service.id} service={service} />
        ))}
      </div>
    </m.section>
  );
}
