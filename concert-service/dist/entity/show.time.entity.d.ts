import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
export declare class ShowTime extends Model<ShowTime> {
    id: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    concert: Concert;
    concertId: string;
}
