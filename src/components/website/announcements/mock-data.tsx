import { Announcement } from "@/app/[locale]/website/announcements/types";

const announcementsData: Announcement[] = [
  {
    id: "1",
    title: "regularTitle",
    description: "regularDescription",
    category: "regular",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "importantTitle",
    description: "importantDescription",
    category: "important",
    createdAt: "Yesterday",
  },
  {
    id: "3",
    title: "emergencyTitle",
    description: "emergencyDescription",
    category: "emergency",
    createdAt: "Just now",
  },
] as const;
