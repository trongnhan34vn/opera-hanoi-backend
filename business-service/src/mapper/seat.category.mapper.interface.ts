import { SeatCategoryDto } from 'src/dto/request/seat.category.dto';
import { GenericMapperInterface } from './generic.mapper';
import { SeatCategory } from 'src/entity/seat.category';

export interface ISeatCategoryMapper
  extends GenericMapperInterface<SeatCategoryDto, SeatCategory> {
    toDtos(entities: SeatCategory[]): SeatCategoryDto[]
  }
