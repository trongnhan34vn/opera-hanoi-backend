import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpResponseFactory, ResourceException } from 'common';
import { Response } from 'express';
export declare class AuthErrorController implements ExceptionFilter {
    private readonly responseFactory;
    constructor(responseFactory: HttpResponseFactory);
    catch(error: ResourceException, host: ArgumentsHost): Response<any, Record<string, any>>;
}
