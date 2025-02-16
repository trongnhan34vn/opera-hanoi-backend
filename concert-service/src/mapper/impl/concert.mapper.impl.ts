import { ConcertDto } from 'src/dto/request/concert.dto';
import { Concert } from 'src/entity/concert.entity';
import { ConcertMapperInterface } from '../concert.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CategoryService } from '../../service/impl/category.service.impl';
import { ShowtimeDto } from '../../dto/request/showtime.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class ConcertMapper implements ConcertMapperInterface {
  constructor() {}

  toDto(entity: Concert): ConcertDto {
    const concertDto = new ConcertDto();
    concertDto.id = entity.id;
    concertDto.art = entity.art;
    concertDto.title = entity.title;
    concertDto.director = entity.director;
    concertDto.description = entity.description;

    if (entity.images) {
      const dtoImages: string[] = [];
      for (const image of entity.images) {
        const imageDto = image.url;
        dtoImages.push(imageDto);
      }
      concertDto.images = dtoImages;
    }

    if (entity.showTimes) {
      const dtoShowTime: ShowtimeDto[] = [];
      const showTimes = entity.showTimes;
      for (const showTime of showTimes) {
        const startTime = showTime.startTime;
        const endTime = showTime.endTime;
        const showTimeDto = new ShowtimeDto();
        showTimeDto.startTime = moment(startTime).format('YYYY/MM/DD HH:ss:mm');
        showTimeDto.endTime = moment(endTime).format('YYYY/MM/DD HH:ss:mm');
        dtoShowTime.push(showTimeDto);
      }
      concertDto.showTimes = dtoShowTime;
    }
    return concertDto;
  }

  toEntity(dto: ConcertDto): Concert {
    const concert = new Concert();
    concert.id = dto.id ? dto.id : uuidV4();
    concert.art = dto.art;
    concert.director = dto.director;
    concert.title = dto.title;
    concert.description = dto.description;
    return concert;
  }
}
