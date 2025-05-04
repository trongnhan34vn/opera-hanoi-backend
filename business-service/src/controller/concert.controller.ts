import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpResponseFactory, SkipAuth } from 'common';
import { Response } from 'express';
import { Roles } from 'nest-keycloak-connect';
import { ConcertDto } from '../dto/request/concert.dto';
import { Pagination } from '../dto/request/pagination.dto';
import { ConcertService } from '../service/impl/concert.service.impl';
import { KeycloakRoleEnum } from 'src/enum/keycloak.role.enum';

@ApiTags('concerts')
@Controller('/api/v1/business/concerts')
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Get('/upcoming')
  @SkipAuth()
  @ApiResponse({
    status: 200,
    description: 'Get Upcoming Concert',
    // type: [ConcertDto],
    schema: {
      example: {
        message: 'Query concert success. Total 1 (record) (s)',
        code: 'SUC200',
        data: [
          {
            id: '0ab6da17-34d8-4de4-9cf5-a796b4abe11e',
            code: 'CON-2KJIBB',
            title: 'Anh Duy Tồ',
            description: '[String Buffer]',
            status: 'On Sale',
            createdAt: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
            updatedAt: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
            showTimes: [
              {
                startTime: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
                endTime: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
              },
            ],
            artists: [
              {
                name: 'Anh Duy Tồ'
              }
            ],
            directors: [
              {
                name: 'Anh Duy Tồ'
              }
            ],
          },
        ],
      },
    },
  })
  async findUpcomingConcerts(@Res() res: Response, @Query() query: Pagination) {
    const result = await this.concertService.findUpcomingConcerts(query);
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Query concert success. Total ${result.count} (record) (s)`,
      result.rows,
    );
  }

  @Get('/')
  @SkipAuth()
  async findConcertsByCategories(
    @Res() res: Response,
    @Query('categoryId') categoryId: string,
  ) {
    const result = await this.concertService.findByGenreId(categoryId);
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Query concert success. Total ${result.count} (record) (s)`,
      result.concertDtos,
    );
  }

  @Get('/')
  @Roles({ roles: ['ADMIN'] })
  async findAllConcertPagination(
    @Res() res: Response,
    @Query() query: Pagination,
  ) {
    const response = await this.concertService.findAllConcertPagination(query);
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Concerts are founded. Total ${response.items} (record) (s)`,
      response,
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
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Concert found with required showtime. Total ${result.count} (record) (s)`,
      result.concertDtos,
    );
  }

  @Post('/')
  @Roles({roles: [
    KeycloakRoleEnum.PUT_CONCERT_ROLE,
    KeycloakRoleEnum.FULL_ACCESS_CONCERT_ROLE,
    KeycloakRoleEnum.FULL_ACCESS_ROLE
  ]})
  @ApiResponse({
    status: 200,
    description: 'Create Concert',
    // type: [ConcertDto],
  })
  async create(@Res() res: Response, @Body() concertDto: ConcertDto) {
    const concert = await this.concertService.save(concertDto);
    return this.httpResponseFactory.sendCreatedResponse(
      res,
      `Concert created [${concert.id}]`,
      concert,
    );
  }

  @Post('/bulkCreate')
  @SkipAuth()
  async bulkCreate(@Res() res: Response, @Body() concertDtos: ConcertDto[]) {
    for (const concertDto of concertDtos) {
      await this.concertService.save(concertDto);
    }

    return this.httpResponseFactory.sendCreatedResponse(
      res,
      `Concerts created`,
      null,
    );
  }

  @Get('/:id')
  @SkipAuth()
  async findConcertById(@Res() res: Response, @Param('id') id: string) {
    const concert = await this.concertService.findById(id);
    return this.httpResponseFactory.sendOKResponse(
      res,
      'Concert founded',
      concert,
    );
  }
}
