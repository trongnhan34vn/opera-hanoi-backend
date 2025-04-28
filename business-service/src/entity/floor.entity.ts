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
import { Room } from './room.entity';
import { Zone } from './zone.entity';

@Table({
  tableName: 'floors',
})
export class Floor extends Model<Floor> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  label: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Room)
  room: Room;

  @HasMany(() => Zone)
  zones: Zone[];

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  roomId: string;
}
