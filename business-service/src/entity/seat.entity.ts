import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { CartItem } from './cart.item.entity';
import { Concert } from './concert.entity';
import { SeatCategory } from './seat.category';
import { ConcertSeat } from './sub/concert.seat.sub.entity';
import { Zone } from './zone.entity';

@Table({
  tableName: 'seats',
})
export class Seat extends Model<Seat> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  label: string;

  @BelongsTo(() => SeatCategory)
  seatCategory: SeatCategory;

  @ForeignKey(() => SeatCategory)
  @Column({
    type: DataType.UUID,
  })
  seatCategoryId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Zone)
  zone: Zone;

  @ForeignKey(() => Zone)
  @Column({
    type: DataType.UUID,
  })
  zoneId: string;

  @BelongsToMany(() => Concert, () => ConcertSeat)
  concerts: Concert[]
}
