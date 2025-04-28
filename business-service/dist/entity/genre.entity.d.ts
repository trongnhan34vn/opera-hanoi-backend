import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
export declare class Genre extends Model<Genre> {
    id: string;
    title: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    concerts: Concert[];
}
