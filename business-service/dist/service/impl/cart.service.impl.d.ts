import { ICartService } from '../cart.service.interface';
import { LoggerFactory } from 'common';
import { ICartRepository } from 'src/repository/cart.repository.interface';
import { CartDto } from 'src/dto/request/cart.dto';
import { ICartMapper } from 'src/mapper/cart.mapper.interface';
import { Sequelize } from 'sequelize-typescript';
export declare class CartService implements ICartService {
    private readonly cartRepository;
    private readonly cartMapper;
    private readonly logger;
    private readonly sequelize;
    constructor(cartRepository: ICartRepository, cartMapper: ICartMapper, logger: LoggerFactory, sequelize: Sequelize);
    save(dto: CartDto): Promise<CartDto>;
    findAll(): Promise<CartDto[]>;
    findById(id: string): Promise<CartDto>;
    remove(id: string): Promise<void>;
}
