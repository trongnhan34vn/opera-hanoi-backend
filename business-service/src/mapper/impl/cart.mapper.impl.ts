import { CartDto } from 'src/dto/request/cart.dto';
import { Cart } from 'src/entity/cart.entity';
import { CartMapperInterface } from '../cart.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CartItemMapper } from './cart.item.mapper.impl';

@Injectable()
export class CartMapper implements CartMapperInterface {
  constructor(private readonly cartItemMapper: CartItemMapper) {}

  toDto(entity: Cart): CartDto {
    const cartDto = new CartDto();
    cartDto.id = entity.id;
    cartDto.userId = entity.id;
    if (entity.cartItems) {
      cartDto.cartItems = this.cartItemMapper.toDtos(entity.cartItems);
    }
    return cartDto;
  }

  toEntity(dto: CartDto): Cart {
    const cart = new Cart();
    cart.id = dto.id ?? uuidv4();
    cart.userId = dto.userId;
    if (dto.cartItems) {
      cart.cartItems = this.cartItemMapper.toEntities(dto.cartItems);
    }
    return cart;
  }
}
