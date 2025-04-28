import { Transaction } from 'sequelize';
import { Pagination } from 'src/dto/request/pagination.dto';
import { PaginationResponse } from 'src/dto/response/pagination.response.dto';
import { Genre } from 'src/entity/genre.entity';
import { GenreRepositoryInterface } from '../genre.repository.interface';
export declare class GenreRepository implements GenreRepositoryInterface {
    private readonly genreModel;
    constructor(genreModel: typeof Genre);
    findAll(): Promise<Genre[]>;
    create(entity: Genre, transaction?: Transaction): Promise<Genre>;
    update(entity: Genre, transaction?: Transaction): Promise<Genre>;
    findAllPagination(pagination: Pagination): Promise<PaginationResponse<Genre>>;
    findById(id: string): Promise<Genre>;
    remove(id: string): Promise<void>;
}
