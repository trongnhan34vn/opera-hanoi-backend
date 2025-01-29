import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common-lib';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service.impl';
import { UserMapper } from '../mapper/user.mapper';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../entity/user.entity';

@Module({
  imports: [LogModule, HttpServiceModule, SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserMapper,
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('user-service'), // Cung cấp category và level mặc định
    },
  ],
  exports: [UserService],
})
export class UserModule {}
