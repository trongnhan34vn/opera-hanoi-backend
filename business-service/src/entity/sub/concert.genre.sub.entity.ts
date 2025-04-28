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
import { Genre } from '../genre.entity';

@Table({
  tableName: 'concert_genre',
})
export class ConcertGenre extends Model<ConcertGenre> {
  // FK CONCERT
  @ForeignKey(() => Concert)
  @Column({
    type: DataType.UUID,
  })
  concertId: string;

  // FK CATEGORY
  @ForeignKey(() => Genre)
  @Column({
    type: DataType.UUID,
  })
  genreId: string;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
