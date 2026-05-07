interface UniversityLocation {
  id: number;
  name: string;
  reaching_description?: string;
  created_at?: string;
  updated_at?: string;
}

interface CreateLocationPayload {
  name: string;
  reaching_description?: string;
}

interface UpdateLocationPayload {
  name?: string;
  reaching_description?: string;
}
