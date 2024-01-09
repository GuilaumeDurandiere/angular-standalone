export interface PaginationDto<T> {
  results: T[];

  totalPages: number;
  pageIndex: number;
  pageSize: number;
}