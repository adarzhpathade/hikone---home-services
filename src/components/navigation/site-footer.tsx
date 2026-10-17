import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full bg-canvas border-t border-hairline-subtle mt-24 sm:mt-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-16 sm:pt-20 pb-12">
        {/* Large Editorial Headline */}
        <div className="mb-14 sm:mb-20">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-ink leading-tight">
            Don&apos;t be shy,
            <br />
            just say hi!
          </h2>
        </div>

        {/* 4 Editorial Info Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-16 sm:pb-20 text-[11px] sm:text-xs font-sans">
          {/* Column 1 */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold uppercase tracking-wider text-ink text-[11px]">
              San Diego
            </h3>
            <p className="text-ink-secondary leading-relaxed">
              935 Ashcraft Court,
              <br />
              San Diego CA, 92104
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold uppercase tracking-wider text-ink text-[11px]">
              Start a Conversation
            </h3>
            <div className="flex flex-col space-y-1 text-ink-secondary">
              <a
                href="mailto:concierge@urban-services.com"
                className="hover:text-ink transition-colors"
              >
                concierge@urban-services.com
              </a>
              <span className="font-num">+1.858.755.6922</span>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold uppercase tracking-wider text-ink text-[11px]">
              Career
            </h3>
            <p className="text-ink-secondary leading-relaxed">
              Work somewhere you can be proud of!
            </p>
            <Link
              href="#careers"
              className="inline-block text-ink font-medium underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              View Current Opportunities
            </Link>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold uppercase tracking-wider text-ink text-[11px] sr-only">
              Social Links
            </h3>
            <ul className="space-y-2 font-display uppercase tracking-wider text-[11px] font-semibold text-ink">
              <li>
                <a href="#facebook" className="hover:text-ink-secondary transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#twitter" className="hover:text-ink-secondary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-ink-secondary transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#behance" className="hover:text-ink-secondary transition-colors">
                  Behance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div className="border-t border-hairline-subtle pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-ink-muted uppercase tracking-wider font-sans">
          <div className="flex items-center gap-4">
            <Link href="#terms" className="hover:text-ink transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#privacy" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="text-ink-secondary font-medium lowercase">
            urban.prototype
          </div>

          <div>
            ©2026 Urban Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
