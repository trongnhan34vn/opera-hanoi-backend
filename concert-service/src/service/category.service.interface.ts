import { GenericServiceInterface } from './generic.service.interface';
import { CategoryDto } from '../dto/request/category.dto';

export interface CategoryServiceInterface
  extends GenericServiceInterface<CategoryDto> {}
