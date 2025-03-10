import { GenericRepositoryInterface } from './generic.repository.interface';
import { CartItem } from '../entity/cart.item.entity';

export interface CartItemRepositoryInterface extends GenericRepositoryInterface<CartItem> {}