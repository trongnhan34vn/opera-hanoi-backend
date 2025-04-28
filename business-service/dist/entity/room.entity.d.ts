import { Model } from 'sequelize-typescript';
import { Floor } from './floor.entity';
export declare class Room extends Model<Room> {
    id: string;
    label: string;
    floors: Floor[];
    createdAt: Date;
    updatedAt: Date;
}
