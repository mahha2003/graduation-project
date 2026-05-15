import { Lecture, SchedulePdfMeta } from "@/types/dashboard";

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

export const schedulePdf: SchedulePdfMeta = {
  href: "/api/schedule/download?week=current", // replace with real endpoint
  filename: "TrackUni-Weekly-Schedule.pdf",
};
