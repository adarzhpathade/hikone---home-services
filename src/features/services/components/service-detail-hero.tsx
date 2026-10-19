"use client";

import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import type { ServiceDetail } from "../types";
import { QuantityStepper } from "@/features/cart/components/quantity-stepper";
import { formatPrice } from "@/lib/format";
import { ServiceThumb } from "./service-thumb";

const BADGE_STYLE: Record<string, string> = {
  indigo: "text-accent-indigo",
  terracotta: "text-accent-terracotta",
  kraft: "text-accent-kraft",
};

// Descriptions longer than this are clamped behind a "Read more" toggle.
const DESCRIPTION_CLAMP_CHARS = 180;

interface ServiceDetailHeroProps {
  service: ServiceDetail;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const isLongDescription =
    service.longDescription.length > DESCRIPTION_CLAMP_CHARS;

  const hasDiscount =
    service.originalPrice && service.originalPrice > service.currentPrice;
  const savings = hasDiscount
    ? service.originalPrice! - service.currentPrice
    : 0;

  return (
    <m.section
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Tone block, same surface as the catalog card */}
      <div
        className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-sm border border-hairline/60 bg-canvas-surface"
        style={service.colorTone ? { backgroundColor: service.colorTone } : undefined}
      >
        <ServiceThumb
          service={service}
          priority
          sizes="(min-width: 768px) 704px, 100vw"
          monogramClassName="text-2xl sm:text-3xl"
        />
      </div>

      {/* Badge */}
      {service.badge && (
        <p
          className={`flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-widest ${BADGE_STYLE[service.badge.variant] ?? ""}`}
        >
          {service.badge.variant === "indigo" && (
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0"
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

      {/* Title */}
      <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-ink">
        {service.title}
      </h1>

      {/* Rating · Duration · Reviews */}
      <div className="flex items-center gap-3 font-num text-sm text-ink-secondary">
        <span className="inline-flex items-center gap-1 font-semibold text-ink">
          <span className="text-accent-terracotta">★</span>
          {service.ratingBreakdown.average}
        </span>
        <span className="text-hairline">|</span>
        <span>{service.ratingBreakdown.total} reviews</span>
        <span className="text-hairline">|</span>
        <span>{service.duration}</span>
      </div>

      {/* Price block */}
      <div className="flex items-center justify-between gap-4 border-y border-hairline-subtle py-5">
        <div className="font-num font-tabular">
          <p className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold text-ink">
              {service.currency}
              {formatPrice(service.currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-ink-muted line-through">
                {service.currency}
                {formatPrice(service.originalPrice!)}
              </span>
            )}
          </p>
          {savings > 0 && (
            <p className="mt-1 text-xs font-semibold text-accent-terracotta">
              Save {service.currency}
              {formatPrice(savings)}
            </p>
          )}
        </div>

        <QuantityStepper service={service} />
      </div>

      {/* Description */}
      <div className="space-y-4">
        <p
          id="service-description"
          className={`font-sans text-sm leading-relaxed text-ink-secondary ${
            isLongDescription && !expanded ? "line-clamp-3" : ""
          }`}
        >
          {service.longDescription}
        </p>
        {isLongDescription && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls="service-description"
            className="-my-2 inline-flex min-h-11 items-center font-display text-xs font-semibold uppercase tracking-widest text-ink underline underline-offset-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Highlights */}
      {service.highlights.length > 0 && (
        <div className="space-y-3 border-t border-hairline-subtle pt-6">
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-ink">
            Highlights
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 font-sans text-sm text-ink-secondary"
              >
                <svg
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-indigo"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Inclusions */}
      {service.inclusions && service.inclusions.length > 0 && (
        <div className="space-y-3 border-t border-hairline-subtle pt-6">
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-ink">
            What&apos;s Included
          </h2>
          <ul className="space-y-2">
            {service.inclusions.map((inc, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 font-sans text-sm text-ink-secondary"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-secondary"
                />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </m.section>
  );
}
