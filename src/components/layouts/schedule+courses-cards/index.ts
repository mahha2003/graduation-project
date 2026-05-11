/**
 * src/components/dashboard/index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Barrel export for all student dashboard section components.
 *
 * Usage:
 *   import { LecturesSection, CoursesSection } from "@/components/dashboard";
 */

export { LectureCard }      from "./lecture-card";
export type { LectureCardProps }  from "./lecture-card";

export { LecturesSection }  from "./lectures-section";
export type { LecturesSectionProps } from "./lectures-section";

export { CourseCard }       from "./course-card";
export type { CourseCardProps }  from "./course-card";

export { CoursesSection }   from "./courses-section";
export type { CoursesSectionProps } from "./courses-section";
