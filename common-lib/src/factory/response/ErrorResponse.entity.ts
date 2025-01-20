import { ApiResponse } from './ApiResponse.entity';

export class ErrorResponse extends ApiResponse {
  constructor(code: string, message: string, details: string) {
    super(code, message);
    this.details = details;
  }
  private details: string;

  get getDetails() {
    return this.details;
  }

  set setDetails(details: string) {
    this.details = details;
  }
}
