import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { IS3Service } from '../s3.service.interface';
import { LoggerFactory } from 'src/factory/impl/logger.factory.impl';
import { InternalServerException } from 'src/exception';
import { AwsS3Client } from 'src/entity/aws.s3.client.entity';
import { AwsS3ClientFactory } from 'src/factory/impl/aws.s3.client.factory.impl';

@Injectable()
export class S3Service implements IS3Service {
  private readonly s3Client: S3Client;
  constructor(
    private readonly logger: LoggerFactory,
    @Inject(AwsS3ClientFactory) private readonly awsS3Client: AwsS3Client,
  ) {
    const { region, accessKeyId, secretAccessKey } = awsS3Client;
    console.log('AWS Client --------> ', awsS3Client);
    
    this.s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async uploadMultipleFilesToS3(
    files: Express.Multer.File[],
    folderName: string,
  ): Promise<string[]> {
    try {
      this.logger.log('Start upload file to S3');
      const urls: string[] = [];
      const dateTime = moment().format('YYYYMMDD');
      const timestamp = moment().format('YYYYMMDDHHmmss');
      for (const file of files) {
        const s3FilePath = `${folderName}/${dateTime}/${timestamp}_${file.originalname}`;
        const url = await this.uploadFileToS3(file, s3FilePath);
        urls.push(url);
      }
      this.logger.log('Upload files to S3 success');
      return urls;
    } catch (error) {
      throw error;
    } finally {
      this.logger.log('End upload file to S3');
    }
  }

  async uploadFileToS3(
    file: Express.Multer.File,
    s3FilePath: string,
  ): Promise<string> {
    try {
      const { s3BucketName, cloudFrontDomain } = this.awsS3Client;
      let isUploadFileSuccess = false;
      const fileName = file.originalname;
      // const key = `images/${timestamp}/${timestamp}_${fileName}`;
      const key = s3FilePath;

      const uploadParams = {
        Bucket: s3BucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);

      await this.s3Client.send(command);

      isUploadFileSuccess = true;

      if (!isUploadFileSuccess)
        throw new InternalServerException(`Upload File ${fileName} error`);

      const url = `https://${cloudFrontDomain}/${key}`;
      return url;
    } catch (error) {
      this.logger.error(
        `Error while upload file [${file.originalname}] to S3: ${error.message}`,
      );
      throw error;
    }
  }
}
