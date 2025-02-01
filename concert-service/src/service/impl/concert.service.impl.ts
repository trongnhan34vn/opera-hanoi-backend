import { Concert } from 'src/entity/concert.entity';
import { IConcertService } from '../concert.service.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConcertMapper } from '../../mapper/impl/concert.mapper.impl';
import { ErrorMessage, LoggerFactory, ResourceException } from 'common-lib';
import { ConcertDto } from '../../dto/concert.dto';
import { Sequelize } from 'sequelize-typescript';
import { Pagination } from '../../dto/pagination.dto';

@Injectable()
export class ConcertService implements IConcertService {
  constructor(
    @InjectModel(Concert)
    private readonly concertRepository: typeof Concert,
    private readonly concertMapper: ConcertMapper,
    private readonly sequelize: Sequelize,
    private readonly logger: LoggerFactory,
  ) {}

  /**
   * find all concert
   */
  async findAll(): Promise<ConcertDto[]> {
    const concerts = await this.concertRepository.findAll();
    if (concerts.length === 0) {
      this.logger.warn(`No records found in ${this.concertRepository.name}`);
    }
    const concertDtos: ConcertDto[] = [];
    concerts.forEach((concert) => {
      const concertDto = this.concertMapper.toDto(concert);
      concertDtos.push(concertDto);
    });
    return concertDtos;
  }

  /**
   * find concert with pagination
   * @param pagination
   */
  async findAllPagination(pagination: Pagination) {
    const { page, size, sortBy, orderBy } = pagination;
    const limit = size ?? 5;
    const offset = (page ?? 0) * (size ?? 5);
    const { rows, count } = await this.concertRepository.findAndCountAll({
      limit,
      offset,
      order: [[sortBy ?? 'id', orderBy]],
    });

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / (size ?? 5)),
      currentPage: page,
    };
  }

  /**
   * save concert
   * @param dto
   * @return concert
   */
  async save(dto: ConcertDto): Promise<ConcertDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const concert = await this.concertMapper.toEntity(dto);
      // CREATE OPERATION
      if (!dto.id) {
        this.logger.log('Concert: Executing CREATE operation');
        const createdConcert = await concert.save({ transaction });
        await concert.$add('categories', concert.categories, { transaction });
        // create showtime
        for (const showTime of concert.showTimes) {
          await showTime.save({ transaction });
        }
        // create showtime
        await concert.$add('showTimes', concert.showTimes, { transaction });
        const createConcertDto = this.concertMapper.toDto(createdConcert);
        await transaction.commit();
        return createConcertDto;
      }
      // CREATE OPERATION
      // UPDATE OPERATION
      this.logger.log('Concert: Executing UPDATE operation');
      const updateConcertDto = await this.findById(dto.id);
      const updateConcert = await this.concertMapper.toEntity(updateConcertDto);
      const updatedConcert = await updateConcert.update(
        {
          ...concert,
          updatedAt: new Date(Date.now()),
        },
        { where: { id: dto.id } },
      );
      const updatedConcertDto = this.concertMapper.toDto(updatedConcert);
      await transaction.commit();
      return updatedConcertDto;
      // UPDATE OPERATION
    } catch (error) {
      this.logger.error(error);
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * check concert is existed
   * @param id
   */
  async isExistedById(id: string) {
    try {
      const concert = await this.findById(id);
      if (concert) return true;
      return false;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  /**
   * find concert by id
   * @param id
   * @return concert
   */
  async findById(id: string): Promise<ConcertDto> {
    const concert = await this.concertRepository.findOne({
      include: [],
      where: {
        id,
      },
    });
    if (!concert) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Concert not found with id [${id}]`,
      );
    }
    return this.concertMapper.toDto(concert);
  }

  /**
   * delete by ID
   * @param id
   */
  async delete(id: string): Promise<void> {
    const concert = await this.concertRepository.findOne({
      where: { id },
    });
    if (!concert) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Concert not found with id [${id}]`,
      );
    }
    await concert.destroy();
  }
}
