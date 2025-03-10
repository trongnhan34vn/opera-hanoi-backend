import { ConcertService } from '../service/impl/concert.service.impl';
import { HttpResponseFactory } from 'common-lib';
import { ConcertDto } from '../dto/request/concert.dto';
import { Response } from 'express';
import { Pagination } from '../dto/request/pagination.dto';
export declare class ConcertController {
    private readonly concertService;
    private readonly httpResponseFactory;
    constructor(concertService: ConcertService, httpResponseFactory: HttpResponseFactory);
    findUpcomingConcerts(res: Response, query: Pagination): Promise<Response<any, Record<string, any>>>;
    findConcertsByCategories(res: Response, categoryId: string): Promise<Response<any, Record<string, any>>>;
    findConcertsByShowTime(res: Response, startTime: string, endTime: string): Promise<Response<any, Record<string, any>>>;
    findConcertById(res: Response, id: string): Promise<Response<any, Record<string, any>>>;
    create(res: Response, concertDto: ConcertDto): Promise<Response<any, Record<string, any>>>;
    bulkCreate(res: Response, concertDtos: ConcertDto[]): Promise<Response<any, Record<string, any>>>;
}
