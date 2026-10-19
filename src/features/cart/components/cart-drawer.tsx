"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  m,
  useDragControls,
  useReducedMotion,
} from "motion/react";
import { BagIcon } from "@/components/ui/bag-icon";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useMediaQuery } from "@/lib/use-media-query";
import {
  selectCount,
  selectSavings,
  selectTotal,
  useCartStore,
} from "../store";
import type { CartLine } from "../types";
import { QuantityStepper } from "./quantity-stepper";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DISMISS_DISTANCE = 100;
const DISMISS_VELOCITY = 500;

function Amount({ currency, value }: { currency: string; value: number }) {
  const shouldReduceMotion = useReducedMotion();
  const offset = shouldReduceMotion ? 0 : 6;

  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          key={value}
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -offset }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {currency}
          {formatPrice(value)}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function CartLineItem({ line }: { line: CartLine }) {
  const hasDiscount =
    line.originalPrice !== undefined && line.originalPrice > line.unitPrice;

  return (
    <m.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex gap-4 py-5 border-b border-hairline-subtle last:border-b-0"
    >

      <div className="min-w-0 flex-1">
        <p className="font-display text-[15px] font-semibold leading-snug text-ink">
          {line.title}
        </p>
        <p className="mt-1 font-num text-xs text-ink-secondary">
          {line.duration}
        </p>

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="flex items-baseline gap-2 font-num font-tabular">
            <span className="text-base font-bold text-ink">
              {line.currency}
              {formatPrice(line.unitPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-ink-muted line-through">
                {line.currency}
                {formatPrice(line.originalPrice!)}
              </span>
            )}
          </p>

          <div className="-my-1.5 -mr-0.5">
            <QuantityStepper
              variant="outline"
              service={{
                id: line.serviceId,
                title: line.title,
                currentPrice: line.unitPrice,
                originalPrice: line.originalPrice,
                currency: line.currency,
                duration: line.duration,
                colorTone: line.colorTone,
              }}
            />
          </div>
        </div>
      </div>
    </m.li>
  );
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const dragControls = useDragControls();

  const lines = useCartStore((state) => state.lines);
  const count = useCartStore(selectCount);
  const total = useCartStore(selectTotal);
  const savings = useCartStore(selectSavings);

  const lineList = Object.values(lines);
  const currency = lineList[0]?.currency ?? "";

  const hidden = shouldReduceMotion
    ? { opacity: 0 }
    : isDesktop
      ? { x: "100%" }
      : { y: "100%" };
  const shown = shouldReduceMotion ? { opacity: 1 } : { x: 0, y: 0 };
  const transition = shouldReduceMotion
    ? { duration: 0.15 }
    : ({ type: "spring", damping: 32, stiffness: 340 } as const);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-ink/30"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <m.div
                initial={hidden}
                animate={shown}
                exit={hidden}
                transition={transition}
                drag={isDesktop || shouldReduceMotion ? false : "y"}
                dragListener={false}
                dragControls={dragControls}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(_, info) => {
                  if (
                    info.offset.y > DISMISS_DISTANCE ||
                    info.velocity.y > DISMISS_VELOCITY
                  ) {
                    onOpenChange(false);
                  }
                }}
                className="fixed z-50 flex flex-col bg-canvas-elevated border-hairline inset-x-0 bottom-0 max-h-[88dvh] rounded-t-sm border-t sm:inset-x-auto sm:inset-y-0 sm:right-0 sm:max-h-none sm:w-[420px] sm:rounded-none sm:border-t-0 sm:border-l"
              >
                {/* Grab handle (mobile) */}
                <div
                  onPointerDown={(e) => dragControls.start(e)}
                  className="flex shrink-0 cursor-grab touch-none justify-center pt-3 pb-2 sm:hidden"
                >
                  <div className="h-1 w-8 rounded-full bg-hairline" />
                </div>

                <div className="flex shrink-0 items-start justify-between px-5 pt-2 pb-4 sm:pt-6">
                  <div>
                    <Dialog.Title className="font-display text-xl font-semibold text-ink">
                      Your order
                    </Dialog.Title>
                    <p className="mt-0.5 font-num text-xs text-ink-secondary">
                      {count} {count === 1 ? "service" : "services"}
                    </p>
                  </div>
                  <Dialog.Close
                    aria-label="Close cart"
                    className="-mr-3 -mt-2 flex h-11 w-11 items-center justify-center text-ink hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </Dialog.Close>
                </div>

                {lineList.length === 0 ? (
                  <m.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex flex-1 flex-col items-center justify-center border-t border-hairline-subtle px-8 py-14 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-hairline bg-canvas-surface text-ink-secondary">
                      <BagIcon className="h-7 w-7" strokeWidth={1.25} />
                    </div>
                    <p className="mt-6 font-display text-lg font-semibold text-ink">
                      Your order is empty
                    </p>
                    <p className="mt-2 max-w-[240px] font-sans text-sm leading-relaxed text-ink-secondary">
                      Pick a service and it will show up here, ready to book.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      className="mt-8 min-h-[48px] px-8"
                      onClick={() => onOpenChange(false)}
                    >
                      Browse services
                    </Button>
                  </m.div>
                ) : (
                  <>
                    <ul className="flex-1 overflow-y-auto border-t border-hairline-subtle px-5">
                      <AnimatePresence initial={false} mode="popLayout">
                        {lineList.map((line) => (
                          <CartLineItem key={line.serviceId} line={line} />
                        ))}
                      </AnimatePresence>
                    </ul>

                    <div className="shrink-0 border-t border-hairline px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4">
                      <dl className="space-y-2 font-num font-tabular text-sm">
                        {savings > 0 && (
                          <div className="flex justify-between text-accent-terracotta">
                            <dt className="font-sans">You save</dt>
                            <dd className="font-semibold">
                              <Amount currency={currency} value={savings} />
                            </dd>
                          </div>
                        )}
                        <div className="flex justify-between text-ink-secondary">
                          <dt className="font-sans">Taxes &amp; fees</dt>
                          <dd className="font-sans text-xs">At checkout</dd>
                        </div>
                        <div className="flex items-baseline justify-between border-t border-hairline-subtle pt-3 text-ink">
                          <dt className="font-display text-sm font-semibold uppercase tracking-wider">
                            Subtotal
                          </dt>
                          <dd className="text-xl font-bold">
                            <Amount currency={currency} value={total} />
                          </dd>
                        </div>
                      </dl>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full min-h-[48px]"
                      >
                        Continue
                      </Button>
                    </div>
                  </>
                )}
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
