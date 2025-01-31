import { IGenericMapper } from './generic.mapper.interface';
import { Concert } from '../entity/concert.entity';
import { ConcertDto } from '../dto/concert.dto';

export interface IConcertMapper extends IGenericMapper<Concert, ConcertDto> {}