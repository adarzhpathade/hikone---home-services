"use client";

import Image from "next/image";
import { m, AnimatePresence } from "motion/react";
import type { ServiceItem } from "../types";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-canvas-elevated z-50 rounded-t-xl sm:rounded-t-2xl shadow-drawer overflow-y-auto border-t border-hairline sm:max-w-xl sm:mx-auto sm:bottom-6 sm:rounded-2xl"
          >
            {/* Grab handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-8 h-1 bg-hairline rounded-full" />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Image & Quick Badges */}
              <div className="relative aspect-square w-full max-w-[280px] mx-auto bg-canvas-surface rounded-sm overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                {service.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge variant={service.badge.variant}>
                      {service.badge.label}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <h2 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-ink">
                  {service.title}
                </h2>
                <div className="flex items-center justify-between">
                  <Price
                    currentPrice={service.currentPrice}
                    originalPrice={service.originalPrice}
                    currency={service.currency}
                    size="lg"
                  />
                  <span className="font-num text-xs text-ink-secondary bg-canvas-surface px-2 py-0.5 rounded-sm">
                    {service.duration}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {service.description}
              </p>

              {/* Inclusions */}
              {service.inclusions && service.inclusions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-hairline-subtle">
                  <h4 className="font-display font-semibold text-[11px] uppercase tracking-wider text-ink">
                    What&apos;s Included
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 font-sans text-xs text-ink-secondary">
                    {service.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-ink rounded-full" />
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
                  className="flex-1"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-2"
                  onClick={() => {
                    onAddToCart?.(service);
                    onClose();
                  }}
                >
                  Add to Cart • {service.currency}
                  {service.currentPrice.toFixed(2)}
                </Button>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
