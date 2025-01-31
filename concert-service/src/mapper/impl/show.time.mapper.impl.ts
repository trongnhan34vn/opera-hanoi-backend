import { ShowTimeDto } from 'src/dto/show.time.dto';
import { ShowTime } from 'src/entity/show.time.entity';
import { IShowTimeMapper } from '../show.time.mapper.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment-timezone';

@Injectable()
export class ShowTimeMapper implements IShowTimeMapper {
  toDto(entity: ShowTime): ShowTimeDto {
    const showTimeDto = new ShowTimeDto();
    showTimeDto.id = entity.id;
    showTimeDto.dateTime = entity.dateTime.toString();
    showTimeDto.concertId = entity.concertId;
    return showTimeDto;
  }

  toEntity(dto: ShowTimeDto): ShowTime {
    const showTime = new ShowTime();
    showTime.id = dto.id ? dto.id : uuidv4();
    showTime.concertId = dto.concertId;
    showTime.dateTime = moment(showTime.dateTime)
      .tz('Asia/Ho_Chi_Minh')
      .toDate();
    return showTime;
  }
}
