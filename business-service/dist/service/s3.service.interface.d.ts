export interface IS3Service {
    uploadFileToS3(file: Express.Multer.File): Promise<string>;
    uploadMultipleFilesToS3(files: Express.Multer.File[]): Promise<string[]>;
}
