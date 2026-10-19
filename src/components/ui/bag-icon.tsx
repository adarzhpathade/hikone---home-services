interface BagIconProps {
  className?: string;
  strokeWidth?: number;
}

export function BagIcon({ className, strokeWidth = 1.5 }: BagIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.2 8h11.6a1 1 0 0 1 1 .93l.9 11a1 1 0 0 1-1 1.07H5.3a1 1 0 0 1-1-1.07l.9-11A1 1 0 0 1 6.2 8Z" />
      <path d="M8.5 8V7a3.5 3.5 0 0 1 7 0v1" />
    </svg>
  );
}
