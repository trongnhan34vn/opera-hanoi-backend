import { Inject, Injectable } from '@nestjs/common';
import { ICartService } from '../cart.service.interface';
import { LoggerFactory } from 'common';
import { ICartRepository } from 'src/repository/cart.repository.interface';
import { CartDto } from 'src/dto/request/cart.dto';
import { ICartMapper } from 'src/mapper/cart.mapper.interface';
import { Cart } from 'src/entity/cart.entity';
import {
  ICartItemRepositoryToken,
  ICartMapperToken,
} from 'src/constants/symbol';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(ICartItemRepositoryToken)
    private readonly cartRepository: ICartRepository,
    @Inject(ICartMapperToken)
    private readonly cartMapper: ICartMapper,
    private readonly logger: LoggerFactory,
    private readonly sequelize: Sequelize,
  ) {}

  async save(dto: CartDto): Promise<CartDto> {
    const transaction = await this.sequelize.transaction();
    const cart = this.cartMapper.toEntity(dto) as Cart;
    try {
      if (!dto.id) {
        // create operation
        const createdCart = await this.cartRepository.create(cart, transaction);
        this.logger.log(`Cart [${createdCart.id}] is created`);

        return this.cartMapper.toDto(createdCart);
      }
      const updatedCart = await this.cartRepository.update(cart, transaction);
      this.logger.log(`Cart [${updatedCart.id}] is updated`);
      return this.cartMapper.toDto(updatedCart);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<CartDto[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<CartDto> {
    try {
      const cart = await this.cartRepository.findById(id);
      return this.cartMapper.toDto(cart);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
