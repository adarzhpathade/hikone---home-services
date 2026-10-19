import { TransitionLink } from "@/components/ui/transition-link";
import { SectionHeading } from "./section-heading";

interface Offer {
  id: string;
  label: string;
  labelClass: string;
  tag: string;
  title: string;
  copy: string;
  perks: string[];
  code: string;
  ctaText: string;
  href: string;
}

const OFFERS: ReadonlyArray<Offer> = [
  {
    id: "offer-summer-cooling",
    label: "Featured",
    labelClass: "text-ink-secondary",
    tag: "Flat 25% off",
    title: "Summer cooling fest",
    copy: "Complete AC power-saver overhaul with dual foam-jet sanitization and a high-pressure outdoor coil wash.",
    perks: [
      "Dual foam-jet sanitization",
      "Outdoor coil pressure wash",
      "Complimentary gas pressure test",
    ],
    code: "SUMMERCOOL",
    ctaText: "Claim offer",
    href: "/ac",
  },
  {
    id: "offer-ac-clean",
    label: "AC special",
    labelClass: "text-accent-terracotta",
    tag: "Save ₹200",
    title: "Zero-mess foam-jet sanitization",
    copy: "Industrial-grade double power jet wash with waterproof floor catchment sheets and mold extraction.",
    perks: [
      "Deep blower and coil wash",
      "Zero-mess clean guarantee",
      "Pre and post temperature check",
    ],
    code: "CLEAN20",
    ctaText: "Book AC clean",
    href: "/ac",
  },
  {
    id: "offer-cooling-express",
    label: "Same day",
    labelClass: "text-accent-indigo",
    tag: "From ₹299",
    title: "Express cooling diagnostics",
    copy: "AC not cooling or fridge leaking? Factory-trained specialists arrive with digital diagnostic gear.",
    perks: [
      "45-minute priority arrival",
      "Transparent spares rate card",
      "30-day performance cover",
    ],
    code: "QUICKCOOL",
    ctaText: "Book repair",
    href: "/ac",
  },
  {
    id: "offer-fridge-overhaul",
    label: "Refrigerator",
    labelClass: "text-accent-kraft",
    tag: "Flat 20% off",
    title: "Food-safe refrigerator sanitization",
    copy: "Dual-door and French door deep cleaning with steam sterilization, gasket mold clean and condenser dusting.",
    perks: [
      "Food-grade sanitization",
      "Rear coil dust extraction",
      "Drain line pressure flush",
    ],
    code: "FRIDGECARE",
    ctaText: "Book fridge care",
    href: "/fridge",
  },
];

export function PromotionalBanners() {
  return (
    <section>
      <SectionHeading eyebrow="Offers" title="Featured offers" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-px pl-px">
        {OFFERS.map((offer) => (
          <article
            key={offer.id}
            className="-mt-px -ml-px flex flex-col border border-hairline bg-canvas p-4 sm:p-5 transition-colors hover:bg-canvas-surface/20 motion-reduce:transition-none"
          >
            <p className="flex items-baseline justify-between gap-3">
              <span
                className={`font-display text-[11px] font-semibold uppercase tracking-widest ${offer.labelClass}`}
              >
                {offer.label}
              </span>
              <span className="font-num text-xs font-bold text-accent-terracotta">
                {offer.tag}
              </span>
            </p>

            <h3 className="mt-3 font-display text-base sm:text-lg font-semibold leading-snug text-ink">
              {offer.title}
            </h3>
            <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-secondary">
              {offer.copy}
            </p>

            <ul className="mt-4 space-y-2 border-t border-hairline-subtle pt-4 font-sans text-[13px] text-ink-secondary">
              {offer.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-secondary"
                  />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <p className="font-num font-tabular text-xs text-ink-secondary">
                Code
                <span className="ml-1 font-bold tracking-wider text-ink">
                  {offer.code}
                </span>
              </p>
              <TransitionLink
                href={offer.href}
                direction="forward"
                className="inline-flex min-h-11 items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {offer.ctaText}
                <span aria-hidden="true">→</span>
              </TransitionLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
