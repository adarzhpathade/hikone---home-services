"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isPreviousPath, waitForNavigation } from "@/lib/navigation-transition";

export type NavDirection = "forward" | "back";

interface TransitionLinkProps
  extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
  direction: NavDirection;
}

function shouldSkipTransition(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (typeof document.startViewTransition !== "function") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (event.defaultPrevented || event.button !== 0) return true;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return true;
  return (
    new URL(href, window.location.href).pathname === window.location.pathname
  );
}

// A Link whose navigation slides the page content in the given direction.
export function TransitionLink({
  href,
  direction,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (shouldSkipTransition(event, href)) return;

    event.preventDefault();
    const root = document.documentElement;
    root.dataset.navDirection = direction;
    const transition = document.startViewTransition(() => {
      const settled = waitForNavigation();
      const target = new URL(href, window.location.href).pathname;
      if (direction === "back" && isPreviousPath(target)) router.back();
      else router.push(href);
      return settled;
    });
    void transition.finished.finally(() => {
      delete root.dataset.navDirection;
    });
  };

  // Prefetch the whole page so the detail skeleton never flashes on arrival.
  return <Link href={href} prefetch onClick={handleClick} {...props} />;
}
