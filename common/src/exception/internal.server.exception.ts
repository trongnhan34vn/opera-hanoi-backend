import { HttpStatus } from '@nestjs/common';
import { ResourceException } from './resource.exception';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';

export class InternalServerException extends ResourceException {
  constructor(message: string, details?: any) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      message,
      details,
    );
    Object.setPrototypeOf(this, new.target.prototype); 
  }
}
