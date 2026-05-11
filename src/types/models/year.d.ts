interface Year {
  id: number;
  name: string;
  sections?: Section[];
  majors?: Major[];
}

interface CreateYearPayload {
  name: string;
}

interface UpdateYearPayload {
  name: string;
}
