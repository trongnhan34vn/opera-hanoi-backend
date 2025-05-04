export interface IS3Service {
  uploadFileToS3(
    file: Express.Multer.File,
    s3FilePath: string,
  ): Promise<string>;
  uploadMultipleFilesToS3(files: Express.Multer.File[], folderName: string): Promise<string[]>;
}
