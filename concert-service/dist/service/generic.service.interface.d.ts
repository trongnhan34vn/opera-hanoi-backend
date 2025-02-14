export interface GenericServiceInterface<T> {
    save(dto: T): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    remove(id: string): Promise<void>;
}
