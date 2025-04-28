import { CartItemDto } from "src/dto/request/cart.item.dto";
import { GenericMapperInterface } from "./generic.mapper";
import { CartItem } from "src/entity/cart.item.entity";
export interface ICartItemMapper extends GenericMapperInterface<CartItemDto, CartItem> {
}
