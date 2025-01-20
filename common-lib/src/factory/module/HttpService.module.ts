import { Global, Module } from '@nestjs/common';
import { HttpServiceFactory } from '../impl/HttpServiceFactory.impl';
import { LoggerFactory } from '../../config/logger/logger.service';

@Global()
@Module({
  imports: [],
  providers: [
    HttpServiceFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('http-common'), // Cung cấp category và level mặc định
    },
  ],
  exports: [HttpServiceFactory],
})
export class HttpServiceModule {}
