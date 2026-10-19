import { SectionHeading } from "./section-heading";

export function QualityStandards() {
  const standards = [
    {
      num: "01",
      title: "30-Day Guarantee",
      description:
        "Comprehensive service cover on all cooling and mechanical repairs. If any issue reoccurs within 30 days, we re-inspect and fix it at zero cost.",
    },
    {
      num: "02",
      title: "Certified Specialists",
      description:
        "Every technician is rigorously vetted, factory-trained on modern inverter systems, and equipped with precision diagnostic instruments.",
    },
    {
      num: "03",
      title: "Transparent Fixed Pricing",
      description:
        "Standardized digital rate card with itemized spares pricing. You approve every quote upfront before a single bolt is turned.",
    },
    {
      num: "04",
      title: "Zero-Mess Protocol",
      description:
        "We treat your home like an architectural gallery. Complete floor protection sheets, dust catchers, and spotless cleanup after every visit.",
    },
  ];

  return (
    <section>
      <SectionHeading eyebrow="Commitment" title="The Hikone standard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-px pl-px">
        {standards.map((standard) => (
          <div
            key={standard.num}
            className="-mt-px -ml-px border border-hairline bg-canvas p-4 sm:p-5"
          >
            <span className="mb-3 block font-num font-tabular text-xs font-semibold tracking-widest text-ink-muted">
              {standard.num}
            </span>
            <h3 className="font-display text-base sm:text-lg font-semibold leading-snug text-ink">
              {standard.title}
            </h3>
            <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-secondary">
              {standard.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
