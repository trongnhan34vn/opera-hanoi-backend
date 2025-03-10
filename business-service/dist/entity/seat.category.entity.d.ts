import { Model } from 'sequelize-typescript';
import { SeatCategoryName } from './enum/seat.category.enum';
import { Seat } from './seat.entity';
export declare class SeatCategory extends Model<SeatCategory> {
    id: string;
    name: SeatCategoryName;
    createdAt: Date;
    updatedAt: Date;
    seats: Seat[];
}
