"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordPath, settleNavigation } from "@/lib/navigation-transition";

export function NavigationSettled() {
  const pathname = usePathname();

  useEffect(() => {
    recordPath(pathname);
    settleNavigation();
  }, [pathname]);

  return null;
}
