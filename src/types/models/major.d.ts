interface Major {
  id: number;
  name: string;
  year_id: number;
  year: Year;
  groups?: Group[];
}

interface CreateMajorPayload {
  name: string;
  year_id: number;
}

interface UpdateMajorPayload {
  name: string;
  year_id: number;
}
