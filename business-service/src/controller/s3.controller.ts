import {
  Controller,
  Inject,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { Roles } from 'nest-keycloak-connect';
import { IS3ServiceToken } from 'src/constants/symbol';
import { IS3Service } from 'src/service/s3.service.interface';

@Controller('/api/v1/business/s3')
export class S3Controller {
  constructor(
    @Inject(IS3ServiceToken)
    private readonly s3Service: IS3Service,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Post('/upload')
  @Roles({ roles: ['ADMIN'] })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadS3Files(
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const urls = await this.s3Service.uploadMultipleFilesToS3(files);
    return this.httpResponseFactory.sendOKResponse(
      res,
      'Upload Multiple File Success',
      urls,
    );
  }
}
