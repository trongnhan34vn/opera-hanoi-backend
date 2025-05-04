import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpResponseFactory } from 'common';
import { Response } from 'express';
export declare class ExceptionController implements ExceptionFilter {
    private readonly responseFactory;
    constructor(responseFactory: HttpResponseFactory);
    catch(error: Error, host: ArgumentsHost): Response<any, Record<string, any>>;
}
