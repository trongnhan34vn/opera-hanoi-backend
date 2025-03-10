import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
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

@Controller('/api/v1/business/concerts')
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Get('/upcoming')
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

  @Get('/')
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
      result.concertDtos,
    );
  }

  @Get('/schedule')
  @SkipAuth()
  async findConcertsByShowTime(
    @Res() res: Response,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    const result = await this.concertService.findByShowTimes(
      startTime,
      endTime,
    );
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      `Concert found with required showtime. Total ${result.count} (record) (s)`,
      result.concertDtos,
    );
  }

  @Get('/:id')
  @SkipAuth()
  async findConcertById(@Res() res: Response, @Param('id') id: string) {
    const concert = await this.concertService.findById(id);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      'Concert founded',
      concert,
    );
  }

  @Post('/')
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

  @Post('/bulkCreate')
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
