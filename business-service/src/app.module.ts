import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
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
import { Artist } from './entity/artist.entity';
import { Concert } from './entity/concert.entity';
import { Director } from './entity/director.entity';
import { Floor } from './entity/floor.entity';
import { Genre } from './entity/genre.entity';
import { Image } from './entity/image.entity';
import { Room } from './entity/room.entity';
import { SeatCategory } from './entity/seat.category';
import { Seat } from './entity/seat.entity';
import { ShowTime } from './entity/show.time.entity';
import { ConcertGenre } from './entity/sub/concert.genre.sub.entity';
import { ConcertSeat } from './entity/sub/concert.seat.sub.entity';
import { Zone } from './entity/zone.entity';
import { ConcertModule } from './module/concert.module';
import { GenreModule } from './module/genre.module';
import { SeatCategoryModule } from './module/seat.category.module';
import { S3Module } from './module/s3.module';
import { CartModule } from './module/cart.module';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart.item.entity';
import { Price } from './entity/price.enity';

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
    GenreModule,
    ConcertModule,
    SeatCategoryModule,
    CartModule,
    S3Module,
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
      // uri: 'postgresql://localhost:5435/business_service_db',
      host: process.env.BUSINESS_SERVICE_DB_HOST,
      port: Number.parseInt(process.env.BUSINESS_SERVICE_DB_PORT ?? '5432'),
      username: process.env.BUSINESS_SERVICE_DB_USERNAME,
      password: process.env.BUSINESS_SERVICE_DB_PASSWORD,
      database: process.env.BUSINESS_SERVICE_DB_DATABASE,
      schema: process.env.BUSINESS_SERVICE_DB_SCHEMA,
      models: [
        Artist,
        Director,
        Concert,
        Cart,
        CartItem,
        Genre,
        Image,
        ShowTime,
        ConcertGenre,
        Seat,
        Floor,
        Price,
        SeatCategory,
        Room,
        Zone,
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
