import { Model } from 'sequelize-typescript';
import { ConcertStatusEnum } from './enum/concert.status.enum';
import { Genre } from './genre.entity';
import { Image } from './image.entity';
import { Price } from './price.enity';
import { Seat } from './seat.entity';
import { ShowTime } from './show.time.entity';
import { Artist } from './artist.entity';
import { Director } from './director.entity';
export declare class Concert extends Model<Concert> {
    id: string;
    artists: Artist[];
    directors: Director[];
    code: string;
    title: string;
    description: string;
    status: ConcertStatusEnum;
    createdAt: Date;
    updatedAt: Date;
    genres: Genre[];
    images: Image[];
    showTimes: ShowTime[];
    prices: Price[];
    seats: Seat[];
}
