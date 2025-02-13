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
import { SeatStatusName } from '../enum/seat.status.enum';

@Table({
  tableName: 'concert_seats',
})
export class ConcertSeat extends Model<ConcertSeat> {
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

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.UUID,
  })
  seatId: string;

  // STATUS
  @Column({
    type: DataType.ENUM('0', '1', '2', '3'),
  })
  status: SeatStatusName;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
