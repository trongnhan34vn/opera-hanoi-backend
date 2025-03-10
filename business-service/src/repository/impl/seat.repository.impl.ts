import { Transaction } from 'sequelize';
import { Seat } from 'src/entity/seat.entity';
import { SeatRepositoryInterface } from '../seat.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorMessage, ResourceException } from 'common-lib';

@Injectable()
export class SeatRepository implements SeatRepositoryInterface {
  constructor(
    @InjectModel(Seat)
    private readonly seatModel: typeof Seat,
  ) {}

  async create(entity: Seat, transaction?: Transaction): Promise<Seat> {
    return await entity.save({ transaction });
  }

  async update(entity: Seat, transaction?: Transaction): Promise<Seat> {
    return entity.update(
      { ...entity, updatedAt: new Date(Date.now()) },
      { transaction },
    );
  }

  async findById(id: string): Promise<Seat> {
    const seat = await this.seatModel.findOne({ where: { id } });
    if (!seat) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Seat not found with id [${id}]`,
      );
    }
    return seat;
  }

  async remove(id: string): Promise<void> {
    const seat = await this.findById(id);
    await seat.destroy();
  }

  async findAll(): Promise<Seat[]> {
    return await this.seatModel.findAll();
  }
}
