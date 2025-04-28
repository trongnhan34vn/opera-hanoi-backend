import { Model } from 'sequelize-typescript';
import { SeatCategoryEnum } from './enum/seat.category.enum';
import { Seat } from './seat.entity';
import { Price } from './price.enity';
export declare class SeatCategory extends Model<SeatCategory> {
    id: string;
    name: SeatCategoryEnum;
    seats: Seat[];
    createdAt: Date;
    updatedAt: Date;
    prices: Price[];
}
