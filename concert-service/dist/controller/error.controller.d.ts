import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpResponseFactory } from 'common-lib';
import { Response } from 'express';
export declare class ErrorController implements ExceptionFilter {
    private readonly responseFactory;
    constructor(responseFactory: HttpResponseFactory);
    catch(error: Error, host: ArgumentsHost): Response<any, Record<string, any>>;
    private getErrorMessage;
    private getStatus;
}
