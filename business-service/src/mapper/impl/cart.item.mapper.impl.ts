import { CartItemDto } from 'src/dto/request/cart.item.dto';
import { CartItem } from 'src/entity/cart.item.entity';
import { CartItemMapperInterface } from '../cart.item.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CartItemMapper implements CartItemMapperInterface {
  toDto(entity: CartItem): CartItemDto {
    const cartItemDto = new CartItemDto();
    cartItemDto.id = entity.id;
    cartItemDto.cartId = entity.cartId;
    cartItemDto.concertId = entity.concertId;
    cartItemDto.price = entity.price;
    cartItemDto.seatId = entity.seatId;
    return cartItemDto;
  }
  toEntity(dto: CartItemDto): CartItem {
    const cartItem = new CartItem();
    cartItem.id = dto.id ?? uuidV4();
    cartItem.seatId = dto.seatId;
    cartItem.cartId = dto.cartId;
    cartItem.price = dto.price;
    cartItem.concertId = dto.concertId;
    return cartItem;
  }

  toEntities(dtos: CartItemDto[]): CartItem[] {
    const cartItems: CartItem[] = [];
    for (const dto of dtos) {
      const cartItem = this.toEntity(dto);
      cartItems.push(cartItem);
    }
    return cartItems;
  }

  toDtos(entities: CartItem[]): CartItemDto[] {
    const cartItemDtos: CartItemDto[] = [];
    for (const entity of entities) {
      const cartItem = this.toDto(entity);
      cartItemDtos.push(cartItem);
    }
    return cartItemDtos;
  }
}