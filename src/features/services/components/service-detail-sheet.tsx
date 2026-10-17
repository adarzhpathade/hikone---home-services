"use client";

import { m, AnimatePresence } from "motion/react";
import type { ServiceItem } from "../types";
import { Button } from "@/components/ui/button";

interface ServiceDetailSheetProps {
  service: ServiceItem | null;
  onClose: () => void;
  onAddToCart?: (service: ServiceItem) => void;
}

export function ServiceDetailSheet({
  service,
  onClose,
  onAddToCart,
}: ServiceDetailSheetProps) {
  if (!service) return null;

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);

  const hasDiscount =
    service.originalPrice && service.originalPrice > service.currentPrice;

  const monogram = service.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/30 z-50 backdrop-blur-[2px]"
          />

          {/* Elevated Sheet */}
          <m.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.8 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-canvas-elevated z-50 rounded-t-2xl shadow-drawer overflow-y-auto border-t border-hairline sm:max-w-xl sm:mx-auto sm:bottom-6 sm:rounded-2xl"
          >
            {/* Grab handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-8 h-1 bg-hairline rounded-full" />
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              {/* Architectural Color Block Banner */}
              <div
                className="relative aspect-[16/9] w-full rounded-sm overflow-hidden flex flex-col items-center justify-center p-6 border border-hairline/60"
                style={{ backgroundColor: service.colorTone || "#E5E6E1" }}
              >
                <span className="font-display font-bold text-3xl tracking-widest text-ink/30 select-none">
                  {monogram}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest text-ink-secondary/70 mt-1">
                  {service.category.replace("-", " ")}
                </span>

                {service.badge && (
                  <div className="absolute top-3 left-3 text-[10px] font-display font-semibold uppercase tracking-wider text-accent-terracotta">
                    {service.badge.label}
                  </div>
                )}
              </div>

              {/* Title & Price */}
              <div className="space-y-1.5">
                <h2 className="font-display font-bold text-base sm:text-lg text-ink">
                  {service.title}
                </h2>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="font-num font-tabular inline-flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-bold text-accent-terracotta">
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
                      <span className="text-xs font-sans text-ink-secondary">
                        ({service.unitPriceLabel})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-sans text-ink-secondary">
                    <span className="font-num font-medium text-ink inline-flex items-center gap-0.5">
                      <span className="text-accent-terracotta">★</span> {service.rating}
                    </span>
                    <span className="text-hairline">|</span>
                    <span className="font-num">{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {service.description}
              </p>

              {/* Inclusions */}
              {service.inclusions && service.inclusions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-hairline-subtle">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-ink">
                    What&apos;s Included
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 font-sans text-xs text-ink-secondary">
                    {service.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-ink-muted select-none mt-[-1px]">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              <div className="pt-4 flex gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  className="flex-1 min-h-[44px]"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-2 min-h-[44px]"
                  onClick={() => {
                    onAddToCart?.(service);
                    onClose();
                  }}
                >
                  Add to Cart • {service.currency}
                  {formatPrice(service.currentPrice)}
                </Button>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
