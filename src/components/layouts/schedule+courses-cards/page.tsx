/**
 * src/app/[locale]/website/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * TrackUni student website home page.
 *
 * Renders:
 *   1. Today's Lectures section
 *   2. Courses section
 *
 * DATA LAYER:
 *   Currently uses static mock data from /src/data/mock-dashboard.ts.
 *   To switch to real data:
 *     • Create async server actions or fetch helpers that return the same
 *       Lecture[] / Course[] shapes defined in /src/types/dashboard.ts.
 *     • Replace the mock imports below with your real data fetchers.
 *     • The components themselves require zero changes.
 *
 * This is a Server Component by default (no "use client").
 * Add "use client" only if you need client-side interactivity at this level.
 */

import { LecturesSection, CoursesSection } from "@/components/dashboard";
import {
  todayLectures,
  enrolledCourses,
  schedulePdf,
} from "@/data/mock-dashboard";

/** Format today's date as a readable label, e.g. "Wednesday, Oct 23" */
function getTodayLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month:   "short",
    day:     "numeric",
  });
}

export default function StudentHomePage() {
  return (
    <div className="
      min-h-screen
      bg-[#c0d5f2]/30 dark:bg-slate-950
    ">
      <div className="
        mx-auto max-w-screen-xl
        px-5 sm:px-7 lg:px-10
        py-8
        flex flex-col gap-10
      ">

        {/* ── Section 1: Today's Lectures ── */}
        <LecturesSection
          lectures={todayLectures}
          schedulePdf={schedulePdf}
          dateLabel={getTodayLabel()}
        />

        {/* ── Section 2: Courses ── */}
        <CoursesSection
          courses={enrolledCourses}
          allCoursesHref="/website/courses"
        />

      </div>
    </div>
  );
}
