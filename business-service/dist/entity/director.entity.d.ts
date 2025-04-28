import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
export declare class Director extends Model<Director> {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    concert: Concert;
    concertId: string;
}
