import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Cart } from './cart.entity';
import { CartItemStatusEnum } from './enum/cart.item.status.enum';

@Table({
  tableName: 'cart_items'
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
  })
  cartId: string;

  @BelongsTo(() => Cart)
  cart: Cart;

  @Column({
    type: DataType.ENUM(...Object.values(CartItemStatusEnum)),
    defaultValue: CartItemStatusEnum.ACTIVE
  })
  status: CartItemStatusEnum;

  @Column({ type: DataType.UUID })
  concertSeatId: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
