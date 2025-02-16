import { ConcertDto } from 'src/dto/request/concert.dto';
import { ConcertServiceInterface } from '../concert.service.interface';
import { ConcertRepository } from '../../repository/impl/concert.repository.impl';
import { ConcertMapper } from '../../mapper/impl/concert.mapper.impl';
import { LoggerFactory } from 'common-lib';
import { CategoryService } from './category.service.impl';
import { CategoryMapper } from '../../mapper/impl/category.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
import { Concert } from '../../entity/concert.entity';
import { Pagination } from '../../dto/request/pagination.dto';
export declare class ConcertService implements ConcertServiceInterface {
    private readonly concertRepository;
    private readonly concertMapper;
    private readonly categoryService;
    private readonly categoryMapper;
    private readonly logger;
    private readonly sequelize;
    private DATE_PATTERN;
    private TIMEZONE;
    constructor(concertRepository: ConcertRepository, concertMapper: ConcertMapper, categoryService: CategoryService, categoryMapper: CategoryMapper, logger: LoggerFactory, sequelize: Sequelize);
    create(dto: ConcertDto): Promise<ConcertDto>;
    private isShowTimesInPast;
    private isShowTimesOfConcertDuplicated;
    findUpcomingConcerts(page: Pagination): Promise<{
        dtoConcerts: ConcertDto[];
        total: number;
        page: number;
        concerts: Concert[];
    }>;
    findByCategoryId(categoryId: string): Promise<{
        dtoConcerts: ConcertDto[];
        rows: Concert[];
        count: number;
    }>;
    save(dto: ConcertDto): Promise<ConcertDto>;
    findAll(): Promise<ConcertDto[]>;
    findById(id: string): Promise<ConcertDto>;
    remove(id: string): Promise<void>;
}
