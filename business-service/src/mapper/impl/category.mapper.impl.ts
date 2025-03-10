import { CategoryDto } from 'src/dto/request/category.dto';
import { Category } from 'src/entity/category.entity';
import { CategoryMapperInterface } from '../category.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CodeGenerator } from 'common-lib';
import { CodeEntitiesEnum } from '../../entity/enum/code.entities.enum';

@Injectable()
export class CategoryMapper implements CategoryMapperInterface {
  toDto(entity: Category): CategoryDto {
    const categoryDto = new CategoryDto();
    categoryDto.id = entity.id;
    categoryDto.code = entity.code;
    categoryDto.description = entity.description;
    categoryDto.title = entity.title;
    return categoryDto;
  }

  toEntity(dto: CategoryDto): Category {
    const category = new Category();
    category.id = dto.id ? dto.id : uuid();
    category.title = dto.title;
    category.code = CodeGenerator.generateCode(
      CodeEntitiesEnum.CATEGORY,
      category.id,
    );
    category.description = dto.description;
    return category;
  }
}
