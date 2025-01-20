export class ResourceError extends Error {
  private errorCode: string;
  constructor(errorCode: string, message: string) {
    super(message);
    this.errorCode = errorCode;
  }

  toJson() {
    return {
      errorCode: this.errorCode,
      message: this.message,
    };
  }

  get getErrorCode() {
    return this.errorCode;
  }
}
