import { HttpStatus } from '@nestjs/common';
import { ResourceException } from './resource.exception';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';

export class ForbiddenException extends ResourceException {
  constructor(message: string, details?: any) {
    super(HttpStatus.FORBIDDEN, HttpErrorCode.FORBIDDEN, message, details);
    Object.setPrototypeOf(this, new.target.prototype); 
  }
}
