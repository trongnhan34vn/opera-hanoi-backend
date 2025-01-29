import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
} from 'common-lib';
import { KeycloakModule } from './keycloak.module';
import { AccountModule } from './account.module';

@Module({
  imports: [HttpServiceModule, KeycloakModule, AccountModule],
  providers: [
    AuthService,
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('auth-service'), // Cung cấp category và level mặc định
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
