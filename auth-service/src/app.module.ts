import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
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
import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakConfig } from './config/keycloak.config';
import { AccountModule } from './module/account.module';
import { KeycloakModule } from './module/keycloak.module';
import { ConcertModule } from './module/concert.module';
import { AuthModule } from './module/auth.module';

const envFilePath = '../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

// console.log('🚀 DB config:', {
//   host: process.env.BUSINESS_SERVICE_DB_HOST,
//   port: process.env.BUSINESS_SERVICE_DB_PORT,
//   user: process.env.BUSINESS_SERVICE_DB_USERNAME,
//   pass: process.env.BUSINESS_SERVICE_DB_PASSWORD,
//   schema: process.env.BUSINESS_SERVICE_DB_SCHEMA,
//   database: process.env.BUSINESS_SERVICE_DB_DATABASE
// });

@Module({
  imports: [
    // import modules
    AccountModule, 
    KeycloakModule,
    ConcertModule,
    AuthModule,
    // import config interceptor
    LogModule,
    // import config .env.local
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, envFilePath),
    }),
    // import security from Keycloak
    KeycloakConnectModule.register(KeycloakConfig.getKeycloakConfig()),

    // import middleware api key
    MiddlewareModule,
    
  ],
  controllers: [AppController],
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
