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
import { UUIDV4 } from 'sequelize';

@Table({
  tableName: 'images',
})
export class Image extends Model<Image> {
  // PK ID
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  // URL
  @Column({
    type: DataType.STRING,
  })
  url: string;

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
