import { Response } from 'express';

export interface IResponseFactory {
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
  ): Response;

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
  ): Response;
}
