import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InternalServerException, LoggerFactory } from 'common';
import * as moment from 'moment-timezone';
import {
  AWS_ACCESS_KEY_ID,
  AWS_CLOUDFRONT_DOMAIN,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from 'src/constants/aws.constant';
import { IS3Service } from '../s3.service.interface';

@Injectable()
export class S3Service implements IS3Service {
  private readonly s3Client: S3Client;
  constructor(private readonly logger: LoggerFactory) {
    this.s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadMultipleFilesToS3(
    files: Express.Multer.File[],
  ): Promise<string[]> {
    try {
      this.logger.log('Start upload file to S3');
      const urls: string[] = [];
      for (const file of files) {
        const url = await this.uploadFileToS3(file);
        urls.push(url);
      }
      this.logger.log('Upload files to S3 success')
      return urls;
    } catch (error) {
      throw error;
    } finally {
      this.logger.log('End upload file to S3');
    }
  }

  async uploadFileToS3(file: Express.Multer.File): Promise<string> {
    try {
      let isUploadFileSuccess = false;
      const fileName = file.originalname;
      const timestamp = moment().format('YYYYMMDD');
      const key = `images/${timestamp}/${timestamp}_${fileName}`;

      const uploadParams = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);

      await this.s3Client.send(command);

      isUploadFileSuccess = true;

      if (!isUploadFileSuccess)
        throw new InternalServerException(`Upload File ${fileName} error`);

      const url = `https://${AWS_CLOUDFRONT_DOMAIN}/${key}`;
      return url;
    } catch (error) {
      this.logger.error(
        `Error while upload file [${file.originalname}] to S3: ${error.message}`,
      );
      throw error;
    }
  }
}
