import { GenericServiceInterface } from './generic.service.interface';
import { ConcertDto } from '../dto/request/concert.dto';
export interface ConcertServiceInterface extends GenericServiceInterface<ConcertDto> {
    create(dto: ConcertDto): Promise<ConcertDto>;
}
