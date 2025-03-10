import { GenericMapperInterface } from './generic.mapper';
import { Category } from '../entity/category.entity';
import { CategoryDto } from '../dto/request/category.dto';

export interface CategoryMapperInterface extends GenericMapperInterface<CategoryDto, Category> {}