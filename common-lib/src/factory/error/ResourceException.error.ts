export class ResourceException extends Error {
  private errorCode: string;
  private details?: string;
  constructor(errorCode: string, message: string, details?: string) {
    super(message);
    this.errorCode = errorCode;
    this.details = details;
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

  get getDetails() {
    return this.details;
  }
}
