import { Global, Module } from '@nestjs/common';
import { HttpServiceFactory } from 'src/factory/impl/http.service.factory.impl';
import { LoggerFactory } from 'src/factory/impl/logger.factory.impl';

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
