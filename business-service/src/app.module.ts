import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  HttpResponseFactory,
  KeycloakConfig,
  LoggerFactory,
  LogModule,
  MiddlewareModule,
} from 'common-lib';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_REALM,
  KEYCLOAK_SERVICE_URL,
} from './constants/KeycloakConsants';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './config/GlobalAuthGuard';
import { SkipAuthGuard } from './config/SkipAuthGuard';
import { Concert } from './entity/concert.entity';
import { Category } from './entity/category.entity';
import { Image } from './entity/image.entity';
import { Seat } from './entity/seat.entity';
import { SeatCategory } from './entity/seat.category.entity';
import { ConcertCategory } from './entity/sub/concert.category.sub.entity';
import { ConcertSeat } from './entity/sub/concert.seat.sub.entity';
import { ShowTime } from './entity/show.time.entity';
import { CategoryModule } from './module/category.module';
import { ConcertModule } from './module/concert.module';
import * as process from 'node:process';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart.item.entity';
import { CartModule } from './module/cart.module';

const envFilePath = '../.env.local';

@Module({
  imports: [
    // import modules
    CategoryModule,
    ConcertModule,
    CartModule,
    // import config interceptor
    LogModule,
    // import config .env.local
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, envFilePath),
    }),
    // import security from Keycloak
    KeycloakConnectModule.register(
      KeycloakConfig.getKeycloakConfig(
        KEYCLOAK_SERVICE_URL,
        KEYCLOAK_REALM || 'test',
        KEYCLOAK_CLIENT_ID || 'test',
        KEYCLOAK_CLIENT_SECRET,
      ),
    ),

    // import middleware api key
    MiddlewareModule,

    // DATABASES
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.BUSINESS_SERVICE_DB_HOST,
      port: Number.parseInt(process.env.BUSINESS_SERVICE_DB_PORT ?? '5432'),
      username: process.env.BUSINESS_SERVICE_DB_USERNAME,
      password: process.env.BUSINESS_SERVICE_DB_PASSWORD,
      database: process.env.BUSINESS_SERVICE_DB_DATABASE,
      schema: process.env.BUSINESS_SERVICE_DB_SCHEMA,
      models: [
        Concert,
        Category,
        Image,
        ShowTime,
        Seat,
        SeatCategory,
        ConcertCategory,
        Cart,
        CartItem,
        ConcertSeat,
      ],
      define: {
        timestamps: true,
      },
      dialectOptions: {
        useUTC: false, // ⛔ Không convert về UTC
        dateStrings: true,
      },
      autoLoadModels: true,
      synchronize: true,
      timezone: '+07:00',
    }),
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
