import { ConcertDto } from 'src/dto/request/concert.dto';
import { Concert } from 'src/entity/concert.entity';
import { ConcertMapperInterface } from '../concert.mapper.interface';
export declare class ConcertMapper implements ConcertMapperInterface {
    constructor();
    toDto(entity: Concert): ConcertDto;
    toEntity(dto: ConcertDto): Concert;
}
