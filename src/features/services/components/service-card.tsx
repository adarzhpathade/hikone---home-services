"use client";

import { TransitionLink } from "@/components/ui/transition-link";
import { m, useReducedMotion } from "motion/react";
import { QuantityStepper } from "@/features/cart/components/quantity-stepper";
import type { ServiceItem } from "../types";
import { ServiceThumb } from "./service-thumb";

const BADGE_TEXT: Record<NonNullable<ServiceItem["badge"]>["variant"], string> = {
  indigo: "text-accent-indigo",
  terracotta: "text-accent-terracotta",
  kraft: "text-accent-kraft",
};

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({
  service,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);

  const hasDiscount =
    service.originalPrice && service.originalPrice > service.currentPrice;
  const savings = hasDiscount
    ? service.originalPrice! - service.currentPrice
    : 0;
  // Savings are derived from prices; only keep labels that say something else (e.g. "₹599/AC").
  const unitLabel = service.unitPriceLabel?.startsWith("Save")
    ? undefined
    : service.unitPriceLabel;

  return (
    <article className="group flex flex-col h-full bg-canvas p-4 sm:p-5 transition-colors hover:bg-canvas-surface/20 select-none">
      {/* Tone block: the service image, or a monogram until one exists */}
      <TransitionLink
        href={`/services/${service.slug}`}
        direction="forward"
        className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-sm overflow-hidden cursor-pointer mb-4 border border-hairline/60 flex items-center justify-center transition-transform"
        style={{ backgroundColor: service.colorTone || "#E5E6E1" }}
      >
        <m.div
          className="relative h-full w-full"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.02,
                  transition: { duration: 0.25, ease: "easeOut" },
                }
          }
        >
          <ServiceThumb
            service={service}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </m.div>
      </TransitionLink>

      {/* Service Title */}
      <TransitionLink
        href={`/services/${service.slug}`}
        direction="forward"
        className="font-display font-semibold text-base sm:text-lg leading-snug text-ink line-clamp-2 cursor-pointer hover:text-ink/80 transition-colors"
      >
        {service.title}
      </TransitionLink>

      {/* Rating & Duration (clean editorial typography, no pills) */}
      <p className="mt-1.5 font-num font-tabular text-xs text-ink-secondary">
        <span className="font-semibold text-ink">
          <span className="text-accent-terracotta">★</span> {service.rating}
        </span>{" "}
        ({service.reviewCount}) <span aria-hidden="true">·</span>{" "}
        {service.duration}
      </p>

      {service.badge && (
        <p
          className={`mt-1.5 flex items-center gap-1.5 font-sans text-xs font-medium ${BADGE_TEXT[service.badge.variant]}`}
        >
          {service.badge.variant === "indigo" && (
            <svg
              aria-hidden="true"
              className="h-3 w-3 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
          {service.badge.label}
        </p>
      )}

      {/* Price & Stepper Row */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="font-num font-tabular min-w-0">
          <p className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-ink">
              {service.currency}
              {formatPrice(service.currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs line-through text-ink-muted font-normal">
                {service.currency}
                {formatPrice(service.originalPrice!)}
              </span>
            )}
          </p>
          {savings > 0 && (
            <p className="mt-0.5 text-[11px] font-semibold text-accent-terracotta">
              Save {service.currency}
              {formatPrice(savings)}
            </p>
          )}
          {unitLabel && (
            <p className="mt-0.5 text-[11px] font-medium text-ink-secondary">
              {unitLabel}
            </p>
          )}
        </div>

        <QuantityStepper service={service} />
      </div>

      {/* Bottom Details Section */}
      {service.inclusions && service.inclusions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-hairline-subtle flex flex-col">
          <ul className="space-y-1.5 text-xs text-ink-secondary font-sans">
            {service.inclusions.slice(0, 2).map((inc, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-secondary"
                />
                <span className="line-clamp-1">{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
