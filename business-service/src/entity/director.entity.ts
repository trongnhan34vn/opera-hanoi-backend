import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Concert } from './concert.entity';

@Table({
  tableName: 'directors',
})
export class Director extends Model<Director> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Concert)
  concert: Concert;

  @ForeignKey(() => Concert)
  @Column({
    type: DataType.UUID,
  })
  concertId: string;
}
