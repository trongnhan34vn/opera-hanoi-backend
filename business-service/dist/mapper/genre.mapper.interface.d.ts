import { GenericMapperInterface } from './generic.mapper';
import { Genre } from '../entity/genre.entity';
import { GenreDto } from '../dto/request/genre.dto';
export interface GenreMapperInterface extends GenericMapperInterface<GenreDto, Genre> {
}
