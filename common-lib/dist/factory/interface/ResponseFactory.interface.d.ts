import { Response } from 'express';
export interface IResponseFactory {
    sendErrorResponse(res: Response, status: number, code: string, message: string, details: string): Response;
    sendSuccessResponse<T>(res: Response, status: number, code: string, message: string, data: T): Response;
}
