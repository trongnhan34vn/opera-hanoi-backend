import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common-lib';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryMapper } from '../mapper/impl/category.mapper.impl';
import { ConcertService } from '../service/impl/concert.service.impl';
import { ConcertMapper } from '../mapper/impl/concert.mapper.impl';
import { ConcertController } from '../controller/concert.controller';
import { Concert } from '../entity/concert.entity';
import { CategoryModule } from './category.module';

@Module({
  imports: [
    LogModule,
    HttpServiceModule,
    CategoryModule,
    SequelizeModule.forFeature([Concert]),
  ],
  controllers: [ConcertController],
  providers: [
    ConcertService,
    CategoryMapper,
    ConcertMapper,
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('concert-service'), // Cung cấp category và level mặc định
    },
  ],
  exports: [ConcertService],
})
export class ConcertModule {}
