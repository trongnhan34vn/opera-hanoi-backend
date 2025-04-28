import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  CodeGenerator,
  ConflictException,
  LoggerFactory,
  NotFoundException,
} from 'common';
import * as moment from 'moment-timezone';
import { ConcertDto, PriceDto } from 'src/dto/request/concert.dto';
import { Artist } from 'src/entity/artist.entity';
import { Concert } from 'src/entity/concert.entity';
import { Director } from 'src/entity/director.entity';
import { Genre } from 'src/entity/genre.entity';
import { Image } from 'src/entity/image.entity';
import { Price } from 'src/entity/price.enity';
import { SeatCategory } from 'src/entity/seat.category';
import { Seat } from 'src/entity/seat.entity';
import { ShowTime } from 'src/entity/show.time.entity';
import { GenreService } from 'src/service/impl/genre.service.impl';
import { v4 as uuidV4 } from 'uuid';
import { ShowtimeDto } from '../../dto/request/showtime.dto';
import { CodeEntitiesEnum } from '../../entity/enum/code.entities.enum';
import { ConcertMapperInterface } from '../concert.mapper.interface';
import { GenreMapper } from './genre.mapper.impl';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ConcertMapper implements ConcertMapperInterface {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly logger: LoggerFactory,
    private readonly genreService: GenreService,
    private readonly genreMapper: GenreMapper,
  ) {}
  toEntities(dtos: ConcertDto[]): Concert[] | Promise<Concert[]> {
    throw new Error('Method not implemented.');
  }
  private DATE_PATTERN = 'YYYY/MM/DD HH:mm:ss';
  private TIMEZONE = 'Asia/Ho_Chi_Minh';

  toDto(entity: Concert): ConcertDto {
    const concertDto = new ConcertDto();
    concertDto.id = entity.id;
    concertDto.title = entity.title;
    concertDto.description = entity.description;
    concertDto.code = entity.code;
    if (entity.images) {
      const dtoImages: string[] = [];
      for (const image of entity.images) {
        const imageDto = image.url;
        dtoImages.push(imageDto);
      }
      concertDto.images = dtoImages;
    }

    if (entity.artists) {
      const dtoArtists: string[] = [];
      for (const artist of entity.artists) {
        const artistDto = artist.name;
        dtoArtists.push(artistDto);
      }
      concertDto.artists = dtoArtists;
    }

    if (entity.directors) {
      const dtoDirectors: string[] = [];
      for (const director of entity.directors) {
        const directorDto = director.name;
        dtoDirectors.push(directorDto);
      }
      concertDto.directors = dtoDirectors;
    }

    if (entity.showTimes) {
      const dtoShowTimes: ShowtimeDto[] = [];
      const showTimes = entity.showTimes;
      for (const showTime of showTimes) {
        const startTime = showTime.startTime;
        const endTime = showTime.endTime;
        const showTimeDto = new ShowtimeDto();
        showTimeDto.startTime = moment(startTime).format('YYYY/MM/DD HH:mm:ss');
        showTimeDto.endTime = moment(endTime).format('YYYY/MM/DD HH:mm:ss');
        dtoShowTimes.push(showTimeDto);
      }
      concertDto.showTimes = dtoShowTimes;
      
    }
    return concertDto;
  }

  async toEntity(dto: ConcertDto): Promise<Concert> {
    const concert = new Concert();
    concert.id = dto.id ? dto.id : uuidV4();
    concert.code = CodeGenerator.generateCode(
      CodeEntitiesEnum.CONCERT,
      concert.id,
    );
    concert.title = dto.title;
    concert.description = dto.description;
    // genres //
    this.logger.log('Concert mapper field [genres]');
    const dtoGenres = dto.genres;
    const genres: Genre[] = [];
    for (const dtoGenre of dtoGenres) {
      const foundGenreDto = await this.genreService.findById(dtoGenre);
      genres.push(this.genreMapper.toEntity(foundGenreDto));
    }

    concert.genres = genres;
    // genres //

    // images //
    this.logger.log('Concert mapper field [images]');
    const dtoImages = dto.images;
    const images: Image[] = [];
    for (const dtoImage of dtoImages) {
      const image = new Image();
      image.id = uuidV4();
      image.url = dtoImage;
      image.concertId = concert.id;
      images.push(image);
    }
    concert.images = images;
    // images //

    // show times //
    this.logger.log('Concert mapper field [showTimes]');
    // throw exception if showtime in the past
    const isShowTimesInPast = this.isShowTimesInPast(dto.showTimes);
    if (isShowTimesInPast) {
      throw new BadRequestException(
        'Show times is invalid. Show times cannot be in the past',
      );
    }

    const showTimes: ShowTime[] = [];
    const stringShowTimes = dto.showTimes;
    for (const stringShowTime of stringShowTimes) {
      const showTime = new ShowTime();
      showTime.id = uuidV4();
      showTime.concertId = concert.id;
      showTime.startTime = moment(stringShowTime.startTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      showTime.endTime = moment(stringShowTime.endTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      showTimes.push(showTime);
    }
    const isConcertDuplicated = await this.isShowTimesOfConcertDuplicated(
      dto.showTimes,
    );
    // throw exception if show times are conflict
    if (isConcertDuplicated) {
      throw new ConflictException('Time slot conflict');
    }

    concert.showTimes = showTimes;
    // show times //

    // artist //
    this.logger.log('Concert mapper field [artists]');
    const dtoArtists = dto.artists;
    const artists: Artist[] = [];
    for (const dtoArtist of dtoArtists) {
      const artist = new Artist();
      artist.id = uuidV4();
      artist.name = dtoArtist;
      artist.concertId = concert.id;

      artists.push(artist);
    }
    concert.artists = artists;
    // artist //

    // director //
    this.logger.log('Concert mapper field [directors]');
    const dtoDirectors = dto.artists;
    const directors: Director[] = [];
    for (const dtoDirector of dtoDirectors) {
      const director = new Director();
      director.id = uuidV4();
      director.name = dtoDirector;
      director.concertId = concert.id;

      directors.push(director);
    }
    concert.directors = directors;
    // director //

    // concert seat //
    this.logger.log('Concert mapper field [concertSeats]');
    const seats = await Seat.findAll({ include: [SeatCategory] }); // find all seat
    if (!seats || (seats && seats.length === 0)) {
      throw new NotFoundException('Seats not found');
    }
    // const concertSeats: ConcertSeat[] = [];
    // for (const seat of seats) {
    //   if (!seat.seatCategory) {
    //     throw new InternalServerException(
    //       'Error occurred. Seat category of seat is null',
    //     );
    //   }
    //   const concertSeat = new ConcertSeat();
    //   concertSeat.id = uuidV4();
    //   concertSeat.concertId = concert.id;
    //   concertSeat.seatId = seat.id;
    //   concertSeats.push(concertSeat.get());
    // }
    concert.seats = seats;
    // concert seat //

    // price
    this.logger.log('Concert mapper field [prices]');
    const priceDtos: PriceDto[] = dto.prices;
    const prices: Price[] = [];
    for (const priceDto of priceDtos) {
      const price = new Price();
      price.id = uuidV4();
      price.concertId = concert.id;
      price.seatCategoryId = priceDto.seatCategoryId;
      price.price = priceDto.price;
      prices.push(price);
    }
    concert.prices = prices;
    // price

    return concert;
  }

  toDtos(entities: Concert[]): ConcertDto[] {
    const dtoConcerts: ConcertDto[] = [];
    for (const concert of entities) {
      const concertDto = this.toDto(concert);
      dtoConcerts.push(concertDto);
    }
    return dtoConcerts;
  }

  /**
   * To check if show times are in the past
   * @param showTimes
   */
  private isShowTimesInPast(showTimes: ShowtimeDto[]) {
    for (const showTime of showTimes) {
      const startTime = moment(showTime.startTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      const momentDate = moment(new Date(Date.now()), this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      if (startTime <= momentDate) {
        return true;
      }
    }
    return false;
  }

  /**
   * To check if a showtime has already been scheduled for another concert
   * @param showTimes
   */
  private async isShowTimesOfConcertDuplicated(
    showTimes: ShowtimeDto[],
  ): Promise<boolean> {
    for (const showTime of showTimes) {
      const startTime = moment(showTime.startTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      const endTime = moment(showTime.endTime, this.DATE_PATTERN)
        .tz(this.TIMEZONE)
        .toDate();
      const concerts = await this.sequelize.query(
        `SELECT *
           FROM checkConcertTimeDuplication(?, ?)`,
        {
          replacements: [startTime, endTime],
          model: Concert,
          mapToModel: true,
        },
      );
      if (concerts.length > 0) return true;
    }
    return false;
  }
}
