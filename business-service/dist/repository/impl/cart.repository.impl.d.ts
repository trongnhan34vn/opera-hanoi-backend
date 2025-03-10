import { CartRepositoryInterface } from '../cart.repository.interface';
import { Cart } from '../../entity/cart.entity';
import { LoggerFactory } from 'common-lib';
import { Transaction } from 'sequelize';
export declare class CartRepository implements CartRepositoryInterface {
    private readonly cartModel;
    private readonly logger;
    constructor(cartModel: typeof Cart, logger: LoggerFactory);
    create(entity: Cart, transaction?: Transaction): Promise<Cart>;
    update(entity: Cart, transaction?: Transaction): Promise<Cart>;
    findById(id: string): Promise<Cart>;
    remove(id: string): Promise<void>;
    findAll(): Promise<Cart[]>;
}
