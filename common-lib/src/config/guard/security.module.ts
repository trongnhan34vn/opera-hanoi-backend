import { Module } from '@nestjs/common';
import { GlobalAuthGuard } from './GlobalAuthGuard';

@Module({
  providers: [
    GlobalAuthGuard, // Guard toàn cục cho các route
  ],
  exports: [GlobalAuthGuard],
})
export class SecurityModule {}
