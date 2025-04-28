import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from 'src/entity/error.api.response.entity';
import { SuccessResponse } from 'src/entity/success.response.entity';
import { HttpErrorCode } from 'src/enum/http.error.code.enum';
import { HttpSuccessCode } from 'src/enum/http.success.code.enum';

export class HttpResponseFactory {
  sendNotFoundErrorResponse(res: Response, message: string, details?: any) {
    const response: ErrorResponse = new ErrorResponse(HttpErrorCode.NOT_FOUND, message, details);
    return res.status(HttpStatus.NOT_FOUND).json(response);
  }

  sendInternalServerErrorResponse(res: Response, message: string, details?: any) {
    const response: ErrorResponse = new ErrorResponse(HttpErrorCode.INTERNAL_SERVER_ERROR, message, details);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
  }

  sendServiceUnavailableErrorResponse(res: Response, message: string, details?: any) {
    const response: ErrorResponse = new ErrorResponse(HttpErrorCode.SERVICE_UNAVAILABLE, message, details);
    return res.status(HttpStatus.SERVICE_UNAVAILABLE).json(response);
  }

  sendBadRequestErrorResponse(res: Response, message: string, details?: any) {
    const response: ErrorResponse = new ErrorResponse(HttpErrorCode.BAD_REQUEST, message, details);
    return res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  sendConflictErrorResponse(res: Response, message: string, details?: any) {
    const response: ErrorResponse = new ErrorResponse(HttpErrorCode.CONFLICT, message, details);
    return res.status(HttpStatus.CONFLICT).json(response);
  }

  sendUnauthorizedErrorResponse(res: Response, message: string, details?: any) {
    const response: ErrorResponse = new ErrorResponse(HttpErrorCode.UNAUTHORIZED, message, details);
    return res.status(HttpStatus.UNAUTHORIZED).json(response);
  }

  sendFobbidenErrorResponse(res: Response, message: string, details?: any) {
    const response: ErrorResponse = new ErrorResponse(HttpErrorCode.FORBIDDEN, message, details);
    return res.status(HttpStatus.FORBIDDEN).json(response);
  }

  sendOKResponse<T>(res: Response, message: string, data: T) {
    const response = new SuccessResponse<T>(HttpSuccessCode.OK, message, data);
    return res.status(HttpStatus.OK).json(response);
  }

  sendCreatedResponse<T>(res: Response, message: string, data: T) {
    const response = new SuccessResponse<T>(
      HttpSuccessCode.CREATED,
      message,
      data,
    );
    return res.status(HttpStatus.CREATED).json(response);
  }
}
