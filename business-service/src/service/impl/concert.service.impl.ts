import { Injectable } from '@nestjs/common';
import { LoggerFactory } from 'common';
import { Sequelize } from 'sequelize-typescript';
import { ConcertDto } from 'src/dto/request/concert.dto';
import { Pagination } from '../../dto/request/pagination.dto';
// import { ConcertSeat } from '../../entity/sub/concert.seat.sub.entity';
import { ConcertMapper } from '../../mapper/impl/concert.mapper.impl';
import { ConcertRepository } from '../../repository/impl/concert.repository.impl';
import { ConcertServiceInterface } from '../concert.service.interface';

@Injectable()
export class ConcertService implements ConcertServiceInterface {
  constructor(
    private readonly concertRepository: ConcertRepository,
    private readonly concertMapper: ConcertMapper,
    private readonly logger: LoggerFactory,
    private readonly sequelize: Sequelize,
  ) {}

  /**
   * Find concerts that will take place within the next 2 weeks
   * @param page
   */
  async findUpcomingConcerts(page: Pagination) {
    try {
      const result =
        await this.concertRepository.findByShowTimeWithInTwoWeeks(page);

      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Find concert by specified genre
   * @param genreId
   */
  async findByGenreId(genreId: string) {
    try {
      const result = await this.concertRepository.findByGenreId(genreId);
      const concerts = result.rows;
      const concertDtos = this.concertMapper.toDtos(concerts);
      this.logger.log('Concert founded');
      return { ...result, concertDtos };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Find concerts by schedule of showtime
   * @param startStringTime
   * @param endStringTime
   */
  async findByShowTimes(startStringTime: string, endStringTime: string) {
    try {
      const result = await this.concertRepository.findByShowTime(
        startStringTime,
        endStringTime,
      );
      const concertDtos = this.concertMapper.toDtos(result.rows);
      this.logger.log('Concert founded');
      return { ...result, concertDtos };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAllConcertPagination(page: Pagination) {
    return await this.concertRepository.findAllConcertPagination(page);
  }

  async save(dto: ConcertDto): Promise<ConcertDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const concert = await this.concertMapper.toEntity(dto);
      // CREATE OPERATION
      if (!dto.id) {
        this.logger.log('Start create operation');

        const createdConcert = await this.concertRepository.create(
          concert,
          transaction,
        );

        await transaction.commit();
        this.logger.log(`Concert created [${createdConcert.id}]`);
        return this.concertMapper.toDto(createdConcert);
      }
      // CREATE OPERATION

      // UPDATE OPERATION
      this.logger.log('Start update operation');
      const updatedConcert = await this.concertRepository.update(
        concert,
        transaction,
      );
      this.logger.log(`Concert updated [${updatedConcert.id}]`);
      return this.concertMapper.toDto(updatedConcert);
      // UPDATE OPERATION
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }

  findAll(): Promise<ConcertDto[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<ConcertDto> {
    try {
      const concert = await this.concertRepository.findById(id);
      return this.concertMapper.toDto(concert);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
