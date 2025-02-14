export interface GenericMapperInterface<T, E> {
    toDto(entity: E): T | Promise<T>;
    toEntity(dto: T): E | Promise<E>;
}
