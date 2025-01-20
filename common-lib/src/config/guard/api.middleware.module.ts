import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyMiddleware } from './apikey.middleware';

@Module({
  imports: [ConfigModule], // Đảm bảo ConfigModule có sẵn trong module này
  providers: [ApiKeyMiddleware],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware) // Áp dụng middleware ApiKeyMiddleware
      .forRoutes('*'); // Áp dụng middleware cho tất cả các route
  }
}
