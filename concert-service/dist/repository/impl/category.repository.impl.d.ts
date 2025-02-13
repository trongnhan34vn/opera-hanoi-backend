import { Category } from 'src/entity/category.entity';
import { CategoryRepositoryInterface } from '../category.repository.interface';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
export declare class CategoryRepository implements CategoryRepositoryInterface {
    private readonly category;
    private readonly sequelize;
    constructor(category: typeof Category, sequelize: Sequelize);
    findAll(): Promise<Category[]>;
    create(entity: Category, transaction?: Transaction): Promise<Category>;
    update(entity: Category, transaction?: Transaction): Promise<Category>;
    findById(id: string): Promise<Category>;
    remove(id: string): Promise<void>;
}
