import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Cart } from './cart.entity';
import { Concert } from './concert.entity';
import { Seat } from './seat.entity';
import { CartItemStatusEnum } from './enum/cart.item.status.enum';

@Table({
  tableName: 'cart_items',
})
export class CartItem extends Model<CartItem> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  cartId: string;

  @ForeignKey(() => Seat)
  @Unique('unique_seat_per_concert') // Không cho phép cùng một ghế xuất hiện nhiều lần trong 1 buổi diễn
  @Column({
    type: DataType.UUID,
  })
  seatId: string;

  @BelongsTo(() => Seat)
  seat: Seat;

  @ForeignKey(() => Concert)
  @Unique('unique_seat_per_concert') // Không cho phép cùng một ghế xuất hiện nhiều lần trong 1 buổi diễn
  @Column({
    type: DataType.UUID,
  })
  concertId: string;

  @BelongsTo(() => Concert)
  concert: Concert;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.ENUM(...Object.values(CartItemStatusEnum)),
    defaultValue: 'ACTIVE',
  })
  status: CartItemStatusEnum;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
