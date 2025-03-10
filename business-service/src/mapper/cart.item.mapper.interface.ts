import { GenericMapperInterface } from './generic.mapper';
import { CartItemDto } from '../dto/request/cart.item.dto';
import { CartItem } from '../entity/cart.item.entity';

export interface CartItemMapperInterface extends GenericMapperInterface<CartItemDto, CartItem> {}