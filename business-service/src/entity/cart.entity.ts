import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CartItem } from './cart.item.entity';

@Table({
  tableName: 'carts',
})
export class Cart extends Model<Cart> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
