import { CategoryDto } from 'src/dto/category.dto';
import { ICategoryService } from '../category.service.interface';
import { Injectable } from '@nestjs/common';
import { Category } from '../../entity/category.entity';
import { ErrorMessage, LoggerFactory, ResourceException } from 'common-lib';
import { CategoryMapper } from '../../mapper/impl/category.mapper.impl';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepository: typeof Category,
    private readonly logger: LoggerFactory,
    private readonly categoryMapper: CategoryMapper,
    private readonly sequelize: Sequelize,
  ) {}

  /**
   * find all category
   */
  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.findAll();
    if (categories.length === 0) {
      this.logger.warn(`No records found in ${this.categoryRepository.name}`);
    }
    const categoriesDto: CategoryDto[] = [];
    categories.forEach((category) => {
      const categoryDto = this.categoryMapper.toDto(category);
      categoriesDto.push(categoryDto);
    });
    return categoriesDto;
  }

  /**
   * find category by title
   * @param title
   * @return category
   */
  async findCategoryByTitle(title: string) {
    const category = await this.categoryRepository.findOne({
      where: { title },
    });
    if (!category) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Category not found with title [${title}]`,
      );
    }
    return this.categoryMapper.toDto(category);
  }

  /**
   * check existed category by title
   * @param title
   */
  isExistedCategoryByTitle = async (title: string) => {
    try {
      const category = await this.findCategoryByTitle(title);
      if (!category) return false;
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * save category
   * @param dto
   * @return created/updated
   */
  async save(dto: CategoryDto): Promise<CategoryDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const showTime = this.categoryMapper.toEntity(dto);
      // CREATE OPERATION
      if (!dto.id) {
        this.logger.log('Category: Executing CREATE operation');
        const createdShowTime = await showTime.save({ transaction });
        const createdShowTimeDto = this.categoryMapper.toDto(createdShowTime);
        await transaction.commit();
        return createdShowTimeDto;
      }
      // CREATE OPERATION
      // UPDATE OPERATION
      this.logger.log('Category: Executing UPDATE operation');
      const updateShowTimeDto = await this.findById(dto.id);
      const updateShowTime = this.categoryMapper.toEntity(updateShowTimeDto);
      const updatedShowTime = await updateShowTime.update(
        { ...showTime, updatedAt: new Date(Date.now()) },
        { transaction },
      );
      const updatedShowTimeDto = this.categoryMapper.toDto(updatedShowTime);
      await transaction.commit();
      return updatedShowTimeDto;
      // UPDATE OPERATION
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * find category by Id
   * @param id
   * @return category
   */
  async findById(id: string): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    // check existed
    if (!category) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Category not found with id [${id}]`,
      );
    }
    return this.categoryMapper.toDto(category);
  }

  /**
   * delete category by id
   * @param id
   */
  async delete(id: string): Promise<void> {
    const removeCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!removeCategory) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `Category not found with id [${id}]`,
      );
    }
    await removeCategory.destroy();
  }
}
