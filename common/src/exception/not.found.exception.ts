import { HttpStatus } from '@nestjs/common';
import { ResourceException } from './resource.exception';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';

export class NotFoundException extends ResourceException {
  constructor(message: string, details?: any) {
    super(HttpStatus.NOT_FOUND, HttpErrorCode.NOT_FOUND, message, details);
    Object.setPrototypeOf(this, new.target.prototype); 
  }
}
