import { IGenericService } from './generic.service.interface';
import { CategoryDto } from '../dto/category.dto';

export interface ICategoryService extends IGenericService<CategoryDto> {}