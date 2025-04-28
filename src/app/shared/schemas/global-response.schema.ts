export interface GlobalResponse<T = any> {
  message: string;
  data: T;
  status: any;
  code: number;
}