import { CartDto } from 'src/dto/request/cart.dto';
import { Cart } from 'src/entity/cart.entity';
import { ICartMapper } from '../cart.mapper.interface';
import { ICartItemMapper } from '../cart.item.mapper.interface';
export declare class CartMapper implements ICartMapper {
    private readonly cartItemMapper;
    constructor(cartItemMapper: ICartItemMapper);
    toDto(entity: Cart): CartDto;
    toEntity(dto: CartDto): Cart;
    toDtos(entities: Cart[]): CartDto[] | Promise<CartDto[]>;
    toEntities(dtos: CartDto[]): Cart[];
}
