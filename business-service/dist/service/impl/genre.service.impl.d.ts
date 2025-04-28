import { GenreDto } from 'src/dto/request/genre.dto';
import { GenreServiceInterface } from '../genre.service.interface';
import { GenreRepository } from '../../repository/impl/genre.repository.impl';
import { LoggerFactory } from 'common';
import { GenreMapper } from '../../mapper/impl/genre.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
import { Pagination } from 'src/dto/request/pagination.dto';
import { PaginationResponse } from 'src/dto/response/pagination.response.dto';
export declare class GenreService implements GenreServiceInterface {
    private readonly genreRepository;
    private readonly logger;
    private readonly genreMapper;
    private readonly sequelize;
    constructor(genreRepository: GenreRepository, logger: LoggerFactory, genreMapper: GenreMapper, sequelize: Sequelize);
    save(dto: GenreDto): Promise<GenreDto>;
    findAllPagination(pagination: Pagination): Promise<PaginationResponse<GenreDto>>;
    findAll(): Promise<GenreDto[]>;
    findById(id: string): Promise<GenreDto>;
    remove(id: string): Promise<void>;
}
