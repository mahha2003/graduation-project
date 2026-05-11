/**
 * src/types/dashboard.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared TypeScript interfaces for the TrackUni student dashboard.
 *
 * All data consumed by UI components is typed here.
 * Swap the mock data in /src/data/mock-dashboard.ts for real API responses
 * without touching any component — the interfaces act as the contract.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Lectures / Schedule
// ─────────────────────────────────────────────────────────────────────────────

/** Status of a lecture slot relative to the current time */
export type LectureStatus = "upcoming" | "current" | "completed" | "cancelled";

export interface Lecture {
  /** Unique identifier — use a UUID or DB primary key in production */
  id: string;
  /** Display name of the subject, e.g. "Advanced Algorithms" */
  subject: string;
  /** Instructor full name */
  lecturer: string;
  /** ISO-8601 start time string, e.g. "2024-10-23T14:00:00" */
  startTime: string;
  /** ISO-8601 end time string */
  endTime: string;
  /** Human-readable time range for display, e.g. "14:00 – 15:30" */
  timeRange: string;
  /** Room or venue label, e.g. "Lab 7, Engineering Wing" */
  room: string;
  /** Computed status — in production, derive from startTime/endTime vs. Date.now() */
  status: LectureStatus;
  /** Optional: color accent class for the card border/indicator */
  colorKey?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Courses
// ─────────────────────────────────────────────────────────────────────────────

export interface Course {
  /** Unique identifier */
  id: string;
  /** Short course code badge, e.g. "CS302" */
  code: string;
  /** Full course title */
  title: string;
  /** Instructor full name */
  professor: string;
  /** Relative or absolute URL to cover image */
  imageUrl: string;
  /** Alt text for the image (accessibility) */
  imageAlt: string;
  /** Completion percentage 0-100 */
  progress: number;
  /** Route to navigate to when "View Lectures" is clicked */
  lecturesHref: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Download / PDF helper
// ─────────────────────────────────────────────────────────────────────────────

export interface SchedulePdfMeta {
  /** URL of the PDF to download */
  href: string;
  /** Suggested filename the browser will use */
  filename: string;
}

