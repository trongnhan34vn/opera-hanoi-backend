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

@Table({ modelName: 'categories' })
export class Category extends Model<Category> {
  // ID PRIMARY KEY
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // title
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  // description
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  // Many to Many with Concert
  @BelongsToMany(() => Concert, {
    through: 'concert_category',
    foreignKey: 'categoryId',  // Định nghĩa khóa ngoại
    otherKey: 'concertId',   // Định nghĩa khóa ngoại bên kia
  })
  concerts: Concert[];

  // create and update time
  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
