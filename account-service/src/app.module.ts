import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';

import {
  HttpResponseFactory,
  LoggerFactory,
  LogModule,
  MiddlewareModule,
} from 'common-lib';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { KeycloakConfig } from './config/KeycloakConfig';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './config/GlobalAuthGuard';
import { SkipAuthGuard } from './config/SkipAuthGuard';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';

const envFilePath = '../../env/.env.dev';

@Module({
  imports: [
    // import auth module
    // AuthModule,
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

    // DATABASES
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'user',
    //   password: 'password',
    //   database: 'database_name',
    //   models: [User],
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),
    // DATABASES
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
