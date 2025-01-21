import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
} from 'common-lib';
import { KeycloakService } from '../service/keycloak.service';

@Module({
  imports: [HttpServiceModule],
  providers: [
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('keycloak-service'), // Cung cấp category và level mặc định
    },
    KeycloakService
  ],

  exports: [KeycloakService]
})
export class KeycloakModule {}
