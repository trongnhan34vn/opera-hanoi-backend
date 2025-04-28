import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Concert } from './concert.entity';
import { ConcertGenre } from './sub/concert.genre.sub.entity';

@Table({
  tableName: 'genres',
})
export class Genre extends Model<Genre> {
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

  // CODE
  @Unique
  @Column({
    type: DataType.STRING,
  })
  code: string;

  // DESCRIPTION
  @Column({
    type: DataType.BLOB('long'),
    get() {
      const data = this.getDataValue('description');
      return data ? Buffer.from(data).toString('utf-8') : null;
    },
  })
  description: string;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // RELATIONS //

  // CONCERT
  @BelongsToMany(() => Concert, () => ConcertGenre)
  concerts: Concert[];

  // RELATIONS //
}
