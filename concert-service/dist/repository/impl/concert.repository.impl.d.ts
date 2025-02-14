import { Concert } from 'src/entity/concert.entity';
import { ConcertRepositoryInterface } from '../concert.repository.interface';
import { LoggerFactory } from 'common-lib';
import { Transaction } from 'sequelize';
export declare class ConcertRepository implements ConcertRepositoryInterface {
    private readonly concertModel;
    private readonly logger;
    constructor(concertModel: typeof Concert, logger: LoggerFactory);
    create(entity: Concert, transaction?: Transaction): Promise<Concert>;
    update(entity: Concert, transaction?: Transaction): Promise<Concert>;
    findById(id: string): Promise<Concert>;
    remove(id: string): Promise<void>;
    findAll(): Promise<Concert[]>;
}
