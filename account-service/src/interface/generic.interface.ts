export interface GenericService<T> {
  findAll: () => Promise<T[]>;
  save: (data: T) => Promise<T>;
  findById: (id: string) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

/**
 * Generic Mapper E: entity, T: dto
 */
export interface GenericMapper<E, T> {
  toDto(e: E): T;
  toEntity(t: T): E;
}
