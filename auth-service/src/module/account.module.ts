import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceFactory,
  HttpServiceModule,
  IHttpServiceFactoryToken,
  LoggerFactory,
} from 'common';
import { AccountService } from '../service/account.service';

@Module({
  imports: [HttpServiceModule],
  providers: [
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('account-service'), // Cung cấp category và level mặc định
    },

    {
      provide: IHttpServiceFactoryToken,
      useClass: HttpServiceFactory
    },
    AccountService,
  ],

  exports: [AccountService],
})
export class AccountModule {}
