import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common';
import { UserService } from '../service/user.service.impl';
import { UserMapper } from '../mapper/user.mapper';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../entity/user.entity';
import { UserController } from 'src/controller/user.controller';

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
