import { Model } from 'sequelize-typescript';
import { Concert } from './concert.entity';
export declare class Category extends Model<Category> {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    concerts: Concert[];
}
