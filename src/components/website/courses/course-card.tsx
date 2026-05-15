"use client";

/**
 * src/components/dashboard/course-card.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable card for a single enrolled course.
 *
 * Contains:
 *   - Cover image with course code badge overlay
 *   - Course title + professor name
 *   - Progress bar (with animated fill)
 *   - "View Lectures" CTA button
 *
 * Supports dark mode, hover lift, and RTL layout via Tailwind logical properties.
 */
import Image from "next/image";
import Link from "next/link";

import { BookOpen, User } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Course } from "@/types/dashboard";

// ─── Sub-component: Progress bar ──────────────────────────────────────────────

interface ProgressBarProps {
  /** 0–100 */
  value: number;
}

function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col gap-1.5">
      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Course progress: ${clamped}%`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
      >
        {/* Fill — width driven by inline style for precise %  */}
        <div
          className="h-full rounded-full bg-[#003c8a] transition-all duration-700 ease-out dark:bg-blue-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {/* Percentage label */}
      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
        {clamped}%
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const t = useTranslations("courses");

  return (
    <article
      aria-label={`${course.title} — ${course.code}`}
      className="group flex cursor-default flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-black/30"
    >
      {/* ── Cover image ── */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
        <Image
          src={course.imageUrl}
          alt={course.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          priority={false}
        />

        {/* Dark gradient overlay — ensures badge + image text readable */}
        <div className="bg-l inear-to-t absolute inset-0 from-black/40 via-transparent to-transparent" />

        {/* Course code badge — top-right corner */}
        <span className="absolute end-3 top-3 rounded-lg bg-[#003c8a]/90 px-2.5 py-1 text-[11px] font-black tracking-wider text-white uppercase shadow-sm backdrop-blur-sm dark:bg-blue-600/90">
          {course.code}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-xl leading-snug font-bold text-slate-800 transition-colors duration-200 group-hover:text-[#003c8a] dark:text-slate-100 dark:group-hover:text-blue-400">
          {course.title}
        </h3>

        {/* Professor */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <User className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <span className="truncate">{course.professor}</span>
        </div>

        {/* Progress bar — pushed to bottom of body, above button */}
        <div className="mt-auto">
          <ProgressBar value={course.progress} />
        </div>

        {/* View Lectures button */}
        <Link
          //@ts-expect-error
          href={course.lecturesHref}
          aria-label={`${t("viewLecturesAriaLabel")} ${course.title}`}
          className="group/btn mt-1 flex items-center justify-center gap-2 rounded-xl border border-[#003c8a]/30 px-4 py-2.5 text-sm font-semibold text-[#003c8a] transition-all duration-200 hover:border-transparent hover:bg-[#003c8a] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a] active:scale-[0.97] dark:border-blue-500/30 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
        >
          <BookOpen
            className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110"
            strokeWidth={2}
          />
          {t("viewLectures")}
        </Link>
      </div>
    </article>
  );
}
