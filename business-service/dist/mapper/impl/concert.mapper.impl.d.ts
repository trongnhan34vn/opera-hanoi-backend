import { LoggerFactory } from 'common';
import { ConcertDto } from 'src/dto/request/concert.dto';
import { Concert } from 'src/entity/concert.entity';
import { GenreService } from 'src/service/impl/genre.service.impl';
import { ConcertMapperInterface } from '../concert.mapper.interface';
import { GenreMapper } from './genre.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
export declare class ConcertMapper implements ConcertMapperInterface {
    private readonly sequelize;
    private readonly logger;
    private readonly genreService;
    private readonly genreMapper;
    constructor(sequelize: Sequelize, logger: LoggerFactory, genreService: GenreService, genreMapper: GenreMapper);
    toEntities(dtos: ConcertDto[]): Concert[] | Promise<Concert[]>;
    private DATE_PATTERN;
    private TIMEZONE;
    toDto(entity: Concert): ConcertDto;
    toEntity(dto: ConcertDto): Promise<Concert>;
    toDtos(entities: Concert[]): ConcertDto[];
    private isShowTimesInPast;
    private isShowTimesOfConcertDuplicated;
}
