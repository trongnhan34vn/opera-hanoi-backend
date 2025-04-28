import { Model } from 'sequelize-typescript';
import { Seat } from './seat.entity';
import { Floor } from './floor.entity';
export declare class Zone extends Model<Zone> {
    id: string;
    label: string;
    createdAt: Date;
    updatedAt: Date;
    floor: Floor;
    seats: Seat[];
    floorId: string;
}
