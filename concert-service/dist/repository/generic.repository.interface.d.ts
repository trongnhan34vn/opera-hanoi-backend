import { Transaction } from 'sequelize';
export interface GenericRepositoryInterface<T> {
    create(entity: T, transaction?: Transaction): Promise<T>;
    update(entity: T, transaction?: Transaction): Promise<T>;
    findById(id: string): Promise<T>;
    remove(id: string): Promise<void>;
    findAll(): Promise<T[]>;
}
