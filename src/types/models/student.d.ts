interface Student extends User {
  student_id: string;
  mother_name: string;
}

interface CreateStudentPayload {
  full_name: string;
  username: string;
  email?: string;
  mother_name: string;
  phone_number?: string;
  student_id: string;
  password: string;
  is_active: boolean;
  role: "STUDENT";
}

interface UpdateStudentPayload {
  full_name: string;
  username: string;
  email?: string;
  mother_name: string;
  phone_number?: string;
  student_id: string;
  password?: string;
  is_active: boolean;
  role: "STUDENT";
}
