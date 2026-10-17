"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import type { ServiceItem } from "../types";
import { Price } from "@/components/ui/price";

interface ServiceCardProps {
  service: ServiceItem;
  onSelect?: (service: ServiceItem) => void;
  priority?: boolean;
}

export function ServiceCard({
  service,
  onSelect,
  priority = false,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <article
      onClick={() => onSelect?.(service)}
      className="group flex flex-col text-left cursor-pointer select-none"
    >
      {/* 1:1 Surface Image Container */}
      <m.div
        className="relative aspect-square w-full bg-canvas-surface overflow-hidden rounded-sm"
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -3,
                transition: { duration: 0.25, ease: "easeOut" },
              }
        }
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />

        {/* Minimalist Hover Overlay / Quick Add Trigger */}
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 group-hover:bg-ink/[0.02]" />

        {/* Quick Add Pill Button on Hover */}
        <div className="absolute bottom-3 right-3 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] uppercase font-display font-semibold tracking-wider bg-ink text-ink-inverted rounded-sm shadow-sm">
            + Add
          </span>
        </div>
      </m.div>

      {/* Card Info Details */}
      <div className="mt-3.5 flex flex-col">
        {/* Title: Uppercase Mona Sans */}
        <h3 className="font-display font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-ink line-clamp-1 transition-colors duration-150 group-hover:text-ink/80">
          {service.title}
        </h3>

        {/* Pricing: Manrope Strikethrough & Bold Current Price */}
        <div className="mt-1">
          <Price
            currentPrice={service.currentPrice}
            originalPrice={service.originalPrice}
            currency={service.currency}
            size="md"
          />
        </div>
      </div>
    </article>
  );
}
