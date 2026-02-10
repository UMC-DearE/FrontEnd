export interface CommonResponse<T = unknown> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}
