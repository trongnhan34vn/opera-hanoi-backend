import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {
  HttpResponseFactory,
  ResourceException,
} from 'common';
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
    if (error instanceof ResourceException) {
      const resourceError = error as ResourceException;
    
      const status = resourceError.getStatus();
      
      switch (status) {
        case 400:
          return this.responseFactory.sendBadRequestErrorResponse(
            response,
            resourceError.getMessage,
            resourceError.getDetails,
          );
        case 401:
          return this.responseFactory.sendUnauthorizedErrorResponse(
            response,
            resourceError.getMessage,
            resourceError.getDetails,
          );
        case 409:
          return this.responseFactory.sendConflictErrorResponse(
            response,
            resourceError.getMessage,
            resourceError.getDetails,
          );
        case 403:
          return this.responseFactory.sendFobbidenErrorResponse(
            response,
            resourceError.getMessage,
            resourceError.getDetails,
          );
        case 404:
          return this.responseFactory.sendNotFoundErrorResponse(
            response,
            resourceError.getMessage,
            resourceError.getDetails,
          );
        default:
          return this.responseFactory.sendInternalServerErrorResponse(
            response,
            resourceError.getMessage,
            resourceError.getDetails,
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
