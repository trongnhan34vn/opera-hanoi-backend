import { CartServiceInterface } from '../cart.service.interface';
import { Injectable } from '@nestjs/common';
import { CartRepository } from '../../repository/impl/cart.repository.impl';
import { Cart } from 'src/entity/cart.entity';
import { CartDto } from '../../dto/request/cart.dto';
import { CartMapper } from '../../mapper/impl/cart.mapper.impl';
import { LoggerFactory } from 'common-lib';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CartService implements CartServiceInterface {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartMapper: CartMapper,
    private readonly logger: LoggerFactory,
    private readonly sequelize: Sequelize,
  ) {}

  save(dto: Cart): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  async create(dto: CartDto): Promise<Cart> {
    const transaction = await this.sequelize.transaction();
    try {
      const cart = this.cartMapper.toEntity(dto);
      const entity = await this.cartRepository.create(cart, transaction);
      this.logger.log(`Cart created [${entity.id}]`);
      await transaction.commit();
      return entity;
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }

  findAll(): Promise<Cart[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
