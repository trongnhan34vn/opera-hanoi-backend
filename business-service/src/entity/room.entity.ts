import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Floor } from './floor.entity';

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  label: string;

  @HasMany(() => Floor)
  floors: Floor[]

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
