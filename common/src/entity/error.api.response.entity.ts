import { ApiResponse } from './api.response.entity';

export class ErrorResponse extends ApiResponse {
  private details: any;
  private timestamp: string;

  constructor(code: string, message: string, details: any) {
    super(code, message);
    this.details = details;

    // init timestamp
    const nowTime = Date.now();
    const date = new Date(nowTime);
    this.timestamp = date.toISOString();
  }

  get getDetails() {
    return this.details;
  }

  set setDetails(details: string) {
    this.details = details;
  }

  get getTimeStamp() {
    return this.timestamp;
  }

  set setTimeStamp(timestamp: string) {
    this.timestamp = timestamp;
  }
}
