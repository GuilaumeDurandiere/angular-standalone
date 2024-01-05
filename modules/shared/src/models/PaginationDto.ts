export interface PaginationDto<T> {
  results: T[];

  total: number;
  pageIndex: number;
  pageSize: number;
}