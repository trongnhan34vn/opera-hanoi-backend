import { Injectable } from '@nestjs/common';
import { ICartRepository } from '../cart.repository.interface';
import { Transaction } from 'sequelize';
import { Cart } from 'src/entity/cart.entity';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from 'common';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectModel(Cart)
    private readonly cartItemModel: typeof Cart,
  ) {}

  async create(entity: Cart, transaction?: Transaction): Promise<Cart> {
    return await entity.save({ transaction });
  }
  async update(entity: Cart, transaction?: Transaction): Promise<Cart> {
    return await entity.update(
      { ...entity, updatedAt: new Date(Date.now()) },
      { transaction },
    );
  }
  async findById(id: string): Promise<Cart> {
    const cart = await this.cartItemModel.findOne({ where: { id } });
    if (!cart) throw new NotFoundException(`Cart [${id}] Not Found`);
    return cart;
  }
  async remove(id: string): Promise<void> {
    const cart = await this.findById(id);
    if (!cart) throw new NotFoundException(`Cart [${id}] Not Found`);
    await cart.destroy();
  }
  async findAll(): Promise<Cart[]> {
    return await this.cartItemModel.findAll();
  }
}
