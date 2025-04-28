import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpResponseFactory, LoggerFactory } from 'common';
import {
  ISeatCategoryMapperToken,
  ISeatCategoryRepositoryToken,
  ISeatCateogoryServiceToken,
} from 'src/constants/symbol';
import { SeatCategoryController } from 'src/controller/seat.category.controller';
import { SeatCategory } from 'src/entity/seat.category';
import { SeatCategoryMapper } from 'src/mapper/impl/seat.category.mapper.impl';
import { SeatCategoryRepository } from 'src/repository/impl/seat.category.repository.impl';
import { SeatCategoryService } from 'src/service/impl/seat.category.service.impl';

@Module({
  imports: [SequelizeModule.forFeature([SeatCategory])],
  providers: [
    {
      provide: ISeatCategoryRepositoryToken,
      useClass: SeatCategoryRepository,
    },
    {
      provide: ISeatCateogoryServiceToken,
      useClass: SeatCategoryService,
    },
    {
      provide: ISeatCategoryMapperToken,
      useClass: SeatCategoryMapper,
    },
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('seat-category-service'), // Cung cấp Genre và level mặc định
    },
    LoggerFactory,
    HttpResponseFactory,
  ],
  controllers: [SeatCategoryController],
  exports: [ISeatCateogoryServiceToken],
})
export class SeatCategoryModule {}
