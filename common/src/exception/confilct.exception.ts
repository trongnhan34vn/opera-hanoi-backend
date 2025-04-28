import { HttpStatus } from '@nestjs/common';
import { ResourceException } from './resource.exception';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';

export class ConflictException extends ResourceException {
  constructor(message: string, details?: any) {
    super(HttpStatus.CONFLICT, HttpErrorCode.CONFLICT, message, details);
  }
}
