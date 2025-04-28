import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { Roles } from 'nest-keycloak-connect';
import { ISeatCateogoryServiceToken } from 'src/constants/symbol';
import { ISeatCategoryService } from 'src/service/seat.category.service.interface';

@ApiTags('seat-categories')
@Controller('/api/v1/business/seat-categories')
export class SeatCategoryController {
  constructor(
    @Inject(ISeatCateogoryServiceToken)
    private readonly seatCategoryService: ISeatCategoryService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Get('/')
  @Roles({ roles: ['ADMIN'] })
  async findAll(@Res() res: Response) {
    const seatCategories = await this.seatCategoryService.findAll();
    return this.httpResponseFactory.sendOKResponse(
      res,
      'Seat Categories are founded',
      seatCategories,
    );
  }
}
