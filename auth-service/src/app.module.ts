import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpResponseFactory, LoggerFactory, LogModule, MiddlewareModule } from 'common-lib';
import { AuthController } from './controller/auth.controller';
import { AuthModule } from './module/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfig } from './config/KeycloakConfig';
import { GlobalAuthGuard } from './config/GlobalAuthGuard';
import { APP_GUARD } from '@nestjs/core';
import { SkipAuthGuard } from './config/SkipAuthGuard';

const envFilePath = '../../env/.env.dev';

@Module({
  imports: [
    // import auth module
    AuthModule,
    // import config interceptor
    LogModule,
    // import config .env.dev
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, envFilePath),
    }),
    // import security from Keycloak
    KeycloakConnectModule.register(KeycloakConfig.getKeycloakConfig()),

    // import middleware api key
    MiddlewareModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    // provide http response factory
    HttpResponseFactory,
    // provide config log
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('default'), // Cung cấp category và level mặc định
    },
    // START SECURITY PROVIDER
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
    AuthGuard,
    ResourceGuard,
    RoleGuard,
    SkipAuthGuard,
    // END SECURITY PROVIDER
  ],
})
export class AppModule {}
