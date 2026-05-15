export type AnnouncementCategory = "regular" | "important" | "emergency";

export type Announcement = {
  id: string;
  title: string;
  description: string;
  category: AnnouncementCategory;
  createdAt: string;
};
