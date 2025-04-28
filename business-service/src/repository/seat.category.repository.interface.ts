import { SeatCategory } from 'src/entity/seat.category';
import { GenericRepositoryInterface } from './generic.repository.interface';

export interface ISeatCategoryRepository
  extends GenericRepositoryInterface<SeatCategory> {}
