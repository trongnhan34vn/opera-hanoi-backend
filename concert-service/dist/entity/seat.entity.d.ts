import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
export declare class Seat extends Model<Seat> {
    id: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    concerts: Concert[];
}
