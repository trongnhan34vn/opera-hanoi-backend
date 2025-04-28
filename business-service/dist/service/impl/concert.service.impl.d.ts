import { LoggerFactory } from 'common';
import { Sequelize } from 'sequelize-typescript';
import { ConcertDto } from 'src/dto/request/concert.dto';
import { Pagination } from '../../dto/request/pagination.dto';
import { Concert } from '../../entity/concert.entity';
import { ConcertMapper } from '../../mapper/impl/concert.mapper.impl';
import { ConcertRepository } from '../../repository/impl/concert.repository.impl';
import { ConcertServiceInterface } from '../concert.service.interface';
export declare class ConcertService implements ConcertServiceInterface {
    private readonly concertRepository;
    private readonly concertMapper;
    private readonly logger;
    private readonly sequelize;
    private DATE_PATTERN;
    private TIMEZONE;
    constructor(concertRepository: ConcertRepository, concertMapper: ConcertMapper, logger: LoggerFactory, sequelize: Sequelize);
    create(dto: ConcertDto): Promise<ConcertDto>;
    private isShowTimesInPast;
    private isShowTimesOfConcertDuplicated;
    findUpcomingConcerts(page: Pagination): Promise<{
        rows: Concert[];
        count: number;
    }>;
    findByGenreId(genreId: string): Promise<{
        concertDtos: ConcertDto[];
        rows: Concert[];
        count: number;
    }>;
    findByShowTimes(startStringTime: string, endStringTime: string): Promise<{
        concertDtos: ConcertDto[];
        rows: Concert[];
        count: number;
    }>;
    findAllConcertPagination(page: Pagination): Promise<import("../../dto/response/pagination.response.dto").PaginationResponse<Concert>>;
    save(dto: ConcertDto): Promise<ConcertDto>;
    findAll(): Promise<ConcertDto[]>;
    findById(id: string): Promise<ConcertDto>;
    remove(id: string): Promise<void>;
}
