"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "./menu-icon";
import { SearchDialog } from "./search-dialog";

// The menu chunk is only fetched the first time it is opened.
const MobileMenu = dynamic(() =>
  import("./mobile-menu").then((mod) => mod.MobileMenu),
);

interface SiteHeaderProps {
  onCartClick?: () => void;
}

export function SiteHeader({ onCartClick }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuRequested, setMenuRequested] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Global keyboard shortcut: Cmd+K / Ctrl+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className="w-full bg-canvas/92 backdrop-blur-md sticky top-0 z-40 border-b border-hairline/40 transition-colors"
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-12 h-16 sm:h-20 grid grid-cols-[1fr_auto_1fr] items-center md:flex md:justify-between">
          <button
            ref={menuButtonRef}
            onClick={() => {
              setMenuRequested(true);
              setMobileMenuOpen(true);
            }}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={mobileMenuOpen}
            className="group relative -ml-3 h-11 w-11 justify-self-start text-ink cursor-pointer md:hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
          >
            <MenuIcon open={false} />
          </button>

          <Link
            href="/"
            className="font-display font-bold text-lg sm:text-xl tracking-wider text-ink uppercase"
          >
            Hikone
          </Link>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8 text-[11px] uppercase font-display font-medium tracking-widest"
          >
            <Link
              href="/"
              className={`transition-colors ${
                pathname === "/"
                  ? "text-ink font-semibold"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#service-hubs"
              className={`transition-colors ${
                pathname === "/ac" ||
                pathname === "/fridge" ||
                pathname.startsWith("/services")
                  ? "text-ink font-semibold"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-ink-secondary hover:text-ink transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-ink-secondary hover:text-ink transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search Trigger */}
          <div className="flex items-center justify-self-end">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search services"
              className="relative -mr-3 md:mr-0 flex h-11 items-center justify-center gap-2 px-2 text-ink hover:opacity-70 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
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
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-ink-muted border border-hairline rounded bg-canvas-surface/40 select-none">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {menuRequested && (
        <MobileMenu
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
          onCartClick={onCartClick}
          onSearchClick={() => setSearchOpen(true)}
          triggerRef={menuButtonRef}
        />
      )}

      {/* Accessible Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
