import { Model } from 'sequelize-typescript';
export declare class ConcertSeatCategory extends Model<ConcertSeatCategory> {
    id: string;
    concertId: string;
    seatCategoryId: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
