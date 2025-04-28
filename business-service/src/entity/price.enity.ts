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
import { SeatCategory } from './seat.category';
import { Concert } from './concert.entity';

@Table({
  tableName: 'prices',
})
export class Price extends Model<Price> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

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

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
