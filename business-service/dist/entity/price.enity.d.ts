import { Model } from 'sequelize-typescript';
export declare class Price extends Model<Price> {
    id: string;
    concertId: string;
    seatCategoryId: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
