type WeekDay =  "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY";
type LectureType = "THEORITICAL" | "PRACTICAL";

interface ScheduleLecture {
  id: number;
  day: WeekDay;
  time_box_order: number;
  course_type: LectureType;
  course_id: number;
  course: Course;
  location_id: number;
  location: UniversityLocation;
  instructor_id: number;
  instructor: User;
  group_id?: number;
  group?: Group;
  created_at?: string;
  updated_at?: string;
}

type LecturesSchedule = ScheduleLecture[];

interface CreateScheduleLecturePayload {
  day: WeekDay;
  time_box_order: number;
  course_type: LectureType;
  course_id: number;
  location_id: number;
  instructor_id: number;
  group_id?: number;
}
