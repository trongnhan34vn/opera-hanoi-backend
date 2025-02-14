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

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category> {
  // PK ID
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // TITLE
  @Column({
    type: DataType.STRING,
  })
  title: string;

  // DESCRIPTION
  @Column({
    type: DataType.STRING,
  })
  description: string;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // RELATIONS //

  // CONCERT
  @BelongsToMany(() => Concert, () => ConcertCategory)
  concerts: Concert[];

  // RELATIONS //
}
