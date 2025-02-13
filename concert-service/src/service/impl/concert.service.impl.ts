import { ConcertDto } from 'src/dto/request/concert.dto';
import { ConcertServiceInterface } from '../concert.service.interface';
import { Injectable } from '@nestjs/common';
import { ConcertRepository } from '../../repository/impl/concert.repository.impl';
import { ConcertMapper } from '../../mapper/impl/concert.mapper.impl';
import { LoggerFactory } from 'common-lib';
import { Category } from '../../entity/category.entity';
import { CategoryService } from './category.service.impl';
import { CategoryMapper } from '../../mapper/impl/category.mapper.impl';
import { Image } from '../../entity/image.entity';
import { ShowTime } from '../../entity/show.time.entity';
import * as moment from 'moment-timezone';
import { ConcertSeatCategory } from '../../entity/sub/concert.seat.category.sub.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConcertSeat } from '../../entity/sub/concert.seat.sub.entity';
import { Seat } from '../../entity/seat.entity';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ConcertService implements ConcertServiceInterface {
  constructor(
    private readonly concertRepository: ConcertRepository,
    private readonly concertMapper: ConcertMapper,
    private readonly categoryService: CategoryService,
    private readonly categoryMapper: CategoryMapper,
    private readonly logger: LoggerFactory,
    private readonly sequelize: Sequelize,
  ) {}

  async create(dto: ConcertDto): Promise<ConcertDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const concert = await this.concertMapper.toEntity(dto);
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
      const showTimes: ShowTime[] = [];
      const stringShowTimes = dto.showTimes;
      for (const stringShowTime of stringShowTimes) {
        const showTime = new ShowTime();
        showTime.id = uuidV4();
        showTime.concertId = concert.id;
        showTime.startTime = moment(
          stringShowTime.startTime,
          'YYYY/MM/DD HH:mm:ss',
        )
          .tz('Asia/Ho_Chi_Minh')
          .toDate();
        showTime.endTime = moment(stringShowTime.endTime, 'YYYY/MM/DD HH:mm:ss')
          .tz('Asia/Ho_Chi_Minh')
          .toDate();
        showTimes.push(showTime);
      }
      concert.showTimes = showTimes;

      this.logger.log('Set show times of concert');
      // set showtime

      const createdConcert = await this.concertRepository.create(concert);

      // set seat category price
      // const concertSeatCategories: ConcertSeatCategory[] = [];
      const seatPrices = dto.seatCategoriesPrice;
      const concertSeatCategories: ConcertSeatCategory[] = [];
      for (const seatPrice of seatPrices) {
        const concertSeatCategory = new ConcertSeatCategory();
        concertSeatCategory.id = uuidV4();
        concertSeatCategory.concertId = concert.id;
        concertSeatCategory.seatCategoryId = seatPrice.seatCategoryId;
        concertSeatCategory.price = seatPrice.price;
        concertSeatCategories.push(concertSeatCategory.get());
      }

      await ConcertSeatCategory.bulkCreate(concertSeatCategories, {
        transaction,
      });
      this.logger.log('Set price of seat categories');
      // set seat category price

      // create concert seat
      const seats = await Seat.findAll();
      const concertSeats: ConcertSeat[] = [];
      for (const seat of seats) {
        const concertSeat = new ConcertSeat();
        concertSeat.id = uuidV4();
        concertSeat.concertId = concert.id;
        concertSeat.seatId = seat.id;
        concertSeats.push(concertSeat.get());
      }

      await ConcertSeat.bulkCreate(concertSeats, { transaction });
      this.logger.log('Set amount of seat of concert');
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

  save(dto: ConcertDto): Promise<ConcertDto> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<ConcertDto[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<ConcertDto> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
