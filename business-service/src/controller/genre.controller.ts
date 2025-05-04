import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';
import { Pagination } from 'src/dto/request/pagination.dto';
import { GenreDto } from '../dto/request/genre.dto';
import { GenreService } from '../service/impl/genre.service.impl';
import { KeycloakRoleEnum } from 'src/enum/keycloak.role.enum';

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
  @Roles({
    roles: [
      KeycloakRoleEnum.FULL_ACCESS_GENRE_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.VIEW_GENRE_ROLE,
    ],
  })
  async findAllPagination(@Res() res: Response, @Query() query: Pagination) {
    const genres = await this.genreService.findAllPagination(query);
    return this.httpResponseFactory.sendOKResponse(
      res,
      'Genres are founded',
      genres,
    );
  }

  @Get('/:genreId')
  @Roles({
    roles: [
      KeycloakRoleEnum.FULL_ACCESS_GENRE_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.VIEW_GENRE_ROLE,
    ],
  })
  async findById(@Res() res: Response, @Param('genreId') genreId: string) {
    const genre = await this.genreService.findById(genreId);
    return this.httpResponseFactory.sendOKResponse(res, 'Genre founded', genre);
  }

  @Post('/')
  @Roles({
    roles: [
      KeycloakRoleEnum.FULL_ACCESS_GENRE_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.PUT_GENRE_ROLE,
    ],
  })
  async save(@Res() res: Response, @Body() genreDto: GenreDto) {
    const genre = await this.genreService.save(genreDto);
    return this.httpResponseFactory.sendCreatedResponse(
      res,
      'Genre saved',
      genre,
    );
  }

  @Delete('/:genreId')
  @Roles({
    roles: [
      KeycloakRoleEnum.DELETE_GENRE_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_GENRE_ROLE,
    ],
  })
  async delete(@Res() res: Response, @Param('genreId') genreId: string) {
    await this.genreService.remove(genreId);
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Genre ${genreId} is removed`,
      null,
    );
  }

  @Put()
  @Roles({
    roles: [
      KeycloakRoleEnum.FULL_ACCESS_GENRE_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.PUT_GENRE_ROLE,
    ],
  })
  async update(@Res() res: Response, @Body() genreDto: GenreDto) {
    const updatedGenre = await this.genreService.save(genreDto);
    return this.httpResponseFactory.sendOKResponse(
      res,
      `Genre [${updatedGenre.id}] is updated`,
      updatedGenre,
    );
  }
}
