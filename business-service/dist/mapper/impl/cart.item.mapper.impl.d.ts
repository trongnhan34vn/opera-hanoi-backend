import { CartItemDto } from 'src/dto/request/cart.item.dto';
import { CartItem } from 'src/entity/cart.item.entity';
import { CartItemMapperInterface } from '../cart.item.mapper.interface';
export declare class CartItemMapper implements CartItemMapperInterface {
    toDto(entity: CartItem): CartItemDto;
    toEntity(dto: CartItemDto): CartItem;
    toEntities(dtos: CartItemDto[]): CartItem[];
    toDtos(entities: CartItem[]): CartItemDto[];
}
