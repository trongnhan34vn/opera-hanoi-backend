import { CategoryDto } from 'src/dto/request/category.dto';
import { CategoryServiceInterface } from '../category.service.interface';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repository/impl/category.repository.impl';
import { LoggerFactory } from 'common-lib';
import { CategoryMapper } from '../../mapper/impl/category.mapper.impl';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly logger: LoggerFactory,
    private readonly categoryMapper: CategoryMapper,
    private readonly sequelize: Sequelize,
  ) {}

  async save(dto: CategoryDto): Promise<CategoryDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const category = this.categoryMapper.toEntity(dto);
      if (!dto.id) {
        const createdCategory = await this.categoryRepository.create(
          category,
          transaction,
        );
        await transaction.commit();
        return createdCategory;
      }
      const updatedCategory = await this.categoryRepository.update(
        category,
        transaction,
      );
      await transaction.commit();
      return updatedCategory;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAll(): Promise<CategoryDto[]> {
    return await this.categoryRepository.findAll();
  }

  async findById(id: string): Promise<CategoryDto> {
    return await this.categoryRepository.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.remove(id);
  }
}
