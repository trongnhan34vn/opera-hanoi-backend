export interface GenericMapperInterface<T, E> {
  toDto(entity: E): T | Promise<T>;

  toEntity(dto: T): E | Promise<E>;

  toDtos (entities: E[]): T[] | Promise<T[]>
  toEntities (dtos: T[]): E[] | Promise<E[]>
}
