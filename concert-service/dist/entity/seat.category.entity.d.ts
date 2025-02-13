import { Model } from 'sequelize-typescript';
import { SeatCategoryName } from './enum/seat.category.enum';
import { Concert } from './concert.entity';
export declare class SeatCategory extends Model<SeatCategory> {
    id: string;
    name: SeatCategoryName;
    createdAt: Date;
    updatedAt: Date;
    concerts: Concert[];
}
