import { Response } from 'express';
import { IResponseFactory } from '../interface/ResponseFactory.interface';
export declare class HttpResponseFactory implements IResponseFactory {
    sendErrorResponse(res: Response, status: number, code: string, message: string, details: string): Response;
    sendSuccessResponse<T>(res: Response, status: number, code: string, message: string, data: T): Response;
}
