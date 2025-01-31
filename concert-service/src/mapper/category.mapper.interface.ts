import { IGenericMapper } from './generic.mapper.interface';
import { Category } from '../entity/category.entity';
import { CategoryDto } from '../dto/category.dto';

export interface ICategoryMapper extends IGenericMapper<Category, CategoryDto> {}