import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
import { SeatCategory } from './seat.category.entity';
export declare class Seat extends Model<Seat> {
    id: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    concerts: Concert[];
    seatCategoryId: string;
    seatCategory: SeatCategory;
}
