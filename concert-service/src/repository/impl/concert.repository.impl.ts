import { Concert } from 'src/entity/concert.entity';
import { ConcertRepositoryInterface } from '../concert.repository.interface';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ErrorMessage, LoggerFactory, ResourceException } from 'common-lib';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Image } from '../../entity/image.entity';
import { ShowTime } from '../../entity/show.time.entity';

@Injectable()
export class ConcertRepository implements ConcertRepositoryInterface {
  constructor(
    @InjectModel(Concert)
    private readonly concertModel: typeof Concert,
    private readonly logger: LoggerFactory,
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

  async remove(id: string): Promise<void> {
    const concert = await this.findById(id);
    await concert.destroy();
  }

  async findAll(): Promise<Concert[]> {
    return await this.concertModel.findAll();
  }
}
