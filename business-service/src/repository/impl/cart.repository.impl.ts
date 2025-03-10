import { CartRepositoryInterface } from '../cart.repository.interface';
import { Cart } from '../../entity/cart.entity';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerFactory } from 'common-lib';
import { Transaction } from 'sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartRepository implements CartRepositoryInterface {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart,
    private readonly logger: LoggerFactory,
  ) {}

  async create(entity: Cart, transaction?: Transaction): Promise<Cart> {
    return await entity.save({ transaction });
  }

  update(entity: Cart, transaction?: Transaction): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Cart[]> {
    throw new Error('Method not implemented.');
  }
}
