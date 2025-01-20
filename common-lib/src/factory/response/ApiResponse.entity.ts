export class ApiResponse {
  private code: string;
  private message: string;
  private timestamp: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;

    // init timestamp
    const nowTime = Date.now();
    const date = new Date(nowTime);
    this.timestamp = date.toISOString();
  }

  get getCode() {
    return this.code;
  }

  get getMessage() {
    return this.message;
  }

  set setCode(code: string) {
    this.code = code;
  }

  set setMessage(message: string) {
    this.message = message;
  }
}
