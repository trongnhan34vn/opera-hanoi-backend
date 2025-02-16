import { Concert } from 'src/entity/concert.entity';
import { ConcertRepositoryInterface } from '../concert.repository.interface';
import { LoggerFactory } from 'common-lib';
import { Transaction } from 'sequelize';
import { Pagination } from '../../dto/request/pagination.dto';
import { Sequelize } from 'sequelize-typescript';
export declare class ConcertRepository implements ConcertRepositoryInterface {
    private readonly concertModel;
    private readonly logger;
    private readonly sequelize;
    constructor(concertModel: typeof Concert, logger: LoggerFactory, sequelize: Sequelize);
    create(entity: Concert, transaction?: Transaction): Promise<Concert>;
    update(entity: Concert, transaction?: Transaction): Promise<Concert>;
    findById(id: string): Promise<Concert>;
    findByShowTimeWithInTwoWeeks(page: Pagination): Promise<{
        total: number;
        page: number;
        concerts: Concert[];
    }>;
    findByCategoryId(categoryId: string): Promise<{
        rows: Concert[];
        count: number;
    }>;
    remove(id: string): Promise<void>;
    findAll(): Promise<Concert[]>;
}
