import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  ErrorMessage,
  HttpResponseFactory,
  ResourceException,
} from 'common-lib';
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

    // in case resource error
    if (error instanceof ResourceException) {
      const resourceError: ResourceException = error;
      const status = this.getStatus(error);
      return this.responseFactory.sendErrorResponse(
        response,
        status,
        resourceError.getErrorCode,
        resourceError.message,
        resourceError.details,
      );
    }
    // in case not resource error
    return this.responseFactory.sendErrorResponse(
      response,
      error['status'] ??
        this.getStatus(ErrorMessage.INTERNAL_SERVER_ERROR.getCode),
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
      case 503:
        return ErrorMessage.SERVICE_UNAVAILABLE;
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
      case ErrorMessage.SERVICE_UNAVAILABLE.getCode:
        return HttpStatus.SERVICE_UNAVAILABLE;
      case ErrorMessage.BAD_REQUEST.getCode:
        return HttpStatus.BAD_REQUEST;
      case ErrorMessage.UNAUTHORIZED.getCode:
        return HttpStatus.UNAUTHORIZED;
      case ErrorMessage.CONFLICT.getCode:
        return HttpStatus.CONFLICT;
      case ErrorMessage.FORBIDDEN.getCode:
        return HttpStatus.FORBIDDEN;
      case ErrorMessage.NOT_FOUND.getCode:
        return HttpStatus.NOT_FOUND;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
