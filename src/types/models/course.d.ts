type CourseType = "THEORITICAL_ONLY" | "THEORITICAL_AND_PRACTICAL";
type ExamType = "MSQ" | "WRITTEN";

interface Course {
  id: number;
  name: string;
  course_type: CourseType;
  exam_type: ExamType;
  theoretical_grade: number;
  practical_grade: number;
  major_id?: number;
  major?: Major;
  section_id?: number;
  section?: Section;
  doctors: User[];
  teachers: User[];
  created_at?: string;
  updated_at?: string;
}

interface CreateCoursePayload {
  name: string;
  course_type: CourseType;
  exam_type: ExamType;
  theoretical_grade: number;
  practical_grade: number;
  teachers_ids: number[];
  doctors_ids: number[];
}

interface UpdateCoursePayload {
  name?: string;
  course_type?: CourseType;
  exam_type?: ExamType;
  theoretical_grade?: number;
  practical_grade?: number;
  teachers_ids?: number[];
  doctors_ids?: number[];
}
