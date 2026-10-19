"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { formatPrice } from "@/lib/format";
import { selectCount, selectTotal, useCartStore } from "../store";

interface CartBarProps {
  currency: string;
  onViewCart: () => void;
}

export function CartBar({ currency, onViewCart }: CartBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const count = useCartStore(selectCount);
  const total = useCartStore(selectTotal);

  return (
    <AnimatePresence>
      {count > 0 && (
        <m.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 34 }
          }
          className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:px-8 pointer-events-none"
        >
          <div className="mx-auto max-w-xl pointer-events-auto flex items-center justify-between gap-4 rounded-md bg-ink text-ink-inverted px-4 py-3">
            <div className="font-num font-tabular">
              <p className="text-[10px] uppercase tracking-widest opacity-70">
                {count} {count === 1 ? "item" : "items"}
              </p>
              <p className="text-base font-bold">
                {currency}
                {formatPrice(total)}
              </p>
            </div>
            <button
              type="button"
              onClick={onViewCart}
              className="min-h-[44px] px-5 rounded-sm border border-ink-inverted/40 font-display text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-ink-inverted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-inverted"
            >
              View cart
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
