import { Module } from '@nestjs/common';
import {
  AwsS3ClientFactory,
  HttpResponseFactory,
  HttpServiceModule,
  IS3ServiceToken,
  LoggerFactory,
  S3Service,
} from 'common';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import * as path from 'path';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { AccountModule } from './account.module';
import { ConcertModule } from './concert.module';
import { KeycloakModule } from './keycloak.module';

const envFilePath = '../../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

console.log(process.env.AWS_REGION);


@Module({
  imports: [HttpServiceModule, KeycloakModule, AccountModule, ConcertModule],
  providers: [
    AuthService,
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('auth-service'), // Cung cấp category và level mặc định
    },
    {
      provide: IS3ServiceToken,
      useClass: S3Service,
    },
    {
      provide: AwsS3ClientFactory,
      useFactory: () => {
        return AwsS3ClientFactory({
          region: process.env.AWS_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          s3BucketName: process.env.AWS_S3_BUCKET_NAME,
          cloudFrontDomain: process.env.AWS_CLOUDFRONT_DOMAIN
        });
      }
    }
  ],
  controllers: [AuthController],
  exports: [AuthService, IS3ServiceToken],
})
export class AuthModule {}
