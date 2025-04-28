import { Injectable } from '@nestjs/common';
import { ICartItemRepository } from '../cart.item.repository.interface';
import { Transaction } from 'sequelize';
import { CartItem } from 'src/entity/cart.item.entity';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from 'common';

@Injectable()
export class CartItemRepository implements ICartItemRepository {
  constructor(
    @InjectModel(CartItem)
    private readonly cartItemModel: typeof CartItem,
  ) {}

  async create(entity: CartItem, transaction?: Transaction): Promise<CartItem> {
    return await entity.save({ transaction });
  }

  async update(entity: CartItem, transaction?: Transaction): Promise<CartItem> {
    return await entity.update(
      { ...entity, updatedAt: new Date(Date.now()) },
      { transaction },
    );
  }

  async findById(id: string): Promise<CartItem> {
    const cartItem = await this.cartItemModel.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`Cart Item [${id}] Not Found`);
    }
    return cartItem;
  }

  async remove(id: string): Promise<void> {
    const cart = await this.findById(id);
    if (!cart) throw new NotFoundException(`Cart Item [${id}] Not Found`);
    await cart.destroy();
  }

  async findAll(): Promise<CartItem[]> {
    const cartItems = await this.cartItemModel.findAll();
    return cartItems;
  }
}
