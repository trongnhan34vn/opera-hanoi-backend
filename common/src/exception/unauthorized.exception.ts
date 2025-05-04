import { HttpStatus } from '@nestjs/common';
import { ResourceException } from './resource.exception';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';

export class UnauthorizedException extends ResourceException {
  constructor(message: string, details?: any) {
    super(HttpStatus.UNAUTHORIZED, HttpErrorCode.UNAUTHORIZED, message, details);
    Object.setPrototypeOf(this, new.target.prototype); 
  }
}
