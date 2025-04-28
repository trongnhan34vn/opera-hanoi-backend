import { Model } from 'sequelize-typescript';
import { Room } from './room.entity';
import { Zone } from './zone.entity';
export declare class Floor extends Model<Floor> {
    id: string;
    label: string;
    createdAt: Date;
    updatedAt: Date;
    room: Room;
    zones: Zone[];
    roomId: string;
}
