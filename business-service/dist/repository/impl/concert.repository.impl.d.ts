import { Transaction } from 'sequelize';
import { PaginationResponse } from 'src/dto/response/pagination.response.dto';
import { Concert } from 'src/entity/concert.entity';
import { Pagination } from '../../dto/request/pagination.dto';
import { ConcertRepositoryInterface } from '../concert.repository.interface';
export declare class ConcertRepository implements ConcertRepositoryInterface {
    private readonly concertModel;
    constructor(concertModel: typeof Concert);
    create(entity: Concert, transaction?: Transaction): Promise<Concert>;
    update(entity: Concert, transaction?: Transaction): Promise<Concert>;
    findById(id: string): Promise<Concert>;
    findByShowTimeWithInTwoWeeks(page: Pagination): Promise<{
        rows: Concert[];
        count: number;
    }>;
    findByGenreId(genreId: string): Promise<{
        rows: Concert[];
        count: number;
    }>;
    findByShowTime(startStringTime: string, endStringTime: string): Promise<{
        rows: Concert[];
        count: number;
    }>;
    findAllConcertPagination(pagination: Pagination): Promise<PaginationResponse<Concert>>;
    remove(id: string): Promise<void>;
    findAll(): Promise<Concert[]>;
}
