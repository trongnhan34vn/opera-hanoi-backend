import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'node:path';
import {
  HttpResponseFactory,
  LoggerFactory,
  LogModule,
  MiddlewareModule,
} from 'common-lib';
import { KeycloakConfig } from './config/KeycloakConfig';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './config/GlobalAuthGuard';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { SkipAuthGuard } from './config/SkipAuthGuard';
import { UserModule } from './module/user.module';

const envFilePath = '../.env.dev';

@Module({
  imports: [
    // import auth module
    UserModule,
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
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'Nhantic1998@',
      database: 'account_service_db',
      schema: 'account_service_schema',
      models: [User],
      define: {
        timestamps: true,
      },
      autoLoadModels: true,
      synchronize: true,
    }),
    // DATABASES
  ],
  controllers: [AppController, UserController],
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
