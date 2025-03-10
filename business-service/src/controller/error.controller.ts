import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  ErrorMessage,
  HttpResponseFactory,
  ResourceException,
} from 'common-lib';
import { Response } from 'express';

@Catch()
export class ErrorController implements ExceptionFilter {
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

    // in case resource error
    if (error instanceof ResourceException) {
      const resourceError: ResourceException = error;
      const status = this.getStatus(error);
      return this.responseFactory.sendErrorResponse(
        response,
        status,
        resourceError.getErrorCode,
        resourceError.message,
        resourceError.getDetails,
      );
    }
    // in case not resource error
    return this.responseFactory.sendErrorResponse(
      response,
      error['status']
        ? error['status']
        : this.getStatus(ErrorMessage.INTERNAL_SERVER_ERROR.getCode),
      this.getErrorMessage(error['status']).getCode,
      this.getErrorMessage(error['status']).getMessage,
      error.message,
    );
  }

  /**
   * get ErrorMessage
   * @param status
   * @private
   */
  private getErrorMessage(status: number) {
    switch (status) {
      case 404:
        return ErrorMessage.NOT_FOUND;
      case 400:
        return ErrorMessage.BAD_REQUEST;
      case 409:
        return ErrorMessage.CONFLICT;
      case 401:
        return ErrorMessage.UNAUTHORIZED;
      case 403:
        return ErrorMessage.FORBIDDEN;
      default:
        return ErrorMessage.INTERNAL_SERVER_ERROR;
    }
  }

  /**
   * Get status by code
   * @param error
   * @private
   * @return status
   */
  private getStatus(error: ResourceException) {
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
