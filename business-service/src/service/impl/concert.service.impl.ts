import { Injectable } from '@nestjs/common';
import { LoggerFactory } from 'common';
import * as moment from 'moment-timezone';
import { Sequelize } from 'sequelize-typescript';
import { ConcertDto } from 'src/dto/request/concert.dto';
import { Pagination } from '../../dto/request/pagination.dto';
import { ShowtimeDto } from '../../dto/request/showtime.dto';
import { Concert } from '../../entity/concert.entity';
// import { ConcertSeat } from '../../entity/sub/concert.seat.sub.entity';
import { ConcertMapper } from '../../mapper/impl/concert.mapper.impl';
import { ConcertRepository } from '../../repository/impl/concert.repository.impl';
import { ConcertServiceInterface } from '../concert.service.interface';

@Injectable()
export class ConcertService implements ConcertServiceInterface {
  private DATE_PATTERN = 'YYYY/MM/DD HH:mm:ss';
  private TIMEZONE = 'Asia/Ho_Chi_Minh';

  constructor(
    private readonly concertRepository: ConcertRepository,
    private readonly concertMapper: ConcertMapper,
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
      const concert = await this.concertMapper.toEntity(dto);
      this.logger.log('Start create operation...');
      // CREATE OPERATION
      // // set genres
      // const genreIds = dto.genres;
      // const genres: Genre[] = [];
      // for (const genreId of genreIds) {
      //   const genreDto = await this.genreService.findById(genreId);
      //   const genre = this.genreMapper.toEntity(genreDto);
      //   genres.push(genre);
      // }

      // concert.genres = genres;
      // this.logger.log('Set genre of concert');
      // // set genres

      // // set images
      // const imageUrls = dto.images;
      // const images: Image[] = [];
      // for (const stringUrl of imageUrls) {
      //   const image = new Image();
      //   image.id = uuidV4();
      //   image.concertId = concert.id;
      //   image.url = stringUrl;
      //   image.concert = concert;
      //   images.push(image);
      // }
      // concert.images = images;
      // this.logger.log('Set images of concert');
      // // set images

      // // set showtime
      // // throw exception if showtime in the past
      // const isShowTimesInPast = this.isShowTimesInPast(dto.showTimes);
      // if (isShowTimesInPast) {
      //   throw new BadRequestException(
      //     'Show times is invalid. Show times cannot be in the past',
      //   );
      // }

      // const showTimes: ShowTime[] = [];
      // const stringShowTimes = dto.showTimes;
      // for (const stringShowTime of stringShowTimes) {
      //   const showTime = new ShowTime();
      //   showTime.id = uuidV4();
      //   showTime.concertId = concert.id;
      //   showTime.startTime = moment(stringShowTime.startTime, this.DATE_PATTERN)
      //     .tz(this.TIMEZONE)
      //     .toDate();
      //   showTime.endTime = moment(stringShowTime.endTime, this.DATE_PATTERN)
      //     .tz(this.TIMEZONE)
      //     .toDate();
      //   showTimes.push(showTime);
      // }
      // const isConcertDuplicated = await this.isShowTimesOfConcertDuplicated(
      //   dto.showTimes,
      // );
      // // throw exception if show times are conflict
      // if (isConcertDuplicated) {
      //   throw new ConflictException('Time slot conflict');
      // }

      // concert.showTimes = showTimes;
      // this.logger.log('Set show times of concert');
      // // set showtime

      const createdConcert = await this.concertRepository.create(
        concert,
        transaction,
      );

      // // create concert seat
      // const seats = await Seat.findAll({ include: [SeatCategory] }); // find all seat
      // const concertSeats: ConcertSeat[] = [];
      // for (const seat of seats) {
      //   if (!seat.seatCategory) {
      //     throw new InternalServerException(
      //       'Error occurred. Seat category of seat is null',
      //     );
      //   }
      //   const concertSeat = new ConcertSeat();
      //   concertSeat.id = uuidV4();
      //   concertSeat.concertId = createdConcert.id;
      //   concertSeat.seatId = seat.id;
      //   concertSeats.push(concertSeat.get());
      // }

      // await ConcertSeat.bulkCreate(concertSeats, { transaction });
      // // create concert seat

      // // identify price
      // const priceDtos: PriceDto[] = dto.prices;
      // const prices: Price[] = [];
      // for (const priceDto of priceDtos) {
      //   const price = new Price();
      //   price.id = uuidV4();
      //   price.concertId = createdConcert.id;
      //   price.seatCategoryId = priceDto.seatCategoryId;
      //   price.price = priceDto.priceValue;
      //   prices.push(price.get());
      // }

      // await Price.bulkCreate(prices, { transaction });
      // // identify price

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
