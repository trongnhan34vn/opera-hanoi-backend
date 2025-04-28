import { ISeatCategoryRepository } from '../seat.category.repository.interface';
import { Transaction } from 'sequelize';
import { SeatCategory } from 'src/entity/seat.category';
export declare class SeatCategoryRepository implements ISeatCategoryRepository {
    private readonly seatCategoryModel;
    constructor(seatCategoryModel: typeof SeatCategory);
    create(entity: SeatCategory, transaction?: Transaction): Promise<SeatCategory>;
    update(entity: SeatCategory, transaction?: Transaction): Promise<SeatCategory>;
    findById(id: string): Promise<SeatCategory>;
    remove(id: string): Promise<void>;
    findAll(): Promise<SeatCategory[]>;
}
