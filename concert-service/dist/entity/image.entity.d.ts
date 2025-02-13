import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
export declare class Image extends Model<Image> {
    id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    concert: Concert;
    concertId: string;
}
