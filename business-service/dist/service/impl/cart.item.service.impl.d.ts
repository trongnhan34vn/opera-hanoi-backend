import { LoggerFactory } from 'common-lib';
import { CartItemRepository } from '../../repository/impl/cart.item.repository.impl';
import { CartItemServiceInterface } from '../cart.item.service.interface';
import { CartItem } from 'src/entity/cart.item.entity';
import { CartItemDto } from '../../dto/request/cart.item.dto';
import { CartItemMapper } from '../../mapper/impl/cart.item.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
export declare class CartItemService implements CartItemServiceInterface {
    private readonly logger;
    private readonly cartItemMapper;
    private readonly cartItemRepository;
    private readonly sequelize;
    constructor(logger: LoggerFactory, cartItemMapper: CartItemMapper, cartItemRepository: CartItemRepository, sequelize: Sequelize);
    addToCart(dto: CartItemDto): Promise<CartItemDto>;
    save(dto: CartItem): Promise<CartItem>;
    findAll(): Promise<CartItem[]>;
    findById(id: string): Promise<CartItem>;
    remove(id: string): Promise<void>;
}
