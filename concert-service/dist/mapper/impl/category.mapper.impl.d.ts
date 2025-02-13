import { CategoryDto } from 'src/dto/request/category.dto';
import { Category } from 'src/entity/category.entity';
import { CategoryMapperInterface } from '../category.mapper.interface';
export declare class CategoryMapper implements CategoryMapperInterface {
    toDto(entity: Category): CategoryDto;
    toEntity(dto: CategoryDto): Category;
}
