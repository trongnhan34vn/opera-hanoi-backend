import { Response } from 'express';
import { IResponseFactory } from '../ResponseFactory.interface';
export declare class ResponseFactoryImpl<T> implements IResponseFactory<T> {
    sendErrorResponse(res: Response, status: number, code: string, message: string, details: string): Response;
    sendSuccessResponse(res: Response, status: number, code: string, message: string, data: T): Response;
}
