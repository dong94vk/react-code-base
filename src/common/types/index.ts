export interface Pagination {
  currentPage: number;
  pageCount: number;
  totalCount: number;
  pageSize: number;
}

export interface ApiEntity {
  loadings: number;
  error: any;
}
