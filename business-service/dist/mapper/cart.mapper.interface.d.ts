import { CartDto } from "src/dto/request/cart.dto";
import { GenericMapperInterface } from "./generic.mapper";
import { Cart } from "src/entity/cart.entity";
export interface ICartMapper extends GenericMapperInterface<CartDto, Cart> {
}
