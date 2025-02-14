import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Concert } from './concert.entity';
import { ConcertCategory } from './sub/concert.category.sub.entity';
import { ConcertSeat } from './sub/concert.seat.sub.entity';

@Table({
  tableName: 'seats',
})
export class Seat extends Model<Seat> {
  // PK ID
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  // SEAT CODE - EX: A1, B2,....
  @Column({
    type: DataType.STRING,
  })
  code: string;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // RELATIONS //

  // CONCERT
  @BelongsToMany(() => Concert, () => ConcertSeat)
  concerts: Concert[];

  // RELATIONS //
}
