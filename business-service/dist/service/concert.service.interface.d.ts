import { GenericServiceInterface } from './generic.service.interface';
import { ConcertDto } from '../dto/request/concert.dto';
import { Pagination } from '../dto/request/pagination.dto';
export interface ConcertServiceInterface extends GenericServiceInterface<ConcertDto> {
    create(dto: ConcertDto): Promise<ConcertDto>;
    findUpcomingConcerts(page: Pagination): Promise<any>;
    findByGenreId(genreId: string): Promise<any>;
    findByShowTimes(startStringTime: string, endStringTime: string): Promise<any>;
}
