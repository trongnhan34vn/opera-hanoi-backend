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
import { ConcertCategory } from './sub/concert.category.sub.entity';
import { Image } from './image.entity';
import { ShowTime } from './show.time.entity';
import { Seat } from './seat.entity';
import { ConcertSeat } from './sub/concert.seat.sub.entity';
import { SeatCategory } from './seat.category.entity';
import { ConcertSeatCategory } from './sub/concert.seat.category.sub.entity';

@Table({
  tableName: 'concerts',
})
export class Concert extends Model<Concert> {
  // PK ID
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  // ART
  @Column({
    type: DataType.STRING,
  })
  art: string;

  // DIRECTOR
  @Column({
    type: DataType.STRING,
  })
  director: string;

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

  // N CONCERT - N CATEGORIES
  @BelongsToMany(() => Category, () => ConcertCategory)
  categories: Category[];

  // 1 CONCERT - N IMAGES
  @HasMany(() => Image)
  images: Image[];

  // 1 CONCERT - N SHOW TIME
  @HasMany(() => ShowTime)
  showTimes: ShowTime[];

  // N CONCERT - N SEAT
  @BelongsToMany(() => Seat, () => ConcertSeat)
  seats: Seat[];

  // N CONCERT - N SEAT CATEGORY
  @BelongsToMany(() => SeatCategory, () => ConcertSeatCategory)
  seatCategories: SeatCategory[];

  // RELATIONS //
}
