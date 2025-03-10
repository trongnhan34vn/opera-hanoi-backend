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
import { ENUM } from 'sequelize';
import { SeatCategoryName } from './enum/seat.category.enum';
import { Seat } from './seat.entity';

@Table({
  tableName: 'seat_categories',
})
export class SeatCategory extends Model<SeatCategory> {
  // PK ID
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // Seat Category: VIP, Premium, Standard, Economy
  @Column({
    type: ENUM(...Object.values(SeatCategoryName)),
  })
  name: SeatCategoryName;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // RELATIONS //

  // CONCERT
  @HasMany(() => Seat)
  seats: Seat[];

  // RELATIONS //
}
