import { Module } from '@nestjs/common';
import {
  HttpResponseFactory,
  HttpServiceModule,
  LoggerFactory,
  LogModule,
} from 'common-lib';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from '../entity/cart.entity';
import { CartItem } from '../entity/cart.item.entity';
import { CartService } from '../service/impl/cart.service.impl';
import { CartItemService } from '../service/impl/cart.item.service.impl';
import { CartRepository } from '../repository/impl/cart.repository.impl';
import { CartItemRepository } from '../repository/impl/cart.item.repository.impl';
import { CartMapper } from '../mapper/impl/cart.mapper.impl';
import { CartItemMapper } from '../mapper/impl/cart.item.mapper.impl';
import { CartController } from '../controller/cart.controller';

@Module({
  imports: [
    LogModule,
    HttpServiceModule,
    SequelizeModule.forFeature([Cart, CartItem]),
  ],
  controllers: [CartController],
  providers: [
    CartService,
    CartItemService,
    CartRepository,
    CartMapper,
    CartItemMapper,
    CartItemRepository,
    HttpResponseFactory,
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('cart-service'), // Cung cấp category và level mặc định
    },
  ],
  exports: [CartService],
})
export class CartModule {}
