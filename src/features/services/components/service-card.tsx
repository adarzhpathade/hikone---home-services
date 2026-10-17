"use client";

import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ServiceItem } from "../types";

interface ServiceCardProps {
  service: ServiceItem;
  onSelect?: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
}

export function ServiceCard({
  service,
  onSelect,
  onAddToCart,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);

  const hasDiscount =
    service.originalPrice && service.originalPrice > service.currentPrice;

  // Derive simple architectural monogram from title
  const monogram = service.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <article className="group flex flex-col h-full bg-canvas p-4 sm:p-5 transition-colors hover:bg-canvas-surface/20 select-none">
      {/* Top Meta Row: Wishlist & Badge */}
      <div className="flex items-center justify-between mb-2.5 min-h-[20px]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`min-h-[44px] min-w-[44px] -m-2 flex items-center justify-center text-xs transition-colors cursor-pointer ${
            isFavorite ? "text-ink" : "text-ink-secondary/40 hover:text-ink"
          }`}
        >
          ★
        </button>

        {service.badge && (
          <span className="text-[10px] uppercase font-display font-semibold tracking-wider text-accent-terracotta">
            {service.badge.label}
          </span>
        )}
      </div>

      {/* Architectural Color Block (No images needed) */}
      <div
        onClick={() => onSelect?.(service)}
        className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-sm overflow-hidden cursor-pointer mb-4 border border-hairline/60 flex items-center justify-center transition-transform"
        style={{ backgroundColor: service.colorTone || "#E5E6E1" }}
      >
        <m.div
          className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-4 text-center"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.02,
                  transition: { duration: 0.25, ease: "easeOut" },
                }
          }
        >
          {/* Subtle architectural monogram */}
          <span className="font-display font-bold text-xl sm:text-2xl tracking-widest text-ink/30 select-none">
            {monogram}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-ink-secondary/70">
            {service.category.replace("-", " ")}
          </span>
        </m.div>
      </div>

      {/* Price & CTA Row */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-num font-tabular inline-flex items-baseline gap-2 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-accent-terracotta">
            {service.currency}
            {formatPrice(service.currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs line-through text-ink-muted font-normal">
              {service.currency}
              {formatPrice(service.originalPrice!)}
            </span>
          )}
          {service.unitPriceLabel && (
            <span className="text-[10px] font-sans font-medium text-ink-secondary">
              ({service.unitPriceLabel})
            </span>
          )}
        </div>

        {/* 44px touch target on mobile for + Add */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(service);
          }}
          aria-label={`Add ${service.title} to order`}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink hover:text-accent-terracotta transition-colors cursor-pointer select-none -mr-2"
        >
          <span className="w-7 h-7 rounded-sm border border-hairline flex items-center justify-center text-sm font-light hover:border-ink hover:bg-ink hover:text-ink-inverted transition-all">
            +
          </span>
        </button>
      </div>

      {/* Service Title */}
      <h3
        onClick={() => onSelect?.(service)}
        className="font-display font-semibold text-xs sm:text-sm text-ink line-clamp-2 mt-1.5 cursor-pointer hover:text-ink/80 transition-colors"
      >
        {service.title}
      </h3>

      {/* Rating & Duration Row (No pills! Clean editorial typography) */}
      <div className="mt-2 flex items-center gap-2 text-[11px] font-sans text-ink-secondary">
        <span className="font-num font-medium text-ink inline-flex items-center gap-0.5">
          <span className="text-accent-terracotta">★</span> {service.rating}
        </span>
        <span className="text-hairline">|</span>
        <span className="font-num">({service.reviewCount})</span>
        <span className="text-hairline">|</span>
        <span className="font-num">{service.duration}</span>
      </div>

      {/* Bottom Details Section */}
      {service.inclusions && service.inclusions.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-hairline-subtle flex flex-col gap-1.5">
          <ul className="space-y-1 text-[11px] text-ink-secondary font-sans">
            {service.inclusions.slice(0, 2).map((inc, i) => (
              <li key={i} className="flex items-start gap-1.5 leading-snug">
                <span className="text-ink-muted select-none mt-[-1px]">•</span>
                <span className="line-clamp-1">{inc}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onSelect?.(service)}
            className="self-start text-[10px] text-ink-secondary hover:text-ink font-sans underline underline-offset-2 mt-1 transition-colors cursor-pointer"
          >
            View details
          </button>
        </div>
      )}
    </article>
  );
}
