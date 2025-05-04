import { Transaction } from "sequelize"

export interface IGenericRepository<E> {
    findAll(): Promise<E[]>
    create(entity: E, transaction: Transaction): Promise<E>
    update(entity: E, transaction: Transaction): Promise<E>
    findById(id: string): Promise<E>
    remove(id: string): Promise<void>
}