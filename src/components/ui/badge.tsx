import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "indigo" | "terracotta" | "kraft" | "default";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    indigo: "bg-accent-indigo text-ink-inverted",
    terracotta: "bg-accent-terracotta text-ink-inverted",
    kraft: "bg-accent-kraft text-ink-inverted",
    default: "bg-ink text-ink-inverted",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-display font-semibold tracking-widest rounded-sm ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
