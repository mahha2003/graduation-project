/**
 * src/data/mock-dashboard.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Static mock data for the TrackUni student dashboard.
 *
 * HOW TO MIGRATE TO A REAL API:
 *   1. Create a server action or fetch function that returns the same shape
 *      as the typed arrays below.
 *   2. Pass the data as props to <LecturesSection /> and <CoursesSection />.
 *   3. Delete or archive this file.
 *
 * Data shapes are defined in: src/types/dashboard.ts
 */
import type { Course, SchedulePdfMeta } from "@/types/dashboard";

// ─────────────────────────────────────────────────────────────────────────────
// Today's Lectures
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Courses
// ─────────────────────────────────────────────────────────────────────────────

export const enrolledCourses: Course[] = [
  {
    id: "course-1",
    code: "CS302",
    title: "Web Development",
    professor: "Prof. Michael Chen",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    imageAlt: "Code editor on a monitor",
    progress: 65,
    lecturesHref: "/website/courses/cs302/lectures",
    term: "first",
  },
  {
    id: "course-2",
    code: "MA201",
    title: "Linear Algebra",
    professor: "Dr. Emily Watson",
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    imageAlt: "Mathematical equations on a blackboard",
    progress: 42,
    lecturesHref: "/website/courses/ma201/lectures",
    term: "first",
  },
  {
    id: "course-3",
    code: "CS401",
    title: "Cyber Security",
    professor: "Prof. Robert Lane",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    imageAlt: "Server racks with blue lighting",
    progress: 80,
    lecturesHref: "/website/courses/cs401/lectures",
    term: "second",
  },
  {
    id: "course-4",
    code: "CS401",
    title: "Cyber Security",
    professor: "Prof. Robert Lane",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    imageAlt: "Server racks with blue lighting",
    progress: 80,
    lecturesHref: "/website/courses/cs401/lectures",
    term: "first",
  },
  {
    id: "course-5",
    code: "CS401",
    title: "Cyber Security",
    professor: "Prof. Robert Lane",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    imageAlt: "Server racks with blue lighting",
    progress: 80,
    lecturesHref: "/website/courses/cs401/lectures",
    term: "second",
  },
  {
    id: "course-6",
    code: "CS401",
    title: "Cyber Security",
    professor: "Prof. Robert Lane",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    imageAlt: "Server racks with blue lighting",
    progress: 80,
    lecturesHref: "/website/courses/cs401/lectures",
    term: "first",
  },
  {
    id: "course-7",
    code: "CS401",
    title: "Cyber Security",
    professor: "Prof. Robert Lane",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    imageAlt: "Server racks with blue lighting",
    progress: 80,
    lecturesHref: "/website/courses/cs401/lectures",
    term: "first",
  },
  {
    id: "course-8",
    code: "CS401",
    title: "Cyber Security",
    professor: "Prof. Robert Lane",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    imageAlt: "Server racks with blue lighting",
    progress: 80,
    lecturesHref: "/website/courses/cs401/lectures",
    term: "second",
  },
];
