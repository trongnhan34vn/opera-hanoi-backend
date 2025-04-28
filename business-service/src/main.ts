import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'node:path';
import * as process from 'node:process';
import {
  HttpResponseFactory,
  LogAspectInterceptor,
  LoggerFactory,
} from 'common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionController } from './controller/exception.controller';

const envFilePath = '../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

async function bootstrap() {
  const logger = new LoggerFactory('default');

  // config log
  const app = await NestFactory.create(AppModule, {
    logger: logger,
    bufferLogs: true,
  });
  app.useLogger(logger);
  logger.log('App successfully configured Logger');

  // config controller exception
  app.useGlobalFilters(new ExceptionController(app.get(HttpResponseFactory)));
  logger.log('App successfully configured Filter Exception Controller');

  // config interceptors
  app.useGlobalInterceptors(new LogAspectInterceptor());
  logger.log('App successfully configured Interceptors');

  // config ConfigService
  logger.log(
    `Nest app started with port [${process.env.BUSINESS_SERVICE_PORT}]`,
  );

  // config validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không được định nghĩa trong DTO
      forbidNonWhitelisted: false, // Ném lỗi nếu có field không hợp lệ
      transform: true, // Tự động chuyển đổi payload sang DTO
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Concert API')
    .setDescription('The concert management API')
    .setVersion('1.0')
    .addTag('concerts') // optional
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key', // header name
        in: 'header',
      },
      'x-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.BUSINESS_SERVICE_PORT || 3000);
}

bootstrap();
