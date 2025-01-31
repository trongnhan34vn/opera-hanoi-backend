import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common-lib';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from '../entity/category.entity';
import { CategoryService } from '../service/impl/category.service.impl';
import { CategoryMapper } from '../mapper/impl/category.mapper.impl';
import { CategoryController } from '../controller/category.controller';

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
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('category-service'), // Cung cấp category và level mặc định
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
