import { GenericRepositoryInterface } from './generic.repository.interface';
import { Genre } from '../entity/genre.entity';

export interface GenreRepositoryInterface
  extends GenericRepositoryInterface<Genre> {}
