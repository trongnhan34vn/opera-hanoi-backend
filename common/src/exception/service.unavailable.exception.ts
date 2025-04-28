import { HttpStatus } from '@nestjs/common';
import { ResourceException } from './resource.exception';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';

export class ServiceUnavailableException extends ResourceException {
  constructor(message: string, details?: any) {
    super(
      HttpStatus.SERVICE_UNAVAILABLE,
      HttpErrorCode.SERVICE_UNAVAILABLE,
      message,
      details,
    );
  }
}
