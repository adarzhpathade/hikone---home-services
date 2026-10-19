interface MenuIconProps {
  open: boolean;
}

// Two-line menu icon that turns into a close cross when open.
export function MenuIcon({ open }: MenuIconProps) {
  return (
    <>
      <span
        className={`absolute left-[calc(50%-9px)] top-1/2 h-[1.5px] w-[18px] bg-current transition-transform duration-200 ease-out motion-reduce:transition-none ${
          open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]"
        }`}
      />
      <span
        className={`absolute left-[calc(50%-9px)] top-1/2 h-[1.5px] w-[18px] bg-current transition-transform duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "translate-y-0 -rotate-45"
            : "translate-y-[3.5px] -translate-x-[3px] scale-x-[0.667] group-hover:translate-x-0 group-hover:scale-x-100"
        }`}
      />
    </>
  );
}
