import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-display uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-sm",
    md: "px-4 py-2 text-xs sm:text-sm rounded-sm",
    lg: "px-6 py-3 text-sm rounded-sm",
  };

  const variantStyles = {
    primary: "bg-ink text-ink-inverted hover:bg-black active:scale-[0.98]",
    secondary:
      "border border-hairline text-ink bg-transparent hover:bg-canvas-surface active:scale-[0.98]",
    ghost:
      "text-ink hover:text-ink-secondary bg-transparent hover:bg-canvas-surface/50",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
