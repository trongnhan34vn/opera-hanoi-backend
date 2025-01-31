import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ShowTime } from './show.time.entity';

@Table({ modelName: 'seats' })
export class Seat extends Model<Seat> {
  // ID PRIMARY KEY
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // row ex: A, B, ...
  @Column({
    type: DataType.STRING,
  })
  row: string;

  // column ex: 1, 2, 3,...
  @Column({
    type: DataType.STRING,
  })
  column: string;

  // seatCode = row + column ex: A1, A2
  @Column({
    type: DataType.STRING,
  })
  seatCode: string;

  // isBooked
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isBooked: boolean;

  // 1 showtime has many seat
  @ForeignKey(() => ShowTime)
  @Column({ type: DataType.UUID })
  showTimeId: string;

  @BelongsTo(() => ShowTime)
  showTime: ShowTime;

  // 1 user - 1 seat
  @Column({ type: DataType.UUID })
  userId: string;

  // create and update time
  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
