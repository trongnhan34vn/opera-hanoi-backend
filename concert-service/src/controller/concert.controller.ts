import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ConcertService } from '../service/impl/concert.service.impl';
import { HttpResponseFactory, SuccessMessage } from 'common-lib';
import { Response } from 'express';
import { ConcertDto } from '../dto/concert.dto';
import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';

@Controller('/api/v1/concert')
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Get('/concerts')
  async findAll(@Res() res: Response) {
    const concerts = await this.concertService.findAll();
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      'Concerts found',
      concerts,
    );
  }

  @Post('/concerts')
  @SkipAuth()
  async save(@Res() res: Response, @Body() concertDto: ConcertDto) {
    const concert = await this.concertService.save(concertDto);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.CREATED,
      SuccessMessage.CREATED.getCode,
      'Concert saved',
      concert,
    );
  }
}
