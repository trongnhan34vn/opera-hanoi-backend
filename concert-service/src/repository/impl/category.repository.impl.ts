import { Category } from 'src/entity/category.entity';
import { CategoryRepositoryInterface } from '../category.repository.interface';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ErrorMessage, ResourceException } from 'common-lib';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(
    @InjectModel(Category)
    private readonly category: typeof Category,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.category.findAll();
  }

  async create(entity: Category, transaction?: Transaction): Promise<Category> {
    return await entity.save({ transaction });
  }

  async update(entity: Category, transaction?: Transaction): Promise<Category> {
    return await entity.update(
      { ...entity, updatedAt: new Date(Date.now()) },
      { transaction },
    );
  }

  async findById(id: string): Promise<Category> {
    const category = await this.category.findOne({ where: { id } });
    if (!category)
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Category not found with id [${id}]`,
      );
    return category;
  }

  async remove(id: string): Promise<void> {
    const category = await this.findById(id);
    await category.destroy();
  }
}
