import { Transaction } from 'sequelize';
import { CartItem } from 'src/entity/cart.item.entity';
import { CartItemRepositoryInterface } from '../cart.item.repository.interface';
export declare class CartItemRepository implements CartItemRepositoryInterface {
    create(entity: CartItem, transaction?: Transaction): Promise<CartItem>;
    update(entity: CartItem, transaction?: Transaction): Promise<CartItem>;
    findById(id: string): Promise<CartItem>;
    remove(id: string): Promise<void>;
    findAll(): Promise<CartItem[]>;
}
