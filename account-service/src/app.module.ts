import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
import { LogModule } from 'common/dist/config/log.module';
import { GlobalAuthGuard, HttpResponseFactory, MiddlewareModule, SkipAuthGuard } from 'common';
import { UserController } from './controller/user.controller';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { UserModule } from './module/user.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import * as path from 'node:path';
import { KeycloakConfig } from './config/keycloak.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import * as dotenv from 'dotenv';

const envFilePath = '../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

@Module({
  imports: [
    // import auth module
    UserModule,
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

    // DATABASES
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.ACCOUNT_SERVICE_DB_HOST,
      port: Number.parseInt(process.env.ACCOUNT_SERVICE_DB_PORT ?? '5432'),
      username: process.env.ACCOUNT_SERVICE_DB_USERNAME,
      password: process.env.ACCOUNT_SERVICE_DB_PASSWORD,
      database: process.env.ACCOUNT_SERVICE_DB_DATABASE,
      schema: process.env.ACCOUNT_SERVICE_DB_SCHEMA,
      models: [User],
      define: {
        timestamps: true,
      },
      dialectOptions: {
        useUTC: false, // ⛔ Không convert về UTC
        dateStrings: true,
      },
      timezone: '+07:00',
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
