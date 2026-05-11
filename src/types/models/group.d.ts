interface Group {
  id: number;
  name: string;
  section_id?: number;
  section?: Section;
  major_id?: number;
  major?: Major;
}

interface CreateGroupPayload {
  name: string;
  section_id?: number;
  major_id?: number;
}

interface UpdateGroupPayload {
  name: string;
  section_id?: number;
  major_id?: number;
}
