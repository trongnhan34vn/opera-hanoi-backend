import { ApiResponse } from "./api.response.entity";

export class SuccessResponse<T> extends ApiResponse {
    public data: T;
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