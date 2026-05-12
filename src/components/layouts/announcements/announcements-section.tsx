"use client";

import { useTranslations } from "next-intl";

import AnnouncementCard from "./announcement-card";
import { Announcement } from "./types";

interface Props {
  announcements: Announcement[];
  loading?: boolean;
}

export default function AnnouncementsSection({
  announcements,
  loading,
}: Props) {
  const t = useTranslations("announcements");

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
