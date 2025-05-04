import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpResponseFactory, ResourceException } from 'common';
import { Response } from 'express';

@Catch()
export class ExceptionController implements ExceptionFilter {
  constructor(private readonly responseFactory: HttpResponseFactory) {}

  /**
   * catch resource exception
   * @param error
   * @param host
   * @return ErrorResponse
   */
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const resourceError = error as ResourceException;
    if (error instanceof ResourceException || error instanceof HttpException) {
      const test = error as HttpException;
      
      const status = resourceError.getStatus();
      switch (status) {
        case 400:
          return this.responseFactory.sendBadRequestErrorResponse(
            response,
            resourceError.message,
            resourceError.details,
          );
        case 401:
          return this.responseFactory.sendUnauthorizedErrorResponse(
            response,
            resourceError.message,
            resourceError.details,
          );
        case 409:
          return this.responseFactory.sendConflictErrorResponse(
            response,
            resourceError.message,
            resourceError.details,
          );
        case 403:
          return this.responseFactory.sendFobbidenErrorResponse(
            response,
            resourceError.message,
            resourceError.details,
          );
        case 404:
          return this.responseFactory.sendNotFoundErrorResponse(
            response,
            resourceError.message,
            resourceError.details,
          );
        default:
          return this.responseFactory.sendInternalServerErrorResponse(
            response,
            resourceError.message,
            resourceError.details,
          );
      }
    } else {
      return this.responseFactory.sendInternalServerErrorResponse(
        response,
        error.name,
        error.message,
      );
    }
  }
}
