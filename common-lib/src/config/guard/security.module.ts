import { Module } from '@nestjs/common';
import { GlobalAuthGuard } from './GlobalAuthGuard';
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { SkipAuthGuard } from './SkipAuthGuard';
import { Reflector } from '@nestjs/core';

@Module({
  providers: [
    GlobalAuthGuard, // Guard toàn cục cho các route
    AuthGuard, // Guard cho các route cần xác thực
    SkipAuthGuard, // Guard để bỏ qua xác thực cho một số route
    RoleGuard, // Guard để kiểm tra quyền của người dùng
    ResourceGuard, // Guard để kiểm tra quyền truy cập tài nguyên
    Reflector
  ],
  exports: [
    GlobalAuthGuard,
    AuthGuard,
    SkipAuthGuard,
    RoleGuard,
    ResourceGuard,
    Reflector
  ],
})
export class SecurityModule {}
