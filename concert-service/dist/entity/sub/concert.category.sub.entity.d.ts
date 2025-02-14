import { Model } from 'sequelize-typescript';
export declare class ConcertCategory extends Model<ConcertCategory> {
    concertId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}
