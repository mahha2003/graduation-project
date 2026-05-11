"use client";

/**
 * LanguageSwitcher
 * ----------------
 * Globe icon that opens a dropdown of available locales.
 * When switching, it replaces only the [locale] segment (index 1 in the
 * path) so the user stays on the same page, e.g.:
 *   /en/website/courses  →  /ar/website/courses
 *
 * Integrates with the existing next-intl setup — no new i18n config.
 */
import { usePathname, useRouter } from "next/navigation";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALES = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "العربية", dir: "rtl" as const },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (code: string) => {
    // pathname = "/en/website/courses" → segments = ["", "en", "website", "courses"]
    const segments = pathname.split("/");
    segments[1] = code; // swap the locale segment
    router.push(segments.join("/") || "/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1a2e5a] transition-colors duration-150 hover:bg-[#c0d5f2]/60 hover:text-[#003c8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a] dark:text-slate-300 dark:hover:bg-slate-700/60 dark:hover:text-white"
          aria-label="Switch language"
          title="Switch language"
        >
          <Globe className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.9} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="min-w-[136px] rounded-xl border border-slate-200 bg-white p-1 shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
      >
        {LOCALES.map((l) => {
          const isActive = locale === l.code;
          return (
            <DropdownMenuItem
              key={l.code}
              onClick={() => switchLocale(l.code)}
              dir={l.dir}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:bg-transparent ${
                isActive
                  ? "bg-[#c0d5f2]/50 text-[#003c8a] dark:bg-[#003c8a]/25 dark:text-blue-300"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              } `}
            >
              <span className="flex items-center justify-between gap-3">
                {l.label}
                {isActive && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#003c8a] dark:bg-blue-400" />
                )}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
