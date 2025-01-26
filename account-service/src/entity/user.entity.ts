import {
  Column,
  CreatedAt, DataType, Default,
  Model, PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  email: string;
  @Column
  phone: string;

  @Column
  address: string;

  @Column
  birthDate: Date;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
