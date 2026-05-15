"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Announcement } from "../../../app/[locale]/website/announcements/types";

interface Props {
  item: Announcement;
}

const categoryStyles = {
  regular: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    border: "border-l-[6px] border-l-blue-600 dark:border-l-blue-500",
  },

  important: {
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    border: "border-l-[6px] border-l-orange-500 dark:border-l-orange-400",
  },

  emergency: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    border: "border-l-[6px] border-l-red-600 dark:border-l-red-500",
  },
} as const;

export default function AnnouncementCard({ item }: Props) {
  const t = useTranslations("announcements");

  const categoryClass = categoryStyles[item.category];

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
        categoryClass?.border
      )}
    >
      {/* CATEGORY BADGE */}
      <span
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold capitalize",
          categoryClass?.badge
        )}
      >
        {t(`categories.${item.category}`)}
      </span>

      {/* TITLE */}
      <h3 className="mt-4 line-clamp-2 text-lg font-bold text-slate-800 dark:text-white">
        {t(item.title)}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-2 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
        {t(item.description)}
      </p>

      {/* DATE */}
      <p className="mt-5 text-xs text-slate-400">{item.createdAt}</p>
    </div>
  );
}
