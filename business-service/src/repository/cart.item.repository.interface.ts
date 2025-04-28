import { CartItem } from "src/entity/cart.item.entity";
import { GenericRepositoryInterface } from "./generic.repository.interface";

export interface ICartItemRepository extends GenericRepositoryInterface<CartItem> {}