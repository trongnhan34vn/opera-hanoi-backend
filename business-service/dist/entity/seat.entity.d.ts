import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
import { SeatCategory } from './seat.category';
import { Zone } from './zone.entity';
export declare class Seat extends Model<Seat> {
    id: number;
    label: string;
    seatCategory: SeatCategory;
    seatCategoryId: string;
    createdAt: Date;
    updatedAt: Date;
    zone: Zone;
    zoneId: string;
    concerts: Concert[];
}
