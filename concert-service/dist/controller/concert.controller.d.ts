import { ConcertService } from '../service/impl/concert.service.impl';
import { HttpResponseFactory } from 'common-lib';
import { ConcertDto } from '../dto/request/concert.dto';
import { Response } from 'express';
export declare class ConcertController {
    private readonly concertService;
    private readonly httpResponseFactory;
    constructor(concertService: ConcertService, httpResponseFactory: HttpResponseFactory);
    save(res: Response, concertDto: ConcertDto): Promise<Response<any, Record<string, any>>>;
}
