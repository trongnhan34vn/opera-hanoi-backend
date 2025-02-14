import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CategoryService } from '../service/impl/category.service.impl';
import { HttpResponseFactory, SuccessMessage } from 'common-lib';
import { Response } from 'express';

import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';
import { CategoryDto } from '../dto/request/category.dto';

@Controller('/api/v1/concert')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}
  @Get('/categories')
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

  @Get('/categories/:categoryId')
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

  @Post('/categories')
  @SkipAuth()
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
}
