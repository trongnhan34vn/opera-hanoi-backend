import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpResponseFactory, LoggerFactory } from 'common';
import {
  ICartItemMapperToken,
  ICartItemRepositoryToken,
  ICartItemServiceToken,
  ICartMapperToken,
  ICartRepositoryToken,
  ICartServiceToken,
} from 'src/constants/symbol';
import { CartController } from 'src/controller/cart.controller';
import { Cart } from 'src/entity/cart.entity';
import { CartItem } from 'src/entity/cart.item.entity';
import { CartItemMapper } from 'src/mapper/impl/cart.item.mapper.impl';
import { CartMapper } from 'src/mapper/impl/cart.mapper.impl';
import { CartItemRepository } from 'src/repository/impl/cart.item.repository.impl';
import { CartRepository } from 'src/repository/impl/cart.repository.impl';
import { CartItemService } from 'src/service/impl/cart.item.service.impl';
import { CartService } from 'src/service/impl/cart.service.impl';

@Module({
  imports: [SequelizeModule.forFeature([Cart, CartItem])],
  providers: [
    {
      provide: ICartRepositoryToken,
      useClass: CartRepository,
    },
    {
      provide: ICartServiceToken,
      useClass: CartService,
    },
    {
      provide: ICartMapperToken,
      useClass: CartMapper,
    },
    {
      provide: ICartItemRepositoryToken,
      useClass: CartItemRepository,
    },
    {
      provide: ICartItemServiceToken,
      useClass: CartItemService,
    },
    {
      provide: ICartItemMapperToken,
      useClass: CartItemMapper,
    },
    {
      provide: LoggerFactory,
      useFactory: () => new LoggerFactory('cart-service'), // Cung cấp category và level mặc định
    },
    HttpResponseFactory,
  ],
  controllers: [CartController],
  exports: [ICartItemServiceToken, ICartServiceToken],
})
export class CartModule {}
