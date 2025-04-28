import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenreMapper } from '../mapper/impl/genre.mapper.impl';
import { ConcertService } from '../service/impl/concert.service.impl';
import { ConcertMapper } from '../mapper/impl/concert.mapper.impl';
import { ConcertController } from '../controller/concert.controller';
import { Concert } from '../entity/concert.entity';
import { GenreModule } from './genre.module';
import { ConcertRepository } from '../repository/impl/concert.repository.impl';

@Module({
  imports: [
    LogModule,
    HttpServiceModule,
    GenreModule,
    SequelizeModule.forFeature([Concert]),
  ],
  controllers: [ConcertController],
  providers: [
    ConcertService,
    ConcertRepository,
    GenreMapper,
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
