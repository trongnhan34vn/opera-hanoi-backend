import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException, ResourceException } from 'common';
import { Transaction } from 'sequelize';
import { Pagination } from 'src/dto/request/pagination.dto';
import { PaginationResponse } from 'src/dto/response/pagination.response.dto';
import { Genre } from 'src/entity/genre.entity';
import { GenreRepositoryInterface } from '../genre.repository.interface';

@Injectable()
export class GenreRepository implements GenreRepositoryInterface {
  constructor(
    @InjectModel(Genre)
    private readonly genreModel: typeof Genre,
  ) {}

  async findAll(): Promise<Genre[]> {
    return await this.genreModel.findAll();
  }

  async create(entity: Genre, transaction?: Transaction): Promise<Genre> {
    return await entity.save({ transaction });
  }

  async update(entity: Genre, transaction?: Transaction): Promise<Genre> {
    const updateEntity = await this.findById(entity.get().id);
    updateEntity.isNewRecord = false;
    return await updateEntity.update(
      { ...entity.get(), updatedAt: new Date(Date.now()) },
      { transaction },
    );
  }

  async findAllPagination(pagination: Pagination): Promise<PaginationResponse<Genre>> {    
    const page = pagination.page ?? 1;
    const size = pagination.size ?? 5;
    const sortBy = pagination.sortBy ?? 'id';
    const orderBy = pagination.orderBy ?? 'ASC';
    const offset = (page - 1) * size;
    const limit = size;

    const { count, rows } = await this.genreModel.findAndCountAll({
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

  async findById(id: string): Promise<Genre> {
    const Genre = await this.genreModel.findOne({ where: { id } });
    if (!Genre)
      throw new NotFoundException(
        `Genre not found with id [${id}]`,
      );
    return Genre;
  }

  async remove(id: string): Promise<void> {
    const Genre = await this.findById(id);
    await Genre.destroy();
  }
}
