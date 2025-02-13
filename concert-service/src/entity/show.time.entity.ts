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
import { Concert } from './concert.entity';

@Table({
  tableName: 'show_times',
})
export class ShowTime extends Model<ShowTime> {
  // PK ID
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // START TIME - END TIME
  @Column({
    type: DataType.DATE,
  })
  startTime: Date;

  @Column({
    type: DataType.DATE,
  })
  endTime: Date;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // RELATIONS //

  // CONCERT
  @BelongsTo(() => Concert)
  concert: Concert;

  @ForeignKey(() => Concert)
  @Column({
    type: DataType.UUID,
  })
  concertId: string;

  // RELATIONS //
}
