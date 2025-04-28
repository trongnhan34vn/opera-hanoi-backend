import { GenreDto } from 'src/dto/request/genre.dto';
import { GenreServiceInterface } from '../genre.service.interface';
import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../../repository/impl/genre.repository.impl';
import { LoggerFactory } from 'common';
import { GenreMapper } from '../../mapper/impl/genre.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
import { Pagination } from 'src/dto/request/pagination.dto';
import { PaginationResponse } from 'src/dto/response/pagination.response.dto';

@Injectable()
export class GenreService implements GenreServiceInterface {
  constructor(
    private readonly genreRepository: GenreRepository,
    private readonly logger: LoggerFactory,
    private readonly genreMapper: GenreMapper,
    private readonly sequelize: Sequelize,
  ) {}

  async save(dto: GenreDto): Promise<GenreDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const genre = this.genreMapper.toEntity(dto);

      if (!dto.id) {
        this.logger.log('Start create operation...');
        const createdgenre = await this.genreRepository.create(
          genre,
          transaction,
        );
        await transaction.commit();
        const createdgenreDto = this.genreMapper.toDto(createdgenre);
        this.logger.log(`genre created [${createdgenre.id}]`);
        return createdgenreDto;
      }
      this.logger.log('Start update operation...');

      const updatedgenre = await this.genreRepository.update(
        genre,
        transaction,
      );

      const updatedgenreDto = this.genreMapper.toDto(updatedgenre);
      this.logger.log(`genre updated [${updatedgenre.id}]`);
      await transaction.commit();
      return updatedgenreDto;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAllPagination(
    pagination: Pagination,
  ): Promise<PaginationResponse<GenreDto>> {
    return await this.genreRepository.findAllPagination(pagination);
  }

  async findAll(): Promise<GenreDto[]> {
    return await this.genreRepository.findAll();
  }

  async findById(id: string): Promise<GenreDto> {
    return await this.genreRepository.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.genreRepository.remove(id);
  }
}
