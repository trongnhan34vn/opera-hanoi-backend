import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Concert } from '../concert.entity';
import { Seat } from '../seat.entity';
import { SeatCategory } from '../seat.category.entity';

@Table({
  tableName: 'concert_seatCategories',
})
export class ConcertSeatCategory extends Model<ConcertSeatCategory> {
  // PK ID
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // FKs
  @ForeignKey(() => Concert)
  @Column({
    type: DataType.UUID,
  })
  concertId: string;

  @ForeignKey(() => SeatCategory)
  @Column({
    type: DataType.UUID,
  })
  seatCategoryId: string;

  // PRICE
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
