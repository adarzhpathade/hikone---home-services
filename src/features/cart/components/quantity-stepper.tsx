"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { selectQuantity, useCartStore } from "../store";
import type { CartService } from "../types";

interface QuantityStepperProps {
  service: CartService;
  variant?: "solid" | "outline";
}

const STEPPER_STYLES = {
  solid: {
    wrapper: "w-20",
    box: "inset-y-1 bg-ink text-ink-inverted",
    step: "w-7 focus-visible:outline-ink-inverted",
  },
  outline: {
    wrapper: "w-[92px]",
    box: "inset-y-[6px] border border-hairline bg-canvas text-ink",
    step: "w-8 hover:bg-canvas-surface focus-visible:outline-ink",
  },
} as const;

const spring = { type: "spring", stiffness: 500, damping: 34 } as const;

export function QuantityStepper({
  service,
  variant = "solid",
}: QuantityStepperProps) {
  const styles = STEPPER_STYLES[variant];
  const shouldReduceMotion = useReducedMotion();
  const quantity = useCartStore(selectQuantity(service.id));
  const add = useCartStore((state) => state.add);
  const remove = useCartStore((state) => state.remove);

  // Count rolls up when it grows and down when it shrinks.
  const [previous, setPrevious] = useState(quantity);
  const [direction, setDirection] = useState(1);
  if (quantity !== previous) {
    setDirection(quantity > previous ? 1 : -1);
    setPrevious(quantity);
  }

  const offset = shouldReduceMotion ? 0 : 8;
  const transition = shouldReduceMotion ? { duration: 0 } : spring;

  return (
    <div className={`relative h-11 shrink-0 ${styles.wrapper}`}>
      <AnimatePresence initial={false} mode="popLayout">
        {quantity === 0 ? (
          <m.button
            key="add"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              add(service);
            }}
            aria-label={`Add ${service.title} to order`}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={transition}
            className="absolute inset-x-0 inset-y-1 rounded-sm bg-ink text-ink-inverted font-display text-[11px] font-semibold uppercase tracking-wider before:absolute before:-inset-y-1 before:inset-x-0 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            + Add
          </m.button>
        ) : (
          <m.div
            key="stepper"
            role="group"
            aria-label={`${service.title} quantity`}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
            transition={transition}
            className={`absolute inset-x-0 flex items-center justify-between rounded-sm select-none ${styles.box}`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(service.id);
              }}
              aria-label={`Remove one ${service.title}`}
              className={`h-full flex items-center justify-center text-base cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-2 ${styles.step}`}
            >
              −
            </button>

            <span
              className="relative h-5 w-5 overflow-hidden font-num font-tabular text-sm font-semibold"
              aria-live="polite"
            >
              <AnimatePresence initial={false} mode="popLayout">
                <m.span
                  key={quantity}
                  initial={{ opacity: 0, y: offset * direction }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -offset * direction }}
                  transition={transition}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {quantity}
                </m.span>
              </AnimatePresence>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                add(service);
              }}
              aria-label={`Add another ${service.title}`}
              className={`h-full flex items-center justify-center text-base cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-2 ${styles.step}`}
            >
              +
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
