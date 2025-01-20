import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorMessage, ResourceError, HttpResponseFactory } from 'common-lib';
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
  catch(error: ResourceError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return this.responseFactory.sendErrorResponse(
      response,
      this.getStatus(error),
      error.getErrorCode,
      error.message,
      error.stack,
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
