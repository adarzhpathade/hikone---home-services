interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  note?: string;
}

// Same heading scale as the catalog sections, so both pages read as one app.
export function SectionHeading({ eyebrow, title, note }: SectionHeadingProps) {
  return (
    <div className="mb-6 sm:mb-8 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <div>
        <span className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-widest text-ink-secondary">
          {eyebrow}
        </span>
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-ink">
          {title}
        </h2>
      </div>
      {note && (
        <p className="font-num font-tabular text-xs sm:text-sm text-ink-secondary">
          {note}
        </p>
      )}
    </div>
  );
}
