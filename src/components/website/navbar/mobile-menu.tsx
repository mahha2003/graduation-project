"use client";

/**
 * MobileMenu
 * ----------
 * Hamburger button (≡) that triggers a shadcn Sheet drawer.
 * - In LTR (English): slides in from the LEFT
 * - In RTL (Arabic):  slides in from the RIGHT
 *
 * Contains the full vertical nav + language switcher in the footer.
 */
import { useState } from "react";

import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LanguageSwitcher } from "../../layouts/language-switcher";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "@/components/layouts/theme-toggle";
// import { NavLinks } from "../website/navbar/nav-links";
// import { ThemeToggle } from "./theme-toggle";

/** Inline logo SVG — same three-arc spiral used in the main Navbar */
function DrawerLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-8 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M10 4 C10 4 32 4 32 22 C32 40 10 40 10 40"
          stroke="#1a2e5a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 11 C10 11 25 11 25 22 C25 33 10 33 10 33"
          stroke="#1a2e5a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 18 C10 18 18 18 18 22 C18 26 10 26 10 26"
          stroke="#1a2e5a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[1.05rem] leading-none font-black tracking-tight text-[#1a2e5a] dark:text-blue-300">
        TrackUni
      </span>
    </div>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Drawer slides from the start edge (left in LTR, right in RTL)
  const drawerSide = isRtl ? "right" : "left";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1a2e5a] transition-colors duration-150 hover:bg-[#c0d5f2]/60 hover:text-[#003c8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a] dark:text-slate-300 dark:hover:bg-slate-700/60 dark:hover:text-white"
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          {open ? (
            <X className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
          ) : (
            <Menu className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side={drawerSide}
        dir={isRtl ? "rtl" : "ltr"}
        className="flex w-68 max-w-[85vw] flex-col border-slate-200 bg-white p-0 dark:border-slate-700 dark:bg-slate-900"
      >
        {/* ── Header ── */}
        <SheetHeader className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <SheetTitle asChild>
            <DrawerLogo />
          </SheetTitle>
        </SheetHeader>

        {/* ── Nav links ── */}
        <div className="flex-1 overflow-y-auto py-3">
          <NavLinks orientation="vertical" onLinkClick={() => setOpen(false)} />
        </div>

        {/* ── Footer controls ── */}
        <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-4 dark:border-slate-800">
          <ThemeToggle />
          <LanguageSwitcher />
          <span className="ms-auto text-xs font-medium text-slate-400 dark:text-slate-600">
            TrackUni
          </span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
