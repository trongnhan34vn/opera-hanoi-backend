import { Concert } from 'src/entity/concert.entity';
import { ConcertRepositoryInterface } from '../concert.repository.interface';
import { Injectable } from '@nestjs/common';
import { ErrorMessage, LoggerFactory, ResourceException } from 'common-lib';
import { InjectModel } from '@nestjs/sequelize';
import { Op, QueryTypes, Transaction } from 'sequelize';
import { Image } from '../../entity/image.entity';
import { ShowTime } from '../../entity/show.time.entity';
import { Pagination } from '../../dto/request/pagination.dto';
import { Sequelize } from 'sequelize-typescript';
import { Category } from '../../entity/category.entity';
import moment from 'moment-timezone';

@Injectable()
export class ConcertRepository implements ConcertRepositoryInterface {
  constructor(
    @InjectModel(Concert)
    private readonly concertModel: typeof Concert,
    private readonly logger: LoggerFactory,
    private readonly sequelize: Sequelize,
  ) {}

  async create(entity: Concert, transaction?: Transaction): Promise<Concert> {
    const createdConcert = await entity.save({ transaction });
    // create images and show time
    const imageCreations = entity.images.map((image) => image.get());
    await Image.bulkCreate(imageCreations, { transaction });

    const showTimeCreations = entity.showTimes.map((showTime) =>
      showTime.get(),
    );
    await ShowTime.bulkCreate(showTimeCreations, { transaction });
    // create images and show time

    // assign relations to concert
    await createdConcert.$add('images', entity.images, { transaction });
    await createdConcert.$add('categories', entity.categories, { transaction });
    await createdConcert.$add('showTimes', entity.showTimes, { transaction });
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
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Concert not found with id [${id}]`,
      );
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

    const total = await this.sequelize.query(
      'select *\n' + 'from count_concerts_within_2_weeks();',
      { raw: true, type: QueryTypes.SELECT },
    );

    if (total.length <= 0) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        'Count record errors',
      );
    }

    const concerts: Concert[] = await this.sequelize.query(
      'Select * from get_concerts_within_2_weeks(?, ?)',
      {
        replacements: [limit, offset],
        raw: true,
        type: QueryTypes.SELECT,
      },
    );

    return {
      total: total[0]['count_concerts_within_2_weeks'] as number,
      page: currentPage,
      concerts,
    };
  }

  /**
   * Find concerts by category id
   * @param categoryId
   */
  async findByCategoryId(categoryId: string) {
    return await Concert.findAndCountAll({
      include: [
        {
          model: Category,
          where: { id: categoryId },
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

  async remove(id: string): Promise<void> {
    const concert = await this.findById(id);
    await concert.destroy();
  }

  async findAll(): Promise<Concert[]> {
    return await this.concertModel.findAll();
  }
}
