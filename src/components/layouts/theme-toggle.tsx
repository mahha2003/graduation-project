"use client";

/**
 * ThemeToggle
 * -----------
 * Hydration-safe toggle using next-themes' resolvedTheme.
 * - Light mode → shows Moon icon  (click → go dark)
 * - Dark  mode → shows Sun  icon  (click → go light)
 *
 * Renders nothing until mounted to avoid SSR/CSR mismatch.
 */

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Don't render anything on the server to avoid hydration mismatch
  if (!mounted) {
    return <span className="inline-block w-8 h-8" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        flex items-center justify-center
        w-8 h-8 rounded-lg
        text-[#1a2e5a] dark:text-slate-300
        hover:bg-[#c0d5f2]/60 dark:hover:bg-slate-700/60
        hover:text-[#003c8a] dark:hover:text-white
        transition-colors duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a]
      "
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark
        ? <Sun  className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.9} />
        : <Moon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.9} />
      }
    </button>
  );
}
