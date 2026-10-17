"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ServiceItem } from "../types";

interface ServiceCardProps {
  service: ServiceItem;
  onSelect?: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  priority?: boolean;
}

export function ServiceCard({
  service,
  onSelect,
  onAddToCart,
  priority = false,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="group flex flex-col h-full bg-canvas p-4 sm:p-5 lg:p-6 transition-colors hover:bg-canvas-surface/25 select-none">
      {/* Top action row: Star / Favorite */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`text-[11px] leading-none transition-colors cursor-pointer ${
            isFavorite ? "text-ink" : "text-ink-secondary/40 hover:text-ink"
          }`}
        >
          ★
        </button>
      </div>

      {/* Surface Image Box */}
      <div
        onClick={() => onSelect?.(service)}
        className="relative aspect-square w-full bg-canvas-surface rounded-sm overflow-hidden cursor-pointer mb-5 flex items-center justify-center"
      >
        <m.div
          className="relative w-full h-full"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.03,
                  transition: { duration: 0.25, ease: "easeOut" },
                }
          }
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center"
          />
        </m.div>
      </div>

      {/* Info Block with precise line spacing */}
      <div className="mt-auto flex flex-col">
        {/* Line 1: Terracotta Price + Minimal Plus Button */}
        <div className="flex items-baseline justify-between">
          <div className="font-num font-tabular inline-flex items-baseline gap-2">
            <span className="text-xs sm:text-[13px] font-semibold text-accent-terracotta">
              {service.currency}
              {service.currentPrice}
            </span>
            {service.originalPrice && service.originalPrice > service.currentPrice && (
              <span className="text-[11px] line-through text-ink-muted font-normal">
                {service.currency}
                {service.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(service);
            }}
            aria-label={`Add ${service.title} to order`}
            className="text-base text-ink hover:text-accent-terracotta font-light leading-none transition-colors cursor-pointer px-1 py-0.5 select-none"
          >
            +
          </button>
        </div>

        {/* Line 2: Title */}
        <h3
          onClick={() => onSelect?.(service)}
          className="font-sans font-medium text-xs sm:text-[13px] text-ink line-clamp-1 mt-1 cursor-pointer hover:text-ink/75 transition-colors"
        >
          {service.title}
        </h3>

        {/* Line 3: Tag / Brand pill + Color Swatch Dots */}
        <div className="mt-3.5 flex items-center justify-between">
          {/* Tag pill */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-hairline text-[10px] text-ink-secondary font-sans tracking-tight">
            {service.tag || service.category}
          </span>

          {/* Swatch dots */}
          {service.swatches && service.swatches.length > 0 && (
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {service.swatches.map((color, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-hairline/60"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
