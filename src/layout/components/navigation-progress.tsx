"use client";

import { useEffect } from "react";

import { usePathname } from "@/i18n/routing";
import { doneProgress } from "@/lib/progress";

export function NavigationProgress() {
  const pathname = usePathname();

  useEffect(() => {
    doneProgress();
  }, [pathname]);

  return null;
}
