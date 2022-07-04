export interface PaginatedDataType<T> {
  data: T[];
  limit?: number;
  page: number;
  totalCount?: number;
}

export type errorType = {
  message: string;
  statusCode: number;
};
