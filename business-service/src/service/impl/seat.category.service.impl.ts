import { Inject, Injectable } from '@nestjs/common';
import { ISeatCategoryMapperToken, ISeatCategoryRepositoryToken } from 'src/constants/symbol';
import { SeatCategoryDto } from 'src/dto/request/seat.category.dto';
import { ISeatCategoryMapper } from 'src/mapper/seat.category.mapper.interface';
import { ISeatCategoryRepository } from 'src/repository/seat.category.repository.interface';
import { ISeatCategoryService } from '../seat.category.service.interface';


@Injectable()
export class SeatCategoryService implements ISeatCategoryService {
  constructor(
    @Inject(ISeatCategoryRepositoryToken)
    private readonly seatCategoryRepository: ISeatCategoryRepository,

    @Inject(ISeatCategoryMapperToken)
    private readonly seatCategoryMapper: ISeatCategoryMapper,
  ) {}
  async findAll(): Promise<SeatCategoryDto[]> {
    const seatCategories = await this.seatCategoryRepository.findAll();
    return this.seatCategoryMapper.toDtos(seatCategories);
  }
  findById(id: string): Promise<SeatCategoryDto> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  save(dto: SeatCategoryDto): Promise<SeatCategoryDto> {
    throw new Error('Method not implemented.');
  }
}
