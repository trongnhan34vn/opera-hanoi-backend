import { Cart } from 'src/entity/cart.entity';
import { GenericRepositoryInterface } from './generic.repository.interface';

export interface ICartRepository extends GenericRepositoryInterface<Cart> {}
