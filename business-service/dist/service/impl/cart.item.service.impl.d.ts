import { ICartItemService } from '../cart.item.service.interface';
import { CartItemDto } from 'src/dto/request/cart.item.dto';
import { ICartItemRepository } from 'src/repository/cart.item.repository.interface';
import { ICartItemMapper } from 'src/mapper/cart.item.mapper.interface';
import { Sequelize } from 'sequelize-typescript';
export declare class CartItemService implements ICartItemService {
    private readonly cartItemRepository;
    private readonly cartItemMapper;
    private readonly sequelize;
    constructor(cartItemRepository: ICartItemRepository, cartItemMapper: ICartItemMapper, sequelize: Sequelize);
    save(dto: CartItemDto): Promise<CartItemDto>;
    findAll(): Promise<CartItemDto[]>;
    findById(id: string): Promise<CartItemDto>;
    remove(id: string): Promise<void>;
}
