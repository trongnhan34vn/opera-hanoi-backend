export class Message {
  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
  private code;
  private message;

  get getCode() {
    return this.code;
  }

  get getMessage() {
    return this.message;
  }
}
