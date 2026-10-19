"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { selectCount, useCartStore } from "@/features/cart/store";
import { useMediaQuery } from "@/lib/use-media-query";
import { MenuIcon } from "./menu-icon";
import { MENU_NAV_LINKS, type MenuLink } from "./menu-items";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCartClick?: () => void;
  onSearchClick: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const LINK_CLASS =
  "flex min-h-14 w-full items-center justify-between gap-4 font-display text-2xl font-semibold tracking-tight text-ink cursor-pointer transition-colors duration-150 active:bg-canvas-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none";

const HEADER_BUTTON_CLASS =
  "relative flex h-11 w-11 items-center justify-center text-ink cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink";

export function MobileMenu({
  open,
  onOpenChange,
  onCartClick,
  onSearchClick,
  triggerRef,
}: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();
  const cartCount = useCartStore(selectCount);
  const [mounted, setMounted] = useState(false);
  const pendingExitAction = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Lets the icon animate from burger to cross after first paint.
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isDesktop) onOpenChange(false);
  }, [isDesktop, onOpenChange]);

  const runAction = (action: () => void) => {
    pendingExitAction.current = action;
    onOpenChange(false);
  };

  const finishExit = () => {
    const action = pendingExitAction.current;
    pendingExitAction.current = null;
    if (action) {
      action();
    } else {
      triggerRef.current?.focus();
    }
  };

  const panelTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : ({ duration: 0.3, delay: 0.12, ease: [0.22, 1, 0.36, 1] } as const);
  const exitTransition = { duration: shouldReduceMotion ? 0.12 : 0.2 };

  // Every block fades up in sequence after the canvas has opened.
  const reveal = (index: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        delay: shouldReduceMotion ? 0 : 0.22 + index * 0.045,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  });

  const renderLink = (link: MenuLink, index: number) => {
    const isActive =
      link.id === "home"
        ? pathname === "/"
        : link.id === "services"
        ? pathname === "/ac" || pathname === "/fridge" || pathname.startsWith("/services")
        : false;

    return (
      <m.li
        key={link.id}
        {...reveal(index)}
        className="border-b border-hairline-subtle"
      >
        {link.href ? (
          <Link
            href={link.href}
            onClick={() => onOpenChange(false)}
            className={`${LINK_CLASS} ${
              isActive ? "text-ink font-bold" : "text-ink/80 hover:text-ink"
            }`}
          >
            <span>{link.label}</span>
            {isActive && (
              <span
                className="h-2 w-2 rounded-full bg-ink"
                aria-hidden="true"
              />
            )}
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="flex min-h-14 w-full items-center justify-between gap-4 font-display text-2xl font-semibold tracking-tight text-ink-muted"
          >
            {link.label}
            <span className="font-num text-[11px] font-medium uppercase tracking-widest">
              Soon
            </span>
          </span>
        )}
      </m.li>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                finishExit();
              }}
            >
              <div className="fixed inset-0 z-50 flex flex-col md:hidden pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
                {/* Flat canvas that opens down from the hairline */}
                <m.div
                  aria-hidden="true"
                  initial={{
                    scaleY: shouldReduceMotion ? 1 : 0,
                    opacity: shouldReduceMotion ? 0 : 1,
                  }}
                  animate={{
                    scaleY: 1,
                    opacity: 1,
                    transition: panelTransition,
                  }}
                  exit={{
                    scaleY: shouldReduceMotion ? 1 : 0,
                    opacity: shouldReduceMotion ? 0 : 1,
                    transition: exitTransition,
                  }}
                  className="absolute inset-0 origin-top bg-canvas"
                />

                {/* Same row as the header, so the nav appears to expand */}
                <div className="relative bg-canvas">
                  <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4">
                    <Dialog.Close
                      aria-label="Close navigation menu"
                      className={`group -ml-3 justify-self-start ${HEADER_BUTTON_CLASS}`}
                    >
                      <MenuIcon open={open && mounted} />
                    </Dialog.Close>
                    <Link
                      href="/"
                      onClick={() => onOpenChange(false)}
                      className="font-display text-lg font-bold uppercase tracking-wider text-ink"
                    >
                      Hikone
                    </Link>
                    <button
                      type="button"
                      aria-label="Search services"
                      onClick={() => runAction(onSearchClick)}
                      className={`-mr-3 justify-self-end ${HEADER_BUTTON_CLASS}`}
                    >
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </button>
                  </div>
                  <m.div
                    aria-hidden="true"
                    initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                    animate={{
                      scaleX: 1,
                      transition: {
                        duration: shouldReduceMotion ? 0 : 0.22,
                        ease: "easeOut",
                      },
                    }}
                    exit={{ opacity: 0, transition: exitTransition }}
                    className="h-px origin-left bg-hairline"
                  />
                </div>

                <Dialog.Title className="sr-only">Menu</Dialog.Title>

                <nav
                  aria-label="Mobile navigation"
                  className="relative min-h-0 flex-1 overflow-y-auto px-4 pt-4"
                >
                  <ul className="mx-auto w-full max-w-md pb-6">
                    {MENU_NAV_LINKS.map((link, i) => renderLink(link, i))}
                  </ul>
                </nav>

                {onCartClick && (
                  <m.div
                    {...reveal(MENU_NAV_LINKS.length + 1)}
                    className="relative border-t border-hairline-subtle bg-canvas px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
                  >
                    <button
                      type="button"
                      onClick={() => runAction(onCartClick)}
                      className={`mx-auto flex min-h-12 w-full max-w-md items-center justify-between gap-4 rounded-sm px-4 font-display text-xs font-semibold uppercase tracking-widest cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                        cartCount > 0
                          ? "bg-ink text-ink-inverted"
                          : "border border-hairline text-ink"
                      }`}
                    >
                      <span>Cart</span>
                      <span className="font-num font-tabular text-xs">
                        {cartCount} {cartCount === 1 ? "item" : "items"}
                      </span>
                    </button>
                  </m.div>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
