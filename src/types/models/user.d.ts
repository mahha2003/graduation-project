type UserRole = "DOCTOR" | "TEACHER" | "ADMIN" | "STUDENT";
type Permission = {
  roles: UserRole[];
  code: string;
};

interface User {
  id: number;
  email: string;
  full_name?: string;
  username: string;
  phone_number?: string;
  password?: string;
  is_active?: boolean;
  role: UserRole;
  permissions: Permission[];
  created_at?: string;
  updated_at?: string;
}

type CreateUserPayload = {
  email: string;
  full_name?: string;
  username: string;
  phone_number?: string;
  password: string;
  is_active: boolean;
  role: UserRole;
}

type UpdateUserPayload = {
  email?: string;
  full_name?: string;
  username?: string;
  phone_number?: string;
  password?: string;
  role?: UserRole;
  is_active?: boolean;
}
