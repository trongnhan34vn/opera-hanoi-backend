import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../entity/user.entity';
import { UserController } from 'src/controller/user.controller';
import { IUserMapperToken, IUserRepositoryToken, IUserServiceToken } from 'src/constants/symbol';
import { UserMapperImpl } from 'src/mapper/user.mapper';
import { UserRepositoryImpl } from 'src/repository/impl/user.repository.impl';
import { UserServiceImpl } from 'src/service/impl/user.service.impl';

@Module({
  imports: [LogModule, HttpServiceModule, SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: IUserMapperToken,
      useClass: UserMapperImpl
    },
    {
      provide: IUserRepositoryToken,
      useClass: UserRepositoryImpl
    },
    {
      provide: IUserServiceToken,
      useClass: UserServiceImpl
    },
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('user-service'), // Cung cấp category và level mặc định
    },
  ],
  exports: [IUserServiceToken, IUserMapperToken, IUserRepositoryToken],
})
export class UserModule {}
