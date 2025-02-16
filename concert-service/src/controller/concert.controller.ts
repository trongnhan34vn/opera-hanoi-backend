import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ConcertService } from '../service/impl/concert.service.impl';
import { HttpResponseFactory, SuccessMessage } from 'common-lib';
import { ConcertDto } from '../dto/request/concert.dto';
import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';
import { Response } from 'express';
import { Pagination } from '../dto/request/pagination.dto';

@Controller('/api/v1/concert')
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Get('/concerts/upcoming')
  @SkipAuth()
  async findUpcomingConcerts(@Res() res: Response, @Query() query: Pagination) {
    const result = await this.concertService.findUpcomingConcerts(query);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      `Query concert success. Total ${result.total} (record) (s)`,
      result.dtoConcerts,
    );
  }

  @Get('/concerts')
  @SkipAuth()
  async findConcertsByCategories(
    @Res() res: Response,
    @Query('categoryId') categoryId: string,
  ) {
    const result = await this.concertService.findByCategoryId(categoryId);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      `Query concert success. Total ${result.count} (record) (s)`,
      result.dtoConcerts,
    );
  }

  @Post('/concerts')
  @SkipAuth()
  async create(@Res() res: Response, @Body() concertDto: ConcertDto) {
    const concert = await this.concertService.create(concertDto);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.CREATED,
      SuccessMessage.CREATED.getCode,
      `Concert created [${concert.id}]`,
      concert,
    );
  }

  @Post('/concerts/bulkCreate')
  @SkipAuth()
  async bulkCreate(@Res() res: Response, @Body() concertDtos: ConcertDto[]) {
    for (const concertDto of concertDtos) {
      await this.concertService.create(concertDto);
    }

    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.CREATED,
      SuccessMessage.CREATED.getCode,
      `Concerts created`,
      null,
    );
  }
}
