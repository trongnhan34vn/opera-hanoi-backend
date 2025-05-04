/**
 * Generic Mapper E: entity, T: dto
 */
export interface GenericMapper<E, T> {
    toDto(e: E): T;
    toEntity(t: T): E;
  }
  