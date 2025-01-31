import { ConcertDto } from 'src/dto/concert.dto';
import { Concert } from 'src/entity/concert.entity';
import { IConcertMapper } from '../concert.mapper.interface';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CategoryService } from '../../service/impl/category.service.impl';
import { Category } from '../../entity/category.entity';
import { CategoryMapper } from './category.mapper.impl';
import { ShowTime } from '../../entity/show.time.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class ConcertMapper implements IConcertMapper {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  toDto = (entity: Concert): ConcertDto => {
    const concertDto = new ConcertDto();
    concertDto.id = entity.id;
    concertDto.title = entity.title;
    concertDto.art = entity.art;
    concertDto.director = entity.director;
    concertDto.description = entity.description;
    concertDto.duration = entity.duration;
    concertDto.isActive = entity.isActive;
    concertDto.price = entity.price;
    // set categories
    const categoriesOfConcertDto: string[] = [];
    entity.categories.forEach((category) => {
      categoriesOfConcertDto.push(category.id);
    });
    concertDto.categories = categoriesOfConcertDto;
    // set show_times
    const showTimesOfConcertDto: string[] = [];
    entity.showTimes.forEach((showTime) => {
      showTimesOfConcertDto.push(showTime.id);
    });
    concertDto.showTimes = showTimesOfConcertDto;
    return concertDto;
  };

  toEntity = async (dto: ConcertDto): Promise<Concert> => {
    const concert = new Concert();
    concert.set('id', dto.id ? dto.id : uuidv4());
    concert.set('title', dto.title);
    concert.set('description', dto.description);
    concert.set('director', dto.director);
    if (dto.art) {
      concert.set('art', dto.art);
    }
    concert.set('duration', dto.duration);
    concert.set('price', dto.price);
    if (dto.isActive) {
      concert.set('isActive', dto.isActive);
    }
    // set categories
    const categoryIdsOfDto = dto.categories;
    const categories: Category[] = [];
    for (const stringCategoryId of categoryIdsOfDto) {
      const categoryDto = await this.categoryService.findById(stringCategoryId);
      const category = this.categoryMapper.toEntity(categoryDto);
      categories.push(category);
    }
    concert.categories = categories;

    // set categories
    // set show time
    const showTimesOfDto = dto.showTimes;
    const showTimes: ShowTime[] = [];
    for (const stringTime of showTimesOfDto) {
      const showTime = new ShowTime();
      showTime.set(
        'dateTime',
        moment(stringTime).tz('Asia/Ho_Chi_Minh').toDate(),
      );
      showTime.set('id', uuidv4());
      showTime.set('concertId', concert.id);
      showTimes.push(showTime);
    }
    concert.showTimes = showTimes;
    // set show time
    return concert;
  };
}
