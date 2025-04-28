import { Inject, Injectable } from '@nestjs/common';
import { CartDto } from 'src/dto/request/cart.dto';
import { Cart } from 'src/entity/cart.entity';
import { ICartMapper } from '../cart.mapper.interface';
import { v4 as uuidv4 } from 'uuid';
import { ICartItemMapper } from '../cart.item.mapper.interface';
import { CartItemDto } from 'src/dto/request/cart.item.dto';
import { CartItem } from 'src/entity/cart.item.entity';
import { ICartItemMapperToken, ICartMapperToken } from '../../constants/symbol';

@Injectable()
export class CartMapper implements ICartMapper {
  constructor(
    @Inject(ICartItemMapperToken)
    private readonly cartItemMapper: ICartItemMapper) {}

  toDto(entity: Cart): CartDto {
    const cartDto = new CartDto();
    cartDto.id = entity.id;
    cartDto.userId = entity.userId;
    cartDto.cartItems = this.cartItemMapper.toDtos(
      entity.cartItems,
    ) as CartItemDto[];
    return cartDto;
  }
  
  toEntity(dto: CartDto): Cart {
    const cart = new Cart();
    cart.id = dto.id ?? uuidv4();
    cart.userId = dto.userId;
    cart.cartItems = this.cartItemMapper.toEntities(
      dto.cartItems,
    ) as CartItem[];
    return cart;
  }

  toDtos(entities: Cart[]): CartDto[] | Promise<CartDto[]> {
    const cartDtos: CartDto[] = [];
    for (const entity of entities) {
      const cartDto = this.toDto(entity);
      cartDtos.push(cartDto);
    }
    return cartDtos;
  }

  toEntities(dtos: CartDto[]): Cart[] {
    const carts: Cart[] = [];
    for (const dto of dtos) {
      const cart = this.toEntity(dto);
      carts.push(cart);
    }
    return carts;
  }
}
