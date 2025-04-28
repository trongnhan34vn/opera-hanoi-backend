import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { SeatCategoryEnum } from './enum/seat.category.enum';
import { Seat } from './seat.entity';
import { Price } from './price.enity';

@Table({
  tableName: 'seat_categories',
})
export class SeatCategory extends Model<SeatCategory> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.ENUM(...Object.values(SeatCategoryEnum)),
  })
  name: SeatCategoryEnum;

  @HasMany(() => Seat)
  seats: Seat[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Price)
  prices: Price[];
}
