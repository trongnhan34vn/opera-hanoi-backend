import { ConcertDto } from 'src/dto/request/concert.dto';
import { Concert } from 'src/entity/concert.entity';
import { ConcertMapperInterface } from '../concert.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CategoryService } from '../../service/impl/category.service.impl';

@Injectable()
export class ConcertMapper implements ConcertMapperInterface {
  constructor(private readonly categoryService: CategoryService) {}

  toDto(entity: Concert): ConcertDto | Promise<ConcertDto> {
    const concertDto = new ConcertDto();
    concertDto.id = entity.id;
    concertDto.art = entity.art;
    concertDto.title = entity.title;
    concertDto.director = entity.director;
    concertDto.description = entity.description;
    return concertDto;
  }

  toEntity(dto: ConcertDto): Concert | Promise<Concert> {
    const concert = new Concert();
    concert.id = dto.id ? dto.id : uuidV4();
    concert.art = dto.art;
    concert.director = dto.director;
    concert.title = dto.title;
    concert.description = dto.description;
    return concert;
  }
}
