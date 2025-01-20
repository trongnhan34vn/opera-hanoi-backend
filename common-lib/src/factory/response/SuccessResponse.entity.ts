import { ApiResponse } from './ApiResponse.entity';

export class SuccessResponse<T> extends ApiResponse {
  private data: T;
  constructor(code: string, message: string, data: T) {
    super(code, message);
    this.data = data;
  }

  get getData() {
    return this.data;
  }

  set setData(data: T) {
    this.data = data;
  }
}
