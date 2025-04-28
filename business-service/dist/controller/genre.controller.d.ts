import { GenreService } from '../service/impl/genre.service.impl';
import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { GenreDto } from '../dto/request/genre.dto';
import { Pagination } from 'src/dto/request/pagination.dto';
export declare class GenreController {
    private readonly genreService;
    private readonly httpResponseFactory;
    constructor(genreService: GenreService, httpResponseFactory: HttpResponseFactory);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findAllPagination(res: Response, query: Pagination): Promise<Response<any, Record<string, any>>>;
    findById(res: Response, genreId: string): Promise<Response<any, Record<string, any>>>;
    save(res: Response, genreDto: GenreDto): Promise<Response<any, Record<string, any>>>;
    delete(res: Response, genreId: string): Promise<Response<any, Record<string, any>>>;
    update(res: Response, genreDto: GenreDto): Promise<Response<any, Record<string, any>>>;
}
