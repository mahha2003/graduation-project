import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import type { Course } from "@/types/dashboard";

import { CourseCard } from "./course-card";
import { enrolledCourses } from "./mock-dashboard";

// ─── Types ────────────────────────────────────────────────────────────────────

const courses = enrolledCourses.slice(0, 3); // show only first 3 courses for preview

export function CoursesSection() {
  const t = useTranslations("courses");

  return (
    <section aria-labelledby="courses-heading" className="w-full">
      {/* ── Section header ── */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="courses-heading"
          className="text-xl font-black tracking-[0.12em] text-slate-800 uppercase dark:text-slate-100"
        >
          {t("title")}
        </h2>

        {/* "See All Courses" link */}
        <Link
          href="/website/courses"
          aria-label={t("seeAllAriaLabel")}
          className="group inline-flex items-center gap-1.5 rounded text-sm font-semibold text-[#003c8a] transition-colors duration-150 hover:text-[#002f6e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a] dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t("seeAll")}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
        </Link>
      </div>

      {/* ── Courses grid ── */}
      {courses.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-8 py-16 text-center dark:border-slate-700">
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
            {t("empty")}
          </p>
        </div>
      ) : (
        <ul
          role="list"
          aria-label={t("gridLabel")}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course) => (
            <li key={course.id} role="listitem">
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
