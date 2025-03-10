import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
import { Seat } from './seat.entity';
import { CartItemStatusEnum } from './enum/cart.item.status.enum';
export declare class CartItem extends Model<CartItem> {
    id: string;
    cartId: string;
    seatId: string;
    seat: Seat;
    concertId: string;
    concert: Concert;
    price: number;
    status: CartItemStatusEnum;
    createdAt: Date;
    updatedAt: Date;
}
