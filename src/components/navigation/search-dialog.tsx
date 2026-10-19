"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { serviceApi } from "@/features/services/api";
import type { ServiceItem } from "@/features/services/types";
import { formatPrice } from "@/lib/format";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUICK_SUGGESTIONS = [
  "Power saver",
  "Foam jet",
  "Gas leak",
  "Repair",
  "Install",
  "Anti-rust",
];

const LISTBOX_ID = "search-results";

function optionId(index: number) {
  return `search-option-${index}`;
}

interface SearchPanelProps {
  onClose: () => void;
}

// Mounted only while the dialog is open, so its state resets on every open.
function SearchPanel({ onClose }: SearchPanelProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ServiceItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, startSearch] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const latestRequest = useRef(0);

  const trimmed = query.trim();
  const hasQuery = trimmed !== "";

  useEffect(() => {
    if (!trimmed) return;
    const requestId = ++latestRequest.current;
    startSearch(async () => {
      const found = await serviceApi.searchServices(trimmed);
      // Ignore answers to queries that have since been replaced.
      if (requestId !== latestRequest.current) return;
      setResults(found);
      setSelectedIndex(0);
    });
  }, [trimmed]);

  const showResults = hasQuery && !isSearching && results.length > 0;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!showResults) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      onClose();
      router.push(`/services/${results[selectedIndex].slug}`);
    }
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.25, delay: shouldReduceMotion ? 0 : delay },
    },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  });

  return (
    <div onKeyDown={handleKeyDown} className="relative flex min-h-0 flex-1 flex-col">
      <Dialog.Title className="sr-only">Search services</Dialog.Title>
      <Dialog.Description className="sr-only">
        Search AC services, repairs, and installations.
      </Dialog.Description>

      {/* Input row */}
      <div className="bg-canvas">
        <div className="mx-auto flex h-16 w-full max-w-2xl items-center gap-3 px-4 sm:px-8">
          <svg
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-ink-secondary"
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

          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search services"
            aria-expanded={showResults}
            aria-controls={LISTBOX_ID}
            aria-activedescendant={showResults ? optionId(selectedIndex) : undefined}
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services"
            className="min-w-0 flex-1 bg-transparent py-3 font-display text-lg font-semibold tracking-tight text-ink placeholder:font-normal placeholder:text-ink-muted focus:outline-none sm:text-xl"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center text-ink-secondary hover:text-ink cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}

          <Dialog.Close className="-mr-2 flex min-h-11 shrink-0 items-center px-2 font-display text-xs font-semibold uppercase tracking-widest text-ink cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink">
            Close
          </Dialog.Close>
        </div>
        <m.div
          aria-hidden="true"
          initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
          animate={{
            scaleX: 1,
            transition: { duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" },
          }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className="h-px origin-left bg-hairline"
        />
      </div>

      {/* Body */}
      <m.div {...fade(0.2)} className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
        <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-8">
          {!hasQuery ? (
            <>
              <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-widest text-ink-secondary">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      inputRef.current?.focus();
                    }}
                    className="inline-flex min-h-11 items-center rounded-sm border border-hairline px-3.5 font-sans text-sm text-ink transition-colors hover:border-ink cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          ) : isSearching ? (
            <p role="status" className="py-10 text-center font-sans text-sm text-ink-secondary">
              Searching…
            </p>
          ) : results.length > 0 ? (
            <>
              <p
                role="status"
                className="mb-1 font-num font-tabular text-xs text-ink-secondary"
              >
                {results.length} {results.length === 1 ? "result" : "results"}
              </p>
              <ul id={LISTBOX_ID} role="listbox" aria-label="Search results">
                {results.map((service, index) => (
                  <li
                    key={service.id}
                    id={optionId(index)}
                    role="option"
                    aria-selected={index === selectedIndex}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="border-b border-hairline-subtle last:border-b-0"
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={onClose}
                      className={`-mx-3 flex min-h-[4.5rem] items-center justify-between gap-4 rounded-sm px-3 py-3.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none ${
                        index === selectedIndex ? "bg-canvas-surface" : ""
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-display text-base font-semibold text-ink">
                          {service.title}
                        </span>
                        <span className="mt-0.5 flex items-center gap-2 font-num text-xs text-ink-secondary">
                          <span className="font-sans uppercase tracking-wider">
                            {service.category.replace("-", " ")}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{service.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span>★ {service.rating}</span>
                        </span>
                      </span>
                      <span className="shrink-0 font-num font-tabular text-base font-bold text-ink">
                        {service.currency}
                        {formatPrice(service.currentPrice)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div role="status" className="py-10 text-center">
              <p className="font-sans text-sm font-medium text-ink">
                No services found
              </p>
              <p className="mt-1 font-sans text-xs text-ink-secondary">
                Try &ldquo;cleaning&rdquo;, &ldquo;repair&rdquo; or &ldquo;installation&rdquo;
              </p>
            </div>
          )}
        </div>
      </m.div>

      <m.div
        {...fade(0.25)}
        className="hidden border-t border-hairline-subtle md:block"
      >
        <p className="mx-auto w-full max-w-2xl px-8 py-3 font-sans text-[11px] text-ink-secondary">
          ↑ ↓ to move · ↵ to open · esc to close
        </p>
      </m.div>
    </div>
  );
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const shouldReduceMotion = useReducedMotion();

  const layerTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : ({ duration: 0.28, delay: 0.08, ease: [0.22, 1, 0.36, 1] } as const);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Invisible, only catches taps outside the panel */}
            <Dialog.Overlay className="fixed inset-0 z-50" />

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <div className="fixed inset-0 z-50 flex flex-col pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] md:pt-0 md:pb-0 md:inset-x-0 md:bottom-auto md:h-[32rem]">
                {/* Flat canvas that opens down from the top */}
                <m.div
                  aria-hidden="true"
                  initial={{
                    scaleY: shouldReduceMotion ? 1 : 0,
                    opacity: shouldReduceMotion ? 0 : 1,
                  }}
                  animate={{ scaleY: 1, opacity: 1, transition: layerTransition }}
                  exit={{
                    scaleY: shouldReduceMotion ? 1 : 0,
                    opacity: shouldReduceMotion ? 0 : 1,
                    transition: { duration: shouldReduceMotion ? 0.12 : 0.2 },
                  }}
                  className="absolute inset-0 origin-top border-hairline bg-canvas md:border-b"
                />
                <SearchPanel onClose={() => onOpenChange(false)} />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
