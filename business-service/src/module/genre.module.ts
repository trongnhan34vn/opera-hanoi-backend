import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { GenreController } from '../controller/genre.controller';
import { Genre } from '../entity/genre.entity';
import { GenreMapper } from '../mapper/impl/genre.mapper.impl';
import { GenreRepository } from '../repository/impl/genre.repository.impl';
import { GenreService } from '../service/impl/genre.service.impl';

import { KeycloakConfig } from 'src/config/keycloak.config';

@Module({
  imports: [
    LogModule,
    HttpServiceModule,
    SequelizeModule.forFeature([Genre]),
    KeycloakConnectModule.register(
      KeycloakConfig.getKeycloakConfig(),
    ),
  ],
  controllers: [GenreController],
  providers: [
    GenreService,
    GenreMapper,
    GenreRepository,
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('genre-service'), // Cung cấp Genre và level mặc định
    },
  ],
  exports: [GenreService],
})
export class GenreModule {}
