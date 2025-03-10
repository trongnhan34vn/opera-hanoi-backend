import { CartServiceInterface } from '../cart.service.interface';
import { CartRepository } from '../../repository/impl/cart.repository.impl';
import { Cart } from 'src/entity/cart.entity';
import { CartDto } from '../../dto/request/cart.dto';
import { CartMapper } from '../../mapper/impl/cart.mapper.impl';
import { LoggerFactory } from 'common-lib';
import { Sequelize } from 'sequelize-typescript';
export declare class CartService implements CartServiceInterface {
    private readonly cartRepository;
    private readonly cartMapper;
    private readonly logger;
    private readonly sequelize;
    constructor(cartRepository: CartRepository, cartMapper: CartMapper, logger: LoggerFactory, sequelize: Sequelize);
    save(dto: Cart): Promise<Cart>;
    create(dto: CartDto): Promise<Cart>;
    findAll(): Promise<Cart[]>;
    findById(id: string): Promise<Cart>;
    remove(id: string): Promise<void>;
}
