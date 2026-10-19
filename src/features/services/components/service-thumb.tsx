"use client";

import { useState } from "react";
import Image from "next/image";
import { getMonogram } from "@/lib/format";
import type { ServiceItem } from "../types";

interface ServiceThumbProps {
  service: Pick<ServiceItem, "title" | "category" | "image">;
  sizes: string;
  priority?: boolean;
  monogramClassName?: string;
}

// Fills its parent (which must be `relative`): the service image if there is
// one and it loads, otherwise the monogram. The parent's tone is the placeholder.
export function ServiceThumb({
  service,
  sizes,
  priority = false,
  monogramClassName = "text-xl sm:text-2xl",
}: ServiceThumbProps) {
  const [failed, setFailed] = useState(false);

  if (service.image && !failed) {
    return (
      <Image
        src={service.image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className="object-contain"
      />
    );
  }

  return (
    <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center">
      <span
        aria-hidden="true"
        className={`font-display font-bold tracking-widest text-ink/30 ${monogramClassName}`}
      >
        {getMonogram(service.title)}
      </span>
      <span
        aria-hidden="true"
        className="font-sans text-[10px] uppercase tracking-widest text-ink-secondary/70"
      >
        {service.category.replace("-", " ")}
      </span>
    </span>
  );
}
