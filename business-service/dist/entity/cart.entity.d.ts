import { Model } from 'sequelize-typescript';
import { CartItem } from './cart.item.entity';
export declare class Cart extends Model<Cart> {
    id: string;
    userId: string;
    cartItems: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}
