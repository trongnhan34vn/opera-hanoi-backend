import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../service/impl/category.service.impl';
import { HttpResponseFactory, SuccessMessage } from 'common-lib';
import { Response } from 'express';
import { CategoryDto } from '../dto/request/category.dto';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';

@Controller('/api/v1/business/categories')
@UseGuards(AuthGuard, RoleGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Get('/')
  async findAll(@Res() res: Response) {
    const categories = await this.categoryService.findAll();
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      'Categories are founded',
      categories,
    );
  }

  @Get('/:categoryId')
  @Roles({ roles: ['ADMIN'] })
  async findById(
    @Res() res: Response,
    @Param('categoryId') categoryId: string,
  ) {
    const category = await this.categoryService.findById(categoryId);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      'Category founded',
      category,
    );
  }

  @Post('/')
  @Roles({ roles: ['ADMIN'] })
  async save(@Res() res: Response, @Body() categoryDto: CategoryDto) {
    const category = await this.categoryService.save(categoryDto);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.CREATED,
      SuccessMessage.CREATED.getCode,
      'Category saved',
      category,
    );
  }

  @Delete('/:categoryId')
  @Roles({ roles: ['ADMIN'] })
  async delete(@Res() res: Response, @Param('categoryId') categoryId: string) {
    await this.categoryService.remove(categoryId);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      `Category ${categoryId} is removed`,
      null,
    );
  }

  @Put()
  @Roles({ roles: ['ADMIN'] })
  async update(@Res() res: Response, @Body() categoryDto: CategoryDto) {
    const updateCategory = await this.categoryService.save(categoryDto);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      `Category [${updateCategory.id}] is updated`,
      updateCategory,
    );
  }
}
