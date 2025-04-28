import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  GlobalAuthGuard,
  HttpResponseFactory,
  LoggerFactory,
  LogModule,
  MiddlewareModule,
  SkipAuthGuard,
} from 'common';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import * as path from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakConfig } from './config/keycloak.config';
import { AuthController } from './controller/auth.controller';
import { AuthModule } from './module/auth.module';
import { ConcertModule } from './module/concert.module';

const envFilePath = '../.env.local';

@Module({
  imports: [
    // import auth module
    AuthModule,
    ConcertModule,
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
    // LOGGER
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('default'), // Cung cấp category và level mặc định
    },
    // LOGGER
    // CONSUL
    // {
    //   provide: ConsulService,
    //   useFactory: () =>
    //     new ConsulService(new LoggerFactory('default'), {
    //       host: 'localhost',
    //       port: 8500,
    //       service: {
    //         id: 'consul-auth-service',
    //         name: 'auth-service',
    //         host: 'localhost',
    //         port: 8090,
    //         healthCheckPath: '/actuator/health',
    //       },
    //     }),
    // },
    // CONSUL
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
