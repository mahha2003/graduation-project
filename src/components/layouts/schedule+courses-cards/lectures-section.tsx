"use client";

/**
 * src/components/dashboard/lectures-section.tsx
 *
 * TRANSLATION KEYS USED  (from locales/{locale}/schedule.json):
 *   schedule.title                ← section heading
 *   schedule.downloadPdf          ← PDF button label
 *   schedule.downloadPdfAriaLabel ← PDF button aria-label
 *   schedule.cardListLabel        ← scroll rail aria-label
 */
import { CalendarDays, Download } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Lecture, SchedulePdfMeta } from "@/types/dashboard";

import { LectureCard } from "./lecture-card";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LecturesSectionProps {
  lectures: Lecture[];
  schedulePdf: SchedulePdfMeta;
  /** Optional readable date shown under title, e.g. "Wednesday, Oct 23" */
  dateLabel?: string;
}

// ─── Download PDF button ──────────────────────────────────────────────────────

function DownloadPdfButton({ href, filename }: SchedulePdfMeta) {
  const t = useTranslations("schedule");

  return (
    <a
      href={href}
      download={filename}
      aria-label={t("downloadPdfAriaLabel")}
      className="group inline-flex items-center gap-2 rounded-xl bg-[#003c8a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#002f6e] hover:shadow-md hover:shadow-blue-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a] focus-visible:ring-offset-2 active:scale-[0.97] dark:bg-blue-600 dark:hover:bg-blue-500"
    >
      <Download
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
        strokeWidth={2.2}
      />
      {t("downloadPdf")}
    </a>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function LecturesSection({
  lectures,
  schedulePdf,
  dateLabel,
}: LecturesSectionProps) {
  const t = useTranslations("schedule");

  return (
    <section aria-labelledby="lectures-heading" className="w-full">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h2
            id="lectures-heading"
            className="text-xl font-black tracking-[0.12em] text-slate-800 uppercase dark:text-slate-100"
          >
            {t("title")}
          </h2>

          {dateLabel && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} />
              <span>{dateLabel}</span>
            </div>
          )}
        </div>

        <DownloadPdfButton
          href={schedulePdf.href}
          filename={schedulePdf.filename}
        />
      </div>

      {/* Scroll rail */}
      <div
        role="list"
        aria-label={t("cardListLabel")}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {lectures.map((lecture) => (
          <div key={lecture.id} role="listitem" className="snap-start">
            <LectureCard lecture={lecture} />
          </div>
        ))}
      </div>
    </section>
  );
}
