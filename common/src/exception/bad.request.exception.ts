import { HttpStatus } from '@nestjs/common';
import { ResourceException } from './resource.exception';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';

export class BadRequestException extends ResourceException {
  constructor(message: string, details?: any) {
    super(HttpStatus.BAD_REQUEST, HttpErrorCode.BAD_REQUEST, message, details);
  }
}
