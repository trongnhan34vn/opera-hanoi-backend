import { CategoryService } from '../service/impl/category.service.impl';
import { HttpResponseFactory } from 'common-lib';
import { Response } from 'express';
import { CategoryDto } from '../dto/request/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    private readonly httpResponseFactory;
    constructor(categoryService: CategoryService, httpResponseFactory: HttpResponseFactory);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findById(res: Response, categoryId: string): Promise<Response<any, Record<string, any>>>;
    save(res: Response, categoryDto: CategoryDto): Promise<Response<any, Record<string, any>>>;
}
