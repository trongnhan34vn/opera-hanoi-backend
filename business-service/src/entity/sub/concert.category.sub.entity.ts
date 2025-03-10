import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Concert } from '../concert.entity';
import { Category } from '../category.entity';

@Table({
  tableName: 'concert_category',
})
export class ConcertCategory extends Model<ConcertCategory> {
  // FK CONCERT
  @ForeignKey(() => Concert)
  @Column({
    type: DataType.UUID,
  })
  concertId: string;

  // FK CATEGORY
  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
  })
  categoryId: string;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
