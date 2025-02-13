import { CategoryDto } from 'src/dto/request/category.dto';
import { CategoryServiceInterface } from '../category.service.interface';
import { CategoryRepository } from '../../repository/impl/category.repository.impl';
import { LoggerFactory } from 'common-lib';
import { CategoryMapper } from '../../mapper/impl/category.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
export declare class CategoryService implements CategoryServiceInterface {
    private readonly categoryRepository;
    private readonly logger;
    private readonly categoryMapper;
    private readonly sequelize;
    constructor(categoryRepository: CategoryRepository, logger: LoggerFactory, categoryMapper: CategoryMapper, sequelize: Sequelize);
    save(dto: CategoryDto): Promise<CategoryDto>;
    findAll(): Promise<CategoryDto[]>;
    findById(id: string): Promise<CategoryDto>;
    remove(id: string): Promise<void>;
}
