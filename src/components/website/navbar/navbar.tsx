"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "next-intl";

import { LanguageSwitcher } from "../../layouts/language-switcher";
import { ThemeToggle } from "../../layouts/theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { NotificationBell } from "./notification-bell";
import { UserMenu } from "./user-menu";

export interface NavbarProps {
  notificationCount?: number;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export function Navbar({ notificationCount = 0, user }: NavbarProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-[#001E42]/95"
    >
      <div className="mx-auto max-w-full px-5 md:px-8">
        {/* DESKTOP NAVBAR */}
        <div className="hidden h-16 items-center justify-between md:flex">
          {/* LEFT: LOGO & BRAND */}
          <Link
          // @ts-expect-error
            href={`/${locale}/website`}
            className="flex items-center gap-4 rounded transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a]"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={30}
              height={30}
              // style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />

            <span
              dir="ltr"
              className="text-[1.2rem] font-extrabold text-[#003C8A] dark:text-blue-200"
            >
              TrackUni
            </span>
          </Link>

          {/* CENTER: NAV LINKS */}
          <nav className="flex flex-1 justify-center px-4">
            <NavLinks orientation="horizontal" />
          </nav>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border-x border-slate-100 px-2 dark:border-slate-700/50">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            <NotificationBell count={notificationCount} />

            <UserMenu
              name={user?.name}
              email={user?.email}
              avatarUrl={user?.avatarUrl}
            />
          </div>
        </div>

        {/* MOBILE NAVBAR */}
        <div className="flex h-16 items-center justify-between md:hidden">
          {/* LEFT: LOGO */}
          {/* @ts-expect-error */}
          <Link href={`/${locale}/website`} className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="University Logo"
              width={32}
              height={32}
              style={{ height: "auto" }}
              className="object-contain"
              priority
            />

            <span
              dir="ltr"
              className="text-[1rem] font-bold text-[#003C8A] dark:text-blue-200"
            >
              TrackUni
            </span>
          </Link>

          {/* RIGHT: ICONS */}
          <div className="flex items-center gap-2">
            <NotificationBell count={notificationCount} />
            <ThemeToggle />

            <div
              className={`border-slate-200 dark:border-slate-700 ${
                isRtl ? "mr-1 border-r pr-1" : "ml-1 border-l pl-1"
              }`}
            >
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
