import Image from "next/image";
import { TransitionLink } from "@/components/ui/transition-link";
import { SectionHeading } from "./section-heading";

interface Hub {
  id: string;
  image: string;
  title: string;
  href: string;
  serviceCount: number;
  fromPrice: string;
  rating: string;
  duration: string;
  description: string;
}

const HUBS: ReadonlyArray<Hub> = [
  {
    id: "ac",
    image: "/images/home/home-ac.png",
    title: "Air Conditioning",
    href: "/ac",
    serviceCount: 9,
    fromPrice: "₹599",
    rating: "4.78 (14.3M)",
    duration: "45–90 mins",
    description:
      "Foam-jet sanitization, refrigerant leak diagnosis, PCB troubleshooting and relocation.",
  },
  {
    id: "fridge",
    image: "/images/home/home-fridge.png",
    title: "Refrigerators",
    href: "/fridge",
    serviceCount: 8,
    fromPrice: "₹299",
    rating: "4.84 (8.6M)",
    duration: "45–75 mins",
    description:
      "Steam sanitization, condenser coil vacuuming, thermostat calibration and gasket sealing.",
  },
];

export function CategoryGateway() {
  return (
    <section
      id="service-hubs"
      className="scroll-mt-20 sm:scroll-mt-24"
    >
      <SectionHeading eyebrow="Appliances" title="Choose a service" />

      <div className="grid grid-cols-1 sm:grid-cols-2 pt-px pl-px">
        {HUBS.map((hub) => (
          <TransitionLink
            key={hub.id}
            href={hub.href}
            direction="forward"
            className="group -mt-px -ml-px flex flex-col border border-hairline bg-canvas p-4 sm:p-5 transition-colors hover:bg-canvas-surface/20 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
          >
            {/* The tone block doubles as the image placeholder */}
            <span className="relative mb-4 block aspect-[16/10] sm:aspect-[2/1] w-full overflow-hidden rounded-sm border border-hairline/60 bg-canvas-surface">
              <Image
                src={hub.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 590px, (min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="absolute bottom-3 left-3 font-sans text-[10px] uppercase tracking-widest text-ink-secondary/70">
                {hub.serviceCount} services
              </span>
            </span>

            <span className="font-display text-base sm:text-lg font-semibold leading-snug text-ink">
              {hub.title}
            </span>
            <span className="mt-1 font-num font-tabular text-xs text-ink-secondary">
              <span className="font-semibold text-ink">
                <span aria-hidden="true" className="text-accent-terracotta">
                  ★
                </span>{" "}
                {hub.rating}
              </span>{" "}
              · {hub.duration}
            </span>
            <span className="mt-2 font-sans text-[13px] leading-relaxed text-ink-secondary">
              {hub.description}
            </span>

            <span className="mt-4 flex items-center justify-between gap-3 border-t border-hairline-subtle pt-4">
              <span className="font-num font-tabular text-sm text-ink-secondary">
                From{" "}
                <span className="text-base font-bold text-ink">
                  {hub.fromPrice}
                </span>
              </span>
              <span className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-ink px-5 font-display text-xs font-semibold uppercase tracking-widest text-ink-inverted transition-opacity group-hover:opacity-90">
                Explore
                <span aria-hidden="true">→</span>
              </span>
            </span>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
