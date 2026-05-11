type AnnouncementType = "REGULAR" | "IMPORTANT" | "EMERGENCY";

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: AnnouncementType;
  year_id?: number;
  section_id?: number;
  major_id?: number;
  group_id?: number;
  course_id?: number;
  student_id?: number;
  attachments: string[];
  year?: Year;
  section?: Pick<Section, "id" | "name">;
  major?: Pick<Major, "id" | "name">;
  group?: Pick<Group, "id" | "name">;
  course?: Pick<Course, "id" | "name">;
  student?: Pick<Student, "id" | "full_name">;
  created_at?: string;
  updated_at?: string;
}

interface CreateAnnouncementPayload {
  title: string;
  content: string;
  type: "REGULAR" | "IMPORTANT" | "EMERGENCY";
  year_id?: number;
  section_id?: number;
  major_id?: number;
  group_id?: number;
  course_id?: number;
  student_id?: number;
}

interface UpdateAnnouncementPayload {
  title?: string;
  content?: string;
  type?: "REGULAR" | "IMPORTANT" | "EMERGENCY";
  year_id?: number;
  section_id?: number;
  major_id?: number;
  group_id?: number;
  course_id?: number;
  student_id?: number;
}
