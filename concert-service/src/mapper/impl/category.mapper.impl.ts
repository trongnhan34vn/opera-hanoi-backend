import { CategoryDto } from 'src/dto/category.dto';
import { Category } from 'src/entity/category.entity';
import { ICategoryMapper } from '../category.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryMapper implements ICategoryMapper {
  toDto = (entity: Category): CategoryDto => {
    const categoryDto = new CategoryDto();
    categoryDto.id = entity.id;
    categoryDto.description = entity.description;
    categoryDto.title = entity.title;
    return categoryDto;
  };

  toEntity = (dto: CategoryDto): Category => {
    const category = new Category();
    const uuid = uuidv4();

    category.set('id', dto.id ? dto.id : uuid);
    category.set('title', dto.title);
    category.set('description', dto.description);
    return category;
  };
}
