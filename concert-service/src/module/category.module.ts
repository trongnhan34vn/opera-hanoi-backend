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
import { CategoryService } from '../service/impl/category.service.impl';
import { CategoryController } from '../controller/category.controller';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repository/impl/category.repository.impl';

@Module({
  imports: [
    LogModule,
    HttpServiceModule,
    SequelizeModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryMapper,
    CategoryRepository,
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('category-service'), // Cung cấp category và level mặc định
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
