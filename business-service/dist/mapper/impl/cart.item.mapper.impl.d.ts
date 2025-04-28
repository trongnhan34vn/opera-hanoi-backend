import { ICartItemMapper } from "../cart.item.mapper.interface";
import { CartItemDto } from "src/dto/request/cart.item.dto";
import { CartItem } from "src/entity/cart.item.entity";
export declare class CartItemMapper implements ICartItemMapper {
    toDto(entity: CartItem): CartItemDto;
    toEntity(dto: CartItemDto): CartItem;
    toDtos(entities: CartItem[]): CartItemDto[];
    toEntities(dtos: CartItemDto[]): CartItem[];
}
