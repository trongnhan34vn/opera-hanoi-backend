export interface IGenericMapper<E, T> {
  toDto(entity: E): T | Promise<T>;
  toEntity(dto: T): E | Promise<E>;
}