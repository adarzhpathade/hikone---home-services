"use client";

import { useReducedMotion } from "motion/react";

export function BackToTop() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: shouldReduceMotion ? "auto" : "smooth",
        })
      }
      className="group -mr-2 flex min-h-11 items-center gap-2 px-2 font-display text-[11px] font-semibold uppercase tracking-widest text-ink cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      Back to top
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
