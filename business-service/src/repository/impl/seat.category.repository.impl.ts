import { Injectable } from '@nestjs/common';
import { ISeatCategoryRepository } from '../seat.category.repository.interface';
import { Transaction } from 'sequelize';
import { SeatCategory } from 'src/entity/seat.category';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SeatCategoryRepository implements ISeatCategoryRepository {
  constructor(
    @InjectModel(SeatCategory)
    private readonly seatCategoryModel: typeof SeatCategory,
  ) {}
  create(
    entity: SeatCategory,
    transaction?: Transaction,
  ): Promise<SeatCategory> {
    throw new Error('Method not implemented.');
  }
  update(
    entity: SeatCategory,
    transaction?: Transaction,
  ): Promise<SeatCategory> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<SeatCategory> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<SeatCategory[]> {
    return await this.seatCategoryModel.findAll({
        attributes: ['id', 'name']
    });
  }
}
