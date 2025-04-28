import { GenreDto } from 'src/dto/request/genre.dto';
import { Genre } from 'src/entity/genre.entity';
import { GenreMapperInterface } from '../genre.mapper.interface';
export declare class GenreMapper implements GenreMapperInterface {
    toDtos(entities: Genre[]): GenreDto[] | Promise<GenreDto[]>;
    toEntities(dtos: GenreDto[]): Genre[] | Promise<Genre[]>;
    toDto(entity: Genre): GenreDto;
    toEntity(dto: GenreDto): Genre;
}
