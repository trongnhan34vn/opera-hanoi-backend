import { Module } from '@nestjs/common';
import {
    HttpResponseFactory,
    LoggerFactory
} from 'common';

import { IS3ServiceToken } from 'src/constants/symbol';
import { S3Controller } from 'src/controller/s3.controller';
import { S3Service } from 'src/service/impl/s3.service.impl';

@Module({
  controllers: [S3Controller],
  providers: [
    {
      provide: IS3ServiceToken,
      useClass: S3Service,
    },
    HttpResponseFactory,
    LoggerFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('s3-service'), // Cung cấp Genre và level mặc định
    },
  ],
  exports: [IS3ServiceToken],
})
export class S3Module {}
