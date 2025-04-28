import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from '../service/impl/genre.service.impl';
import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { GenreDto } from '../dto/request/genre.dto';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';
import { Pagination } from 'src/dto/request/pagination.dto';

@Controller('/api/v1/business/genres')
@UseGuards(AuthGuard, RoleGuard)
export class GenreController {
  constructor(
    private readonly genreService: GenreService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Get('/')
  async findAll(@Res() res: Response) {
    const genres = await this.genreService.findAll();
    return this.httpResponseFactory.sendOKResponse(
      res,
      'Genres are founded',
      genres,
    );
  }

  @Get('/page')
  @Roles({ roles: ['ADMIN'] })
  async findAllPagination(@Res() res: Response, @Query() query: Pagination) {
    const genres = await this.genreService.findAllPagination(query);
    return this.httpResponseFactory.sendOKResponse(
      res,
      'Genres are founded',
      genres,
    );
  }

  @Get('/:genreId')
  @Roles({ roles: ['ADMIN'] })
  async findById(
    @Res() res: Response,
    @Param('genreId') genreId: string,
  ) {
    const genre = await this.genreService.findById(genreId);
    return this.httpResponseFactory.sendOKResponse(
      res,
      'Genre founded',
      genre,
    );
  }

  @Post('/')
  @Roles({ roles: ['ADMIN'] })
  async save(@Res() res: Response, @Body() genreDto: GenreDto) {
    const genre = await this.genreService.save(genreDto);
    return this.httpResponseFactory.sendCreatedResponse(
      res,
      'Genre saved',
      genre,
    );
  }

  @Delete('/:genreId')
  @Roles({ roles: ['ADMIN'] })
  async delete(@Res() res: Response, @Param('genreId') genreId: string) {
    await this.genreService.remove(genreId);
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Genre ${genreId} is removed`,
      null,
    );
  }

  @Put()
  @Roles({ roles: ['ADMIN'] })
  async update(@Res() res: Response, @Body() genreDto: GenreDto) {
    const updatedGenre = await this.genreService.save(genreDto);
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Genre [${updatedGenre.id}] is updated`,
      updatedGenre,
    );
  }


}
