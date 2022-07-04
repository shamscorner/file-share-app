export interface GlobalResponseType<T> {
  successful: boolean;
  data: T;
}

export interface PaginatedDataType<T> {
  data: T[];
  limit?: number;
  page: number;
  totalCount?: number;
}

export type errorType = {
  message: string;
  statusCode: number;
  successful: boolean;
};
