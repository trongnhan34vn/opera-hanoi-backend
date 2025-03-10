import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
} from 'common-lib';
import { CartService } from '../service/cart.service';

@Module({
  imports: [HttpServiceModule],
  providers: [
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('cart-service'), // Cung cấp category và level mặc định
    },
    CartService,
  ],

  exports: [CartService],
})
export class ConcertModule {}
