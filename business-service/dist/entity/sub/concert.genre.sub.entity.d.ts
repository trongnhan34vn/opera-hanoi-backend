import { Model } from 'sequelize-typescript';
export declare class ConcertGenre extends Model<ConcertGenre> {
    concertId: string;
    genreId: string;
    createdAt: Date;
    updatedAt: Date;
}
