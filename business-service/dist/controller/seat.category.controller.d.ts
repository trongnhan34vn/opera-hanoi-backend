import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { ISeatCategoryService } from 'src/service/seat.category.service.interface';
export declare class SeatCategoryController {
    private readonly seatCategoryService;
    private readonly httpResponseFactory;
    constructor(seatCategoryService: ISeatCategoryService, httpResponseFactory: HttpResponseFactory);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
