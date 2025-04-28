import { ICartRepository } from '../cart.repository.interface';
import { Transaction } from 'sequelize';
import { Cart } from 'src/entity/cart.entity';
export declare class CartRepository implements ICartRepository {
    private readonly cartItemModel;
    constructor(cartItemModel: typeof Cart);
    create(entity: Cart, transaction?: Transaction): Promise<Cart>;
    update(entity: Cart, transaction?: Transaction): Promise<Cart>;
    findById(id: string): Promise<Cart>;
    remove(id: string): Promise<void>;
    findAll(): Promise<Cart[]>;
}
