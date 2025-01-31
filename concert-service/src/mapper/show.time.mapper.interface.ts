import { IGenericMapper } from './generic.mapper.interface';
import { ShowTime } from '../entity/show.time.entity';
import { ShowTimeDto } from '../dto/show.time.dto';

export interface IShowTimeMapper extends IGenericMapper<ShowTime, ShowTimeDto>{};