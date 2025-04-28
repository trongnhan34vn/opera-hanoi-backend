import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { IS3Service } from 'src/service/s3.service.interface';
export declare class S3Controller {
    private readonly s3Service;
    private readonly httpResponseFactory;
    constructor(s3Service: IS3Service, httpResponseFactory: HttpResponseFactory);
    uploadS3Files(res: Response, files: Express.Multer.File[]): Promise<Response<any, Record<string, any>>>;
}
