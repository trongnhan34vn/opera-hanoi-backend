import { Response } from 'express';
import { IResponseFactory } from '../interface/ResponseFactory.interface';
import { ErrorResponse } from '../response/ErrorResponse.entity';
import { SuccessResponse } from '../response/SuccessResponse.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpResponseFactory implements IResponseFactory {
  /**
   * send error response api
   * @param res
   * @param status
   * @param code
   * @param message
   * @param details
   * @return res
   */
  sendErrorResponse(
    res: Response,
    status: number,
    code: string,
    message: string,
    details: string,
  ): Response {
    const response: ErrorResponse = new ErrorResponse(code, message, details);
    return res.status(status).json(response);
  }

  /**
   * send success response api
   * @param res
   * @param status
   * @param code
   * @param message
   * @param data
   * @return res
   */
  sendSuccessResponse<T>(
    res: Response,
    status: number,
    code: string,
    message: string,
    data: T,
  ): Response {
    const response: SuccessResponse<T> = new SuccessResponse(
      code,
      message,
      data,
    );
    return res.status(status).json(response);
  }
}
