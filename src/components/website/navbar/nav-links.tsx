"use client";

import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";

import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "" },
  { key: "courses", href: "/courses" },
  { key: "announcements", href: "/announcements" },
  { key: "blogs", href: "/blogs" },
  { key: "faq", href: "/faq" },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];

export interface NavLinksProps {
  orientation?: "horizontal" | "vertical";
  onLinkClick?: () => void;
}

export function NavLinks({
  orientation = "horizontal",
  onLinkClick,
}: NavLinksProps) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  // بناء الرابط ليتناسب مع هيكلية المسارات لديكِ
  const buildHref = (item: NavItem) => `/${locale}/website${item.href}`;
  const isActive = (item: NavItem) => {
    const href = buildHref(item);

    if (item.href === "") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav
      aria-label="Student website navigation"
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-10"
          : "flex flex-col gap-2 px-2"
      )}
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(item);
        const href = buildHref(item);

        return (
          <Link
            key={item.key}
            //@ts-expect-error
            href={href}
            onClick={onLinkClick}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex flex-col items-center",
              "transition-colors duration-150",
              "rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a]",
              "text-base font-semibold",
              orientation === "horizontal" && "px-1 py-1",
              orientation === "vertical" && [
                "w-full flex-row items-center rounded-lg px-4 py-3",
                active
                  ? "bg-[#c0d5f2]/40 dark:bg-[#003c8a]/20"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800/60",
              ],
              active
                ? "text-[#003c8a] dark:text-blue-400"
                : "text-[#475569] hover:text-[#003c8a] dark:text-slate-400 dark:hover:text-blue-300"
            )}
          >
            {orientation === "vertical" && active && (
              <span
                className="absolute start-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-e-full bg-[#003c8a] dark:bg-blue-400"
                aria-hidden="true"
              />
            )}

            {/* تم التأكد من أن t(item.key) ستجد مفتاحاً مطابقاً في الـ JSON */}
            <span>{t(item.key)}</span>

            {orientation === "horizontal" && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-[3px] rounded-full transition-all duration-200 ease-out",
                  "-bottom-1.5",
                  active
                    ? "w-full bg-[#003c8a] dark:bg-blue-400"
                    : "w-0 bg-transparent"
                )}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
