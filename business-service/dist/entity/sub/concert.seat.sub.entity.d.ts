import { Model } from 'sequelize-typescript';
import { SeatStatusEnum } from '../enum/seat.status.enum';
export declare class ConcertSeat extends Model<ConcertSeat> {
    id: string;
    concertId: string;
    seatId: number;
    status: SeatStatusEnum;
    createdAt: Date;
    updatedAt: Date;
}
