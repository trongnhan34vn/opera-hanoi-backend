import { LoggerFactory } from 'common';
import { IS3Service } from '../s3.service.interface';
export declare class S3Service implements IS3Service {
    private readonly logger;
    private readonly s3Client;
    constructor(logger: LoggerFactory);
    uploadMultipleFilesToS3(files: Express.Multer.File[]): Promise<string[]>;
    uploadFileToS3(file: Express.Multer.File): Promise<string>;
}
