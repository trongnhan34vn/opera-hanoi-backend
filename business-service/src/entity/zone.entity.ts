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
import { Seat } from './seat.entity';
import { Floor } from './floor.entity';

@Table({
  tableName: 'zones',
})
export class Zone extends Model<Zone> {
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

  @BelongsTo(() => Floor)
  floor: Floor;

  @HasMany(() => Seat)
  seats: Seat[];

  @ForeignKey(() => Floor)
  @Column({
    type: DataType.UUID,
  })
  floorId: string;
}
