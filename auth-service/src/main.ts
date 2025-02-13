import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpResponseFactory,
  LogAspectInterceptor,
  LoggerFactory,
} from 'common-lib';
import { AuthErrorController } from './controller/auth.error.controller';
import * as dotenv from 'dotenv';
import * as path from 'node:path';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';

const envFilePath = '../../env/.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

async function bootstrap() {
  const logger = new LoggerFactory('default');
  logger.log('Starting Nest application...');

  // config log
  const app = await NestFactory.create(AppModule);
  app.useLogger(logger);
  logger.log('App successfully configured Logger');

  // config controller exception
  app.useGlobalFilters(new AuthErrorController(app.get(HttpResponseFactory)));
  logger.log('App successfully configured Filters');

  // config interceptors
  app.useGlobalInterceptors(new LogAspectInterceptor());
  logger.log('App successfully configured Interceptors');

  // config ConfigService
  logger.log(`Nest app started with port [${process.env.AUTH_SERVICE_PORT}]`);

  // config validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có field không hợp lệ
      transform: true, // Tự động chuyển đổi payload sang DTO
    }),
  );
  await app.listen(process.env.AUTH_SERVICE_PORT);
}

bootstrap();
