import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { ShowTime } from './show.time.entity';

@Table({ modelName: 'concerts' })
export class Concert extends Model<Concert> {
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

  // art
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  art: string;

  // director
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  director: string;

  // duration
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration: number;

  // price
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  // isActive
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  // Many to Many with Category
  @BelongsToMany(() => Category, {
    through: 'concert_category',
    foreignKey: 'concertId', // Định nghĩa khóa ngoại
    otherKey: 'categoryId', // Định nghĩa khóa ngoại bên kia
  })
  categories: Category[];

  // 1 concert can show in many show time
  @HasMany(() => ShowTime)
  showTimes: ShowTime[];

  // create and update time
  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
