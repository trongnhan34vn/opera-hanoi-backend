import { Model } from 'sequelize-typescript';
import { Cart } from './cart.entity';
import { CartItemStatusEnum } from './enum/cart.item.status.enum';
export declare class CartItem extends Model<CartItem> {
    id: string;
    cartId: string;
    cart: Cart;
    status: CartItemStatusEnum;
    concertSeatId: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
