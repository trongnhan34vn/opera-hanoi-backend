import { Transaction } from 'sequelize';
import { CartItem } from 'src/entity/cart.item.entity';
import { CartItemRepositoryInterface } from '../cart.item.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartItemRepository implements CartItemRepositoryInterface {
  async create(entity: CartItem, transaction?: Transaction): Promise<CartItem> {
    return await entity.save({ transaction });
  }

  update(entity: CartItem, transaction?: Transaction): Promise<CartItem> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<CartItem> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<CartItem[]> {
    throw new Error('Method not implemented.');
  }
}
