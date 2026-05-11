interface Section {
  id: number;
  name: string;
  year_id: number;
  year: Year;
  groups?: Group[];
}

interface CreateSectionPayload {
  name: string;
  year_id: number;
}

interface UpdateSectionPayload {
  name: string;
  year_id: number;
}
