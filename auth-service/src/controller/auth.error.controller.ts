import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ErrorMessage, HttpResponseFactory, ResourceError } from 'common-lib';
import { Response } from 'express';

@Catch()
export class AuthErrorController implements ExceptionFilter {
  constructor(private readonly responseFactory: HttpResponseFactory) {}

  /**
   * catch resource error
   * @param error
   * @param host
   * @return ErrorResponse
   */
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (error instanceof ResourceError) {
      return this.responseFactory.sendErrorResponse(
        response,
        this.getStatus(error),
        error.getErrorCode,
        ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
        error.message,
      );
    }
    return this.responseFactory.sendErrorResponse(
      response,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
      ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
      error.message,
    );
  }

  /**
   * Get status by code
   * @param error
   * @private
   * @return status
   */
  private getStatus(error: ResourceError) {
    const code = error.getErrorCode;
    switch (code) {
      case ErrorMessage.BAD_REQUEST.getCode:
        return 400;
      case ErrorMessage.UNAUTHORIZED.getCode:
        return 401;
      case ErrorMessage.CONFLICT.getCode:
        return 409;
      case ErrorMessage.FORBIDDEN.getCode:
        return 403;
      case ErrorMessage.NOT_FOUND.getCode:
        return 404;
      default:
        return 500;
    }
  }
}
