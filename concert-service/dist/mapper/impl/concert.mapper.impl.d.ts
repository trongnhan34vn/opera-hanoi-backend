import { ConcertDto } from 'src/dto/request/concert.dto';
import { Concert } from 'src/entity/concert.entity';
import { ConcertMapperInterface } from '../concert.mapper.interface';
import { CategoryService } from '../../service/impl/category.service.impl';
export declare class ConcertMapper implements ConcertMapperInterface {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    toDto(entity: Concert): ConcertDto | Promise<ConcertDto>;
    toEntity(dto: ConcertDto): Concert | Promise<Concert>;
}
