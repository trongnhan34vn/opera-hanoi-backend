import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceException extends HttpException {
  public errorCode: string;
  public message: string;
  public details?: any;

  constructor(
    status: HttpStatus,
    errorCode: string,
    message: string,
    details?: any,
  ) {
    super(
      {
        message,
        errorCode,
        ...(details ? { details } : {}),
      },
      status,
    );
    this.errorCode = errorCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype); 
  }

  get getMessage() {
    return this.getResponse()['message'];
  }

  get getErrorCode() {
    return this.errorCode;
  }

  get getDetails() {
    return this.details;
  }
}
