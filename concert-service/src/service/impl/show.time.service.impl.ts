import { ShowTimeDto } from 'src/dto/show.time.dto';
import { IShowTimeService } from '../show.time.service.interface';
import { Injectable } from '@nestjs/common';
import { ShowTime } from '../../entity/show.time.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ShowTimeMapper } from '../../mapper/impl/show.time.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
import { ErrorMessage, LoggerFactory, ResourceException } from 'common-lib';

@Injectable()
export class ShowTimeService implements IShowTimeService {
  constructor(
    @InjectModel(ShowTime)
    private readonly showTimeRepository: typeof ShowTime,
    private readonly showTimeMapper: ShowTimeMapper,
    private readonly sequelize: Sequelize,
    private readonly logger: LoggerFactory,
  ) {}

  findAll(): Promise<ShowTimeDto[]> {
    throw new Error('Method not implemented.');
  }

  async save(dto: ShowTimeDto): Promise<ShowTimeDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const showTime = this.showTimeMapper.toEntity(dto);
      // CREATE OPERATION
      if (!dto.id) {
        this.logger.log('Showtime: Executing CREATE operation');
        const createdShowTime = await showTime.save({ transaction });
        const createdShowTimeDto = this.showTimeMapper.toDto(createdShowTime);
        await transaction.commit();
        return createdShowTimeDto;
      }
      // CREATE OPERATION
      // UPDATE OPERATION
      this.logger.log('Showtime: Executing UPDATE operation');
      const updateShowTimeDto = await this.findById(dto.id);
      const updateShowTime = this.showTimeMapper.toEntity(updateShowTimeDto);
      const updatedShowTime = await updateShowTime.update(
        { ...showTime, updatedAt: new Date(Date.now()) },
        { transaction },
      );
      const updatedShowTimeDto = this.showTimeMapper.toDto(updatedShowTime);
      await transaction.commit();
      return updatedShowTimeDto;
      // UPDATE OPERATION
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }

  async findById(id: string): Promise<ShowTimeDto> {
    const concert = await this.showTimeRepository.findOne({
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
    return this.showTimeMapper.toDto(concert);
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
