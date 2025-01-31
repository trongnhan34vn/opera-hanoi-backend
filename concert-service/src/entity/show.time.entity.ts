import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Concert } from './concert.entity';
import { Seat } from './seat.entity';

@Table({ modelName: 'show_times' })
export class ShowTime extends Model<ShowTime> {
  // ID PRIMARY KEY
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // show day
  @Column({
    type: 'timestamp',
  })
  dateTime: Date;

  // 1 concert for 1 day =>
  // 1 show time - 1 concert && 1 concert - n show_time
  @BelongsTo(() => Concert)
  concert: Concert;

  @ForeignKey(() => Concert)
  @Column({
    type: DataType.UUID,
  })
  concertId: string;

  // 1 show time has many seat
  @HasMany(() => Seat)
  seats: Seat[];

  // create and update time
  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
