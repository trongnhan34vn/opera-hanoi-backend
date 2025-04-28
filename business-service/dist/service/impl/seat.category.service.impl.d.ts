import { SeatCategoryDto } from 'src/dto/request/seat.category.dto';
import { ISeatCategoryMapper } from 'src/mapper/seat.category.mapper.interface';
import { ISeatCategoryRepository } from 'src/repository/seat.category.repository.interface';
import { ISeatCategoryService } from '../seat.category.service.interface';
export declare class SeatCategoryService implements ISeatCategoryService {
    private readonly seatCategoryRepository;
    private readonly seatCategoryMapper;
    constructor(seatCategoryRepository: ISeatCategoryRepository, seatCategoryMapper: ISeatCategoryMapper);
    findAll(): Promise<SeatCategoryDto[]>;
    findById(id: string): Promise<SeatCategoryDto>;
    remove(id: string): Promise<void>;
    save(dto: SeatCategoryDto): Promise<SeatCategoryDto>;
}
