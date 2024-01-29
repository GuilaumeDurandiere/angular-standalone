export interface PaginationData {
  pageIndex: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'desc' | 'asc'
}