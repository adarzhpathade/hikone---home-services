"use client";

import Link from "next/link";
import { useState } from "react";

interface SiteHeaderProps {
  cartCount?: number;
}

export function SiteHeader({ cartCount = 0 }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-canvas sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand & Menu Toggle */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-display font-bold text-lg sm:text-xl tracking-wider text-ink uppercase"
          >
            Hikone
          </Link>

          {/* Minimal 2-line menu icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex flex-col justify-center gap-1.5 w-6 h-6 text-ink hover:opacity-70 transition-opacity cursor-pointer md:hidden"
          >
            <span className="block h-[1.5px] w-5 bg-ink" />
            <span className="block h-[1.5px] w-3 bg-ink" />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-8 text-[11px] uppercase font-display font-medium tracking-widest text-ink-secondary"
        >
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <Link href="#pages" className="hover:text-ink transition-colors">
            Pages
          </Link>
          <Link href="#work" className="hover:text-ink transition-colors">
            Work
          </Link>
          <Link href="#blog" className="hover:text-ink transition-colors">
            Blog
          </Link>
          <Link href="/" className="text-ink font-semibold transition-colors">
            Shop
          </Link>
          <Link href="#features" className="hover:text-ink transition-colors">
            Features
          </Link>
        </nav>

        {/* Cart Bag Icon with tabular counter */}
        <div className="flex items-center">
          <button
            aria-label={`View cart with ${cartCount} items`}
            className="flex items-center gap-1.5 text-ink hover:text-ink-secondary transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 stroke-[1.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="font-num font-tabular text-xs font-semibold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-b border-hairline-subtle bg-canvas px-6 py-4 flex flex-col gap-3 text-xs uppercase font-display tracking-widest"
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-ink font-semibold py-1"
          >
            Shop (Catalog)
          </Link>
          <Link
            href="#pages"
            onClick={() => setMobileMenuOpen(false)}
            className="text-ink-secondary hover:text-ink py-1"
          >
            Pages
          </Link>
          <Link
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-ink-secondary hover:text-ink py-1"
          >
            Work
          </Link>
          <Link
            href="#blog"
            onClick={() => setMobileMenuOpen(false)}
            className="text-ink-secondary hover:text-ink py-1"
          >
            Blog
          </Link>
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-ink-secondary hover:text-ink py-1"
          >
            Features
          </Link>
        </nav>
      )}
    </header>
  );
}
