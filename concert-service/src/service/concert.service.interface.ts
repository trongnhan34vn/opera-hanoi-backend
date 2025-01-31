import { IGenericService } from './generic.service.interface';
import { Concert } from '../entity/concert.entity';
import { ConcertDto } from '../dto/concert.dto';

export interface IConcertService extends IGenericService<ConcertDto>{}