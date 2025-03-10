import { ConcertDto } from 'src/dto/request/concert.dto';
import { ConcertServiceInterface } from '../concert.service.interface';
import { Injectable } from '@nestjs/common';
import { ConcertRepository } from '../../repository/impl/concert.repository.impl';
import { ConcertMapper } from '../../mapper/impl/concert.mapper.impl';
import { ErrorMessage, LoggerFactory, ResourceException } from 'common-lib';
import { Category } from '../../entity/category.entity';
import { CategoryService } from './category.service.impl';
import { CategoryMapper } from '../../mapper/impl/category.mapper.impl';
import { Image } from '../../entity/image.entity';
import { ShowTime } from '../../entity/show.time.entity';
import * as moment from 'moment-timezone';
import { Sequelize } from 'sequelize-typescript';
import { ConcertSeat } from '../../entity/sub/concert.seat.sub.entity';
import { Seat } from '../../entity/seat.entity';
import { v4 as uuidV4 } from 'uuid';
import { ShowtimeDto } from '../../dto/request/showtime.dto';
import { Concert } from '../../entity/concert.entity';
import { Pagination } from '../../dto/request/pagination.dto';
import { SeatCategory } from '../../entity/seat.category.entity';
import { SeatCategoryName } from '../../entity/enum/seat.category.enum';

@Injectable()
export class ConcertService implements ConcertServiceInterface {
  private DATE_PATTERN = 'YYYY/MM/DD HH:mm:ss';
  private TIMEZONE = 'Asia/Ho_Chi_Minh';

  constructor(
    private readonly concertRepository: ConcertRepository,
    private readonly concertMapper: ConcertMapper,
    private readonly categoryService: CategoryService,
    private readonly categoryMapper: CategoryMapper,
    private readonly logger: LoggerFactory,
    private readonly sequelize: Sequelize,
  ) {}

  /**
   * create concert
   * @param dto
   */
  async create(dto: ConcertDto): Promise<ConcertDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const concert = this.concertMapper.toEntity(dto);
      this.logger.log('Start create operation...');
      // CREATE OPERATION
      // set categories
      const categoryIds = dto.categories;
      const categories: Category[] = [];
      for (const categoryId of categoryIds) {
        const categoryDto = await this.categoryService.findById(categoryId);
        const category = this.categoryMapper.toEntity(categoryDto);
        categories.push(category);
      }

      concert.categories = categories;
      this.logger.log('Set categories of concert');
      // set categories

      // set images
      const imageUrls = dto.images;
      const images: Image[] = [];
      for (const stringUrl of imageUrls) {
        const image = new Image();
        image.id = uuidV4();
        image.concertId = concert.id;
        image.url = stringUrl;
        image.concert = concert;
        images.push(image);
      }
      concert.images = images;
      this.logger.log('Set images of concert');
      // set images

      // set showtime
      // throw exception if showtime in the past
      const isShowTimesInPast = this.isShowTimesInPast(dto.showTimes);
      if (isShowTimesInPast) {
        throw new ResourceException(
          ErrorMessage.BAD_REQUEST.getCode,
          ErrorMessage.BAD_REQUEST.getMessage,
          'Show times is invalid. Show times cannot be in the past',
        );
      }

      const showTimes: ShowTime[] = [];
      const stringShowTimes = dto.showTimes;
      for (const stringShowTime of stringShowTimes) {
        const showTime = new ShowTime();
        showTime.id = uuidV4();
        showTime.concertId = concert.id;
        showTime.startTime = moment(stringShowTime.startTime, this.DATE_PATTERN)
          .tz(this.TIMEZONE)
          .toDate();
        showTime.endTime = moment(stringShowTime.endTime, this.DATE_PATTERN)
          .tz(this.TIMEZONE)
          .toDate();
        showTimes.push(showTime);
      }
      const isConcertDuplicated = await this.isShowTimesOfConcertDuplicated(
        dto.showTimes,
      );
      // throw exception if show times are conflict
      if (isConcertDuplicated) {
        throw new ResourceException(
          ErrorMessage.CONFLICT.getCode,
          ErrorMessage.CONFLICT.getMessage,
          'Time slot conflict',
        );
      }

      concert.showTimes = showTimes;
      this.logger.log('Set show times of concert');
      // set showtime

      const createdConcert = await this.concertRepository.create(concert);

      // create concert seat
      const seats = await Seat.findAll({ include: [SeatCategory] });
      const concertSeats: ConcertSeat[] = [];
      for (const seat of seats) {
        if (!seat.seatCategory) {
          throw new ResourceException(
            ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
            ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
            'Error occurred when query seat category of seat',
          );
        }
        const seatCategoryPrice = dto.seatCategoriesPrice.find(
          (scp) => scp.seatCategoryName === seat.seatCategory.name.toString(),
        );

        if (!seatCategoryPrice) {
          throw new ResourceException(
            ErrorMessage.NOT_FOUND.getCode,
            ErrorMessage.NOT_FOUND.getMessage,
            'Error occurred when set price for seat of concert',
          );
        }

        const concertSeat = new ConcertSeat();
        concertSeat.id = uuidV4();
        concertSeat.concertId = concert.id;
        concertSeat.seatId = seat.id;
        concertSeat.price = seatCategoryPrice.price;
        concertSeats.push(concertSeat.get());
      }
      await ConcertSeat.bulkCreate(concertSeats, { transaction });
      this.logger.log('Set the number of seats for the concert');
      // create concert seat

      await transaction.commit();
      this.logger.log(`Concert created id [${createdConcert.id}]`);
      return this.concertMapper.toDto(createdConcert);
      // CREATE OPERATION
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * To check if show times are in the past
   * @param showTimes
   */
  private isShowTimesInPast(showTimes: ShowtimeDto[]) {
    for (const showTime of showTimes) {
      const startTime = moment(showTime.startTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      const momentDate = moment(new Date(Date.now()), this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      if (startTime <= momentDate) {
        return true;
      }
    }
    return false;
  }

  /**
   * To check if a showtime has already been scheduled for another concert
   * @param showTimes
   */
  private async isShowTimesOfConcertDuplicated(
    showTimes: ShowtimeDto[],
  ): Promise<boolean> {
    for (const showTime of showTimes) {
      const startTime = moment(showTime.startTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      const endTime = moment(showTime.endTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      const concerts = await this.sequelize.query(
        `SELECT *
         FROM checkConcertTimeDuplication(?, ?)`,
        {
          replacements: [startTime, endTime],
          model: Concert,
          mapToModel: true,
        },
      );
      if (concerts.length > 0) return true;
    }
    return false;
  }

  /**
   * Find concerts that will take place within the next 2 weeks
   * @param page
   */
  async findUpcomingConcerts(page: Pagination) {
    try {
      const result =
        await this.concertRepository.findByShowTimeWithInTwoWeeks(page);
      const concerts = result.concerts;
      const dtoConcerts: ConcertDto[] = [];
      for (const concert of concerts) {
        const concertDto = this.concertMapper.toDto(concert);
        concertDto.showTimes = (concert['show_times'] as ShowtimeDto[]) ?? [];
        dtoConcerts.push(concertDto);
      }
      return { ...result, dtoConcerts };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Find concert by specified category
   * @param categoryId
   */
  async findByCategoryId(categoryId: string) {
    try {
      const result = await this.concertRepository.findByCategoryId(categoryId);
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

  save(dto: ConcertDto): Promise<ConcertDto> {
    throw new Error('Method not implemented.');
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
