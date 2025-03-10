import { GenericMapperInterface } from './generic.mapper';
import { ConcertDto } from '../dto/request/concert.dto';
import { Concert } from '../entity/concert.entity';
import { Pagination } from '../dto/request/pagination.dto';

export interface ConcertMapperInterface
  extends GenericMapperInterface<ConcertDto, Concert> {

}
