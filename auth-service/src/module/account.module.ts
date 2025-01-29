import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
} from 'common-lib';
import { AccountService } from '../service/account.service';

@Module({
  imports: [HttpServiceModule],
  providers: [
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('account-service'), // Cung cấp category và level mặc định
    },
    AccountService,
  ],

  exports: [AccountService],
})
export class AccountModule {}
