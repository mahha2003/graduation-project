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
import type { Course, Lecture, SchedulePdfMeta } from "@/types/dashboard";

// ─────────────────────────────────────────────────────────────────────────────
// Today's Lectures
// ─────────────────────────────────────────────────────────────────────────────

export const todayLectures: Lecture[] = [
  {
    id: "lec-1",
    subject: "Database Systems",
    lecturer: "Prof. Ahmad Al-Masri",
    startTime: "2024-10-23T09:00:00",
    endTime: "2024-10-23T10:30:00",
    timeRange: "09:00 – 10:30",
    room: "Room 402",
    status: "completed",
    colorKey: "slate",
  },
  {
    id: "lec-2",
    subject: "Linear Algebra",
    lecturer: "Dr. Emily Watson",
    startTime: "2024-10-23T11:00:00",
    endTime: "2024-10-23T12:30:00",
    timeRange: "11:00 – 12:30",
    room: "Main Hall",
    status: "completed",
    colorKey: "slate",
  },
  {
    id: "lec-3",
    subject: "Advanced Algorithms",
    lecturer: "Dr. Sarah Jenkins",
    startTime: "2024-10-23T14:00:00",
    endTime: "2024-10-23T15:30:00",
    timeRange: "14:00 – 15:30",
    room: "Lab 7",
    status: "current", // ← visually highlighted
    colorKey: "blue",
  },
  {
    id: "lec-4",
    subject: "Cyber Security",
    lecturer: "Prof. Robert Lane",
    startTime: "2024-10-23T16:00:00",
    endTime: "2024-10-23T17:30:00",
    timeRange: "16:00 – 17:30",
    room: "Virtual Room B",
    status: "upcoming",
    colorKey: "indigo",
  },
  {
    id: "lec-5",
    subject: "Cyber Security",
    lecturer: "Prof. Robert Lane",
    startTime: "2024-10-23T16:00:00",
    endTime: "2024-10-23T17:30:00",
    timeRange: "16:00 – 17:30",
    room: "Virtual Room B",
    status: "upcoming",
    colorKey: "indigo",
  },
];

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
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Schedule PDF meta
// ─────────────────────────────────────────────────────────────────────────────

export const schedulePdf: SchedulePdfMeta = {
  href: "/api/schedule/download?week=current", // replace with real endpoint
  filename: "TrackUni-Weekly-Schedule.pdf",
};
