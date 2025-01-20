import { Response } from 'express';
export interface IResponseFactory<T> {
    sendErrorResponse(res: Response, status: number, code: string, message: string, details: string): Response;
    sendSuccessResponse(res: Response, status: number, code: string, message: string, data: T): Response;
}
