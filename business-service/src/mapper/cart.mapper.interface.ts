import { GenericMapperInterface } from './generic.mapper';
import { CartDto } from '../dto/request/cart.dto';
import { Cart } from '../entity/cart.entity';

export interface CartMapperInterface extends GenericMapperInterface<CartDto, Cart> {}