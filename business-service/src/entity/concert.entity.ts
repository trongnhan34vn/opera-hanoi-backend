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
import { ConcertStatusEnum } from './enum/concert.status.enum';
import { Genre } from './genre.entity';
import { Image } from './image.entity';
import { Price } from './price.enity';
import { Seat } from './seat.entity';
import { ShowTime } from './show.time.entity';
import { ConcertGenre } from './sub/concert.genre.sub.entity';
import { ConcertSeat } from './sub/concert.seat.sub.entity';
import { Artist } from './artist.entity';
import { Director } from './director.entity';

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
  // @Column({
  //   type: DataType.STRING,
  // })
  // art: string;
  @HasMany(() => Artist)
  artists: Artist[];

  // DIRECTOR
  // @Column({
  //   type: DataType.STRING,
  // })
  // director: string;
  @HasMany(() => Director)
  directors: Director[];

  // CODE
  @Column({
    type: DataType.STRING,
  })
  code: string;

  // TITLE
  @Column({
    type: DataType.STRING,
  })
  title: string;

  // DESCRIPTION
  @Column({
    type: DataType.BLOB('long'),
  })
  description: string;

  // STATUS
  @Column({
    type: DataType.ENUM(...Object.values(ConcertStatusEnum)),
    defaultValue: ConcertStatusEnum.ON_SALE,
  })
  status: ConcertStatusEnum;

  // CREATE AND UPDATE TIME
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // RELATIONS //

  // N CONCERT - N CATEGORIES
  @BelongsToMany(() => Genre, () => ConcertGenre)
  genres: Genre[];

  // 1 CONCERT - N IMAGES
  @HasMany(() => Image)
  images: Image[];

  // 1 CONCERT - N SHOW TIME
  @HasMany(() => ShowTime)
  showTimes: ShowTime[];

  // RELATIONS //
  @HasMany(() => Price)
  prices: Price[];

  @BelongsToMany(() => Seat, () => ConcertSeat)
  seats: Seat[];
}
