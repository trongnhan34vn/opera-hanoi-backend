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

@Controller('/api/v1/concert')
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  // @Get('/concerts')
  // @SkipAuth()
  // async findAllPageable(@Res() res: Response, @Query() query: Pagination) {
  //   const concerts = await this.concertService.findAllPagination(query);
  //   return this.httpResponseFactory.sendSuccessResponse(
  //     res,
  //     HttpStatus.OK,
  //     SuccessMessage.OK.getCode,
  //     `Query concert success. ${concerts.total} (record) (s)`,
  //     concerts,
  //   );
  // }

  @Post('/concerts')
  @SkipAuth()
  async save(@Res() res: Response, @Body() concertDto: ConcertDto) {
    const concert = await this.concertService.create(concertDto);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.CREATED,
      SuccessMessage.CREATED.getCode,
      `Concert created [${concert.id}]`,
      concert,
    );
  }
}
