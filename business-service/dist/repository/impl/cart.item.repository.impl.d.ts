import { ICartItemRepository } from '../cart.item.repository.interface';
import { Transaction } from 'sequelize';
import { CartItem } from 'src/entity/cart.item.entity';
export declare class CartItemRepository implements ICartItemRepository {
    private readonly cartItemModel;
    constructor(cartItemModel: typeof CartItem);
    create(entity: CartItem, transaction?: Transaction): Promise<CartItem>;
    update(entity: CartItem, transaction?: Transaction): Promise<CartItem>;
    findById(id: string): Promise<CartItem>;
    remove(id: string): Promise<void>;
    findAll(): Promise<CartItem[]>;
}
