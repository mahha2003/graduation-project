"use client";

import { useTranslations } from "next-intl";

import { Announcement } from "../../../app/[locale]/website/announcements/types";
import AnnouncementCard from "./announcement-card";

const announcements: Announcement[] = [
  {
    id: "1",
    title: "regularTitle",
    description: "regularDescription",
    category: "regular",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "importantTitle",
    description: "importantDescription",
    category: "important",
    createdAt: "Yesterday",
  },
  {
    id: "3",
    title: "emergencyTitle",
    description: "emergencyDescription",
    category: "emergency",
    createdAt: "Just now",
  },
] as const;

export default function AnnouncementsSection() {
  const t = useTranslations("announcements");
  const loading = false; // Set to true to show loading state (implement here)

  if (loading) {
    return (
      <section className="space-y-5">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        <div className="grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          {t("title")}
        </h2>

        <button className="text-sm font-semibold text-[#003C8A] transition-colors hover:text-blue-700">
          {t("seeAll")}
        </button>
      </div>

      {/* EMPTY STATE */}
      {announcements.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-slate-500 dark:border-slate-700">
          {t("empty")}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {announcements.map((item) => (
            <AnnouncementCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
