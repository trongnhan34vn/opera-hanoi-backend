
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
import { SeatStatusEnum } from '../enum/seat.status.enum';
import { Seat } from '../seat.entity';

@Table({
  tableName: 'concert_seat',
})
export class ConcertSeat extends Model<ConcertSeat> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @ForeignKey(() => Concert)
  @Column({
    type: DataType.UUID,
  })
  concertId: string;

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.INTEGER,
  })
  seatId: number;

  @Column({
    type: DataType.ENUM(...Object.values(SeatStatusEnum)),
    defaultValue: SeatStatusEnum.AVAILABLE,
  })
  status: SeatStatusEnum;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
