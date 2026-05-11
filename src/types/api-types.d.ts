type GetAllParams = {
  page?: string;
  pagesize?: string;
  filters?: any;
  sort?: any;
  search?: string;
  joinOperator: string;
}

type GetAllResponseData<T> = {
  data: T[];
  meta: {
    totalPages: number;
    total: number;
  };
};
