import { Model } from 'sequelize-typescript';
import { SeatStatusName } from '../enum/seat.status.enum';
export declare class ConcertSeat extends Model<ConcertSeat> {
    id: string;
    concertId: string;
    seatId: string;
    status: SeatStatusName;
    createdAt: Date;
    updatedAt: Date;
}
