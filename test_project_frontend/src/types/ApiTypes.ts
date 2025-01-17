export interface ApiResponse<T> {
  message: string;
  data: T;
  total_pages?: number;
}
