import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  KeycloakConfig,
  LoggerFactory,
  LogModule,
} from 'common-lib';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryMapper } from '../mapper/impl/category.mapper.impl';
import { CategoryService } from '../service/impl/category.service.impl';
import { CategoryController } from '../controller/category.controller';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repository/impl/category.repository.impl';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_REALM,
  KEYCLOAK_SERVICE_URL,
} from '../constants/KeycloakConsants';

@Module({
  imports: [
    LogModule,
    HttpServiceModule,
    SequelizeModule.forFeature([Category]),
    KeycloakConnectModule.register(
      KeycloakConfig.getKeycloakConfig(
        KEYCLOAK_SERVICE_URL,
        KEYCLOAK_REALM || 'test',
        KEYCLOAK_CLIENT_ID || 'test',
        KEYCLOAK_CLIENT_SECRET,
      ),
    ),
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
