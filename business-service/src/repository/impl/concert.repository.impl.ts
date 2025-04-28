import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerFactory, NotFoundException } from 'common';
import * as moment from 'moment-timezone';
import { Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PaginationResponse } from 'src/dto/response/pagination.response.dto';
import { Artist } from 'src/entity/artist.entity';
import { Concert } from 'src/entity/concert.entity';
import { Director } from 'src/entity/director.entity';
import { Price } from 'src/entity/price.enity';
import { Pagination } from '../../dto/request/pagination.dto';
import { Genre } from '../../entity/genre.entity';
import { Image } from '../../entity/image.entity';
import { ShowTime } from '../../entity/show.time.entity';
import { ConcertRepositoryInterface } from '../concert.repository.interface';

@Injectable()
export class ConcertRepository implements ConcertRepositoryInterface {
  constructor(
    @InjectModel(Concert)
    private readonly concertModel: typeof Concert,
  ) {}

  async create(entity: Concert, transaction?: Transaction): Promise<Concert> {
    const createdConcert = await entity.save({ transaction });
    // create images and show time
    const imageCreations = entity.images.map((image) => image.get());
    const artistCreations = entity.artists.map((artist) => artist.get());
    const directorCreations = entity.directors.map((director) =>
      director.get(),
    );

    const showTimeCreations = entity.showTimes.map((showTime) =>
      showTime.get(),
    );

    const priceCreations = entity.prices.map((price) => price.get());

    await Artist.bulkCreate(artistCreations, { transaction });
    await Director.bulkCreate(directorCreations, { transaction });
    await Image.bulkCreate(imageCreations, { transaction });
    await ShowTime.bulkCreate(showTimeCreations, { transaction });
    await Price.bulkCreate(priceCreations, { transaction });
    // create images and show time

    // assign relations to concert
    await createdConcert.$add('artists', entity.artists, { transaction });
    await createdConcert.$add('directors', entity.directors, { transaction });
    await createdConcert.$add('images', entity.images, { transaction });
    await createdConcert.$add('showTimes', entity.showTimes, { transaction });
    await createdConcert.$add('prices', entity.prices, { transaction });

    await createdConcert.$add('genres', entity.genres, { transaction });
    await createdConcert.$add('seats', entity.seats, { transaction });
    return createdConcert;
  }

  async update(entity: Concert, transaction?: Transaction): Promise<Concert> {
    return await entity.update(
      { ...entity, updatedAt: new Date(Date.now()) },
      { transaction },
    );
  }

  async findById(id: string): Promise<Concert> {
    const concert = await this.concertModel.findOne({ where: { id } });
    if (!concert)
      throw new NotFoundException(`Concert not found with id [${id}]`);
    return concert;
  }

  /**
   * Find concerts have show times within 2 weeks
   * @param page
   */
  async findByShowTimeWithInTwoWeeks(page: Pagination) {
    const limit = page.size ?? 2;
    const currentPage = page.page ?? 1;

    const offset = (currentPage - 1) * limit;

    // const total = await this.sequelize.query(
    //   'select *\n' + 'from count_concerts_within_2_weeks();',
    //   { raw: true, type: QueryTypes.SELECT },
    // );

    const result = await this.concertModel.findAndCountAll({
      include: [
        {
          model: ShowTime,
          where: {
            startTime: {
              [Op.between]: [
                moment().tz('Asia/Ho_Chi_Minh').format(),
                moment()
                  .tz('Asia/Ho_Chi_Minh')
                  .clone()
                  .add(2, 'weeks')
                  .format(),
              ],
            },
          },
          attributes: ['startTime', 'endTime'],
        },
        {
          model: Artist,
          attributes: ['name'],
        },
        {
          model: Director,
          attributes: ['name'],
        },
      ],
      limit: limit,
      offset: offset,
    });

    // if (total.length <= 0) {
    //   throw new NotFoundException('Count record errors');
    // }

    // const concerts: Concert[] = await this.sequelize.query(
    //   'Select * from get_concerts_within_2_weeks(?, ?)',
    //   {
    //     replacements: [limit, offset],
    //     raw: true,
    //     type: QueryTypes.SELECT,
    //   },
    // );

    return result;
  }

  /**
   * Find concerts by genre id
   * @param genreId
   */
  async findByGenreId(genreId: string) {
    return await Concert.findAndCountAll({
      include: [
        {
          model: Genre,
          where: { id: genreId },
          required: true,
        },
        {
          model: Image,
          attributes: ['url'],
        },
        {
          model: ShowTime,
          attributes: ['startTime', 'endTime'],
        },
      ],
      distinct: true,
    });
  }

  /**
   * Find concerts by showtime
   * @param startStringTime
   * @param endStringTime
   */
  async findByShowTime(startStringTime: string, endStringTime: string) {
    const TIMEZONE = 'Asia/Ho_Chi_Minh';
    const TIME_PATTERN = 'yyyy/MM/dd HH:mm:ss';
    const startTime = moment(startStringTime, TIME_PATTERN)
      .tz(TIMEZONE)
      .toDate();
    const endTime = moment(endStringTime, TIME_PATTERN).tz(TIMEZONE).toDate();

    return await Concert.findAndCountAll({
      include: [
        {
          model: ShowTime,
          where: {
            startTime: {
              [Op.between]: [startTime, endTime],
            },
          },
          required: true,
        },
        {
          model: Image,
          attributes: ['url'],
        },
      ],
      distinct: true,
    });
  }

  /**
   * Find concerts with pagination
   * @param pagination
   * @returns
   */
  async findAllConcertPagination(
    pagination: Pagination,
  ): Promise<PaginationResponse<Concert>> {
    const page = pagination.page ?? 1;
    const size = pagination.size ?? 5;
    const sortBy = pagination.sortBy ?? 'id';
    const orderBy = pagination.orderBy ?? 'ASC';
    const offset = (page - 1) * size;
    const limit = size;
    const { count, rows } = await this.concertModel.findAndCountAll({
      include: [
        {
          model: ShowTime,
          attributes: ['startTime', 'endTime'],
        },
        {
          model: Artist,
          attributes: ['name'],
        },
        {
          model: Director,
          attributes: ['name'],
        },
      ],
      limit,
      offset,
      order: [[sortBy, orderBy]],
    });
    return {
      items: count,
      pages: Math.ceil(count / size),
      currentPage: page,
      data: rows,
    };
  }

  async remove(id: string): Promise<void> {
    const concert = await this.findById(id);
    await concert.destroy();
  }

  async findAll(): Promise<Concert[]> {
    return await this.concertModel.findAll();
  }
}
