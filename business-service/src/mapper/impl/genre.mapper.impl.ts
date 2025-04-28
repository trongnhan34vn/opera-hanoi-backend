import { GenreDto } from 'src/dto/request/genre.dto';
import { Genre } from 'src/entity/genre.entity';
import { GenreMapperInterface } from '../genre.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CodeGenerator } from 'common';
import { CodeEntitiesEnum } from '../../entity/enum/code.entities.enum';

@Injectable()
export class GenreMapper implements GenreMapperInterface {
  toDtos(entities: Genre[]): GenreDto[] | Promise<GenreDto[]> {
    throw new Error('Method not implemented.');
  }
  toEntities(dtos: GenreDto[]): Genre[] | Promise<Genre[]> {
    throw new Error('Method not implemented.');
  }
  toDto(entity: Genre): GenreDto {
    const categoryDto = new GenreDto();
    categoryDto.id = entity.id;
    categoryDto.code = entity.code;
    categoryDto.description = entity.description;
    categoryDto.title = entity.title;
    return categoryDto;
  }

  toEntity(dto: GenreDto): Genre {
    const category = new Genre();
    category.id = dto.id ? dto.id : uuid();
    category.title = dto.title;
    category.code = CodeGenerator.generateCode(
      CodeEntitiesEnum.GENRE,
      category.id,
    );
    category.description = dto.description;
    return category;
  }
}
