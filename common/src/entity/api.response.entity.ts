export class ApiResponse {
  private message: string;
  private code: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
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
