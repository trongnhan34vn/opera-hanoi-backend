import { Transaction } from 'sequelize';
import { Seat } from 'src/entity/seat.entity';
import { SeatRepositoryInterface } from '../seat.repository.interface';
export declare class SeatRepository implements SeatRepositoryInterface {
    private readonly seatModel;
    constructor(seatModel: typeof Seat);
    create(entity: Seat, transaction?: Transaction): Promise<Seat>;
    update(entity: Seat, transaction?: Transaction): Promise<Seat>;
    findById(id: string): Promise<Seat>;
    remove(id: string): Promise<void>;
    findAll(): Promise<Seat[]>;
}
