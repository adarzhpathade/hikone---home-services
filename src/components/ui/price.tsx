interface PriceProps {
  currentPrice: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Price({
  currentPrice,
  originalPrice,
  currency = "$",
  className = "",
  size = "md",
}: PriceProps) {
  const isUSD = currency === "$";
  const formatAmount = (val: number) =>
    new Intl.NumberFormat(isUSD ? "en-US" : "en-IN", {
      minimumFractionDigits: isUSD ? 2 : 0,
      maximumFractionDigits: isUSD ? 2 : 0,
    }).format(val);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-xs sm:text-[13px]",
    lg: "text-sm sm:text-base",
  };

  const hasDiscount = originalPrice && originalPrice > currentPrice;

  return (
    <div
      className={`font-num font-tabular inline-flex items-baseline gap-2.5 ${sizeClasses[size]} ${className}`}
    >
      {hasDiscount && (
        <span className="line-through text-ink-muted font-normal">
          {currency}
          {formatAmount(originalPrice)}
        </span>
      )}
      <span className="font-semibold text-ink">
        {currency}
        {formatAmount(currentPrice)}
      </span>
    </div>
  );
}
