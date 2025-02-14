import { Model } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Image } from './image.entity';
import { ShowTime } from './show.time.entity';
import { Seat } from './seat.entity';
import { SeatCategory } from './seat.category.entity';
export declare class Concert extends Model<Concert> {
    id: string;
    art: string;
    director: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    categories: Category[];
    images: Image[];
    showTimes: ShowTime[];
    seats: Seat[];
    seatCategories: SeatCategory[];
}
