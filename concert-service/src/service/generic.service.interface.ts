export interface IGenericService<T> {
  findAll(): Promise<T[]>;
  save(dto: T): Promise<T>;
  findById(id: string): Promise<T>;
  delete(id: string): Promise<void>;
}
