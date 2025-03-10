import { CartDto } from 'src/dto/request/cart.dto';
import { Cart } from 'src/entity/cart.entity';
import { CartMapperInterface } from '../cart.mapper.interface';
import { CartItemMapper } from './cart.item.mapper.impl';
export declare class CartMapper implements CartMapperInterface {
    private readonly cartItemMapper;
    constructor(cartItemMapper: CartItemMapper);
    toDto(entity: Cart): CartDto;
    toEntity(dto: CartDto): Cart;
}
