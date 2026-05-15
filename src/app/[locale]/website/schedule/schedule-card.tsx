"use client";

/**
 * src/components/dashboard/lecture-card.tsx
 *
 * TRANSLATION KEYS USED  (from locales/{locale}/schedule.json → schedule.status.*):
 *   schedule.status.current
 *   schedule.status.upcoming
 *   schedule.status.completed
 *   schedule.status.cancelled
 *
 * FIX: was useTranslations('') with full paths like "schedule.status.current".
 *      Changed to useTranslations("schedule") + short key "status.current".
 *      Both work, but scoped namespace is safer and matches the JSON structure.
 */
import { Clock, MapPin, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Lecture, LectureStatus } from "@/types/dashboard";

// ─── Status → translation key map ────────────────────────────────────────────
// Keys are relative to the "schedule" namespace (schedule.json → schedule.status.*)
const STATUS_KEY: Record<
  LectureStatus,
  "status.current" | "status.upcoming" | "status.completed" | "status.cancelled"
> = {
  current: "status.current",
  upcoming: "status.upcoming",
  completed: "status.completed",
  cancelled: "status.cancelled",
};
// ─── Per-status Tailwind class sets ──────────────────────────────────────────

const statusStyles: Record<
  LectureStatus,
  {
    card: string;
    badge: string;
    subject: string;
  }
> = {
  current: {
    card: "border-[#003c8a] dark:border-blue-500 bg-[#003c8a] shadow-lg shadow-blue-200/50 dark:shadow-blue-900/40 ring-1 ring-[#003c8a]/20 dark:ring-blue-500/30",
    badge: "bg-blue-100 text-[#003c8a] dark:bg-blue-900/60 dark:text-blue-300",
    subject: "font-bold text-white",
  },
  upcoming: {
    card: "border-slate-200 bg-white hover:border-[#003c8a]/40 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-500/40",
    badge:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
    subject: "font-semibold text-slate-800 dark:text-slate-100",
  },
  completed: {
    card: "border-slate-200 bg-slate-50 opacity-70 dark:border-slate-700/50 dark:bg-slate-800/40",
    badge: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
    subject: "font-medium text-slate-500 dark:text-slate-400",
  },
  cancelled: {
    card: "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-900/10",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400",
    subject: "font-medium text-red-700 line-through dark:text-red-400",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export interface LectureCardProps {
  lecture: Lecture;
}

export function LectureCard({ lecture }: LectureCardProps) {
  // FIX: was useTranslations('') — empty string means root, which works but is
  // fragile. Using "schedule" namespace + relative key is the correct pattern.
  const t = useTranslations("schedule");

  const styles = statusStyles[lecture.status];
  const isCurrent = lecture.status === "current";

  return (
    <article
      aria-label={`${lecture.subject}, ${lecture.timeRange}`}
      className={cn(
        "relative flex flex-col gap-2.5",
        "w-[175px] min-w-[175px] shrink-0",
        "cursor-default rounded-2xl border p-4",
        "transition-all duration-200",
        styles.card
      )}
    >
      {/* Pulsing live dot — current only */}
      {isCurrent && (
        <span
          className="absolute end-3 top-3 flex h-2.5 w-2.5"
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
        </span>
      )}

      {/* Time range */}
      <div
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold tracking-wide",
          isCurrent ? "text-blue-200" : "text-slate-400 dark:text-slate-500"
        )}
      >
        <Clock className="h-3 w-3 shrink-0" strokeWidth={2.5} />
        <span>{lecture.timeRange}</span>
      </div>

      {/* Subject */}
      <h3 className={cn("text-sm leading-snug", styles.subject)}>
        {lecture.subject}
      </h3>

      {/* Room */}
      <div
        className={cn(
          "flex items-center gap-1.5 text-xs",
          isCurrent ? "text-blue-200" : "text-slate-400 dark:text-slate-500"
        )}
      >
        <MapPin className="h-3 w-3 shrink-0" strokeWidth={2} />
        <span className="truncate">{lecture.room}</span>
      </div>

      {/* Lecturer */}
      <div
        className={cn(
          "flex items-center gap-1.5 text-xs",
          isCurrent ? "text-blue-200" : "text-slate-400 dark:text-slate-500"
        )}
      >
        <User className="h-3 w-3 shrink-0" strokeWidth={2} />
        <span className="truncate">{lecture.lecturer}</span>
      </div>

      {/* Status badge */}
      {/* FIX: was t(STATUS_LABEL_KEY[...]) where STATUS_LABEL_KEY had full paths
           like "schedule.status.current" called via useTranslations('').
           Now uses short key "status.current" with useTranslations("schedule"). */}
      <span
        className={cn(
          "mt-auto self-start rounded-full px-2 py-0.5",
          "text-[10px] font-semibold tracking-wider uppercase",
          styles.badge
        )}
      >
        {t(STATUS_KEY[lecture.status])}
      </span>
    </article>
  );
}
