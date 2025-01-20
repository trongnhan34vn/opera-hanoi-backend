import { Module } from '@nestjs/common';
// Đảm bảo đúng đường dẫn tới interceptor
import { LogAspectInterceptor } from './log.aspect.interceptor';
import { LoggerFactory } from './logger.service'; // Đảm bảo đúng đường dẫn tới decorator

@Module({
  providers: [
    LogAspectInterceptor,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('log-aspect'), // Cung cấp category và level mặc định
    },
  ], // Đảm bảo interceptor được cung cấp
  exports: [LogAspectInterceptor], // Export interceptor để có thể sử dụng ở nơi khác
})
export class LogModule {}
