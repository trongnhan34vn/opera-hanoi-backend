import { Inject, Injectable } from '@nestjs/common';
import { ICartItemService } from '../cart.item.service.interface';
import { CartItemDto } from 'src/dto/request/cart.item.dto';
import { ICartItemRepository } from 'src/repository/cart.item.repository.interface';
import { ICartItemMapper } from 'src/mapper/cart.item.mapper.interface';
import { CartItem } from 'src/entity/cart.item.entity';
import {
  ICartItemRepositoryToken,
  ICartMapperToken,
} from 'src/constants/symbol';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CartItemService implements ICartItemService {
  constructor(
    @Inject(ICartItemRepositoryToken)
    private readonly cartItemRepository: ICartItemRepository,
    @Inject(ICartMapperToken)
    private readonly cartItemMapper: ICartItemMapper,
    private readonly sequelize: Sequelize,
  ) {}

  async save(dto: CartItemDto): Promise<CartItemDto> {
    try {
      const transaction = await this.sequelize.transaction();
      const cartItem = this.cartItemMapper.toEntity(dto) as CartItem;
      if (!dto.id) {
        // create operation <=> id == null
        const createdCartItem = await this.cartItemRepository.create(
          cartItem,
          transaction,
        );
        return this.cartItemMapper.toDto(createdCartItem);
      }
      const updatedCart = await this.cartItemRepository.update(
        cartItem,
        transaction,
      );
      return this.cartItemMapper.toDto(updatedCart);
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<CartItemDto[]> {
    const cartItems = await this.cartItemRepository.findAll();
    return this.cartItemMapper.toDtos(cartItems);
  }
  async findById(id: string): Promise<CartItemDto> {
    const cartItem = await this.cartItemRepository.findById(id);
    return this.cartItemMapper.toDto(cartItem);
  }
  async remove(id: string): Promise<void> {
    await this.cartItemRepository.remove(id);
  }
}
