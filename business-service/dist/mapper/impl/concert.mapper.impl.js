"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertMapper = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("common");
const moment = require("moment-timezone");
const concert_dto_1 = require("../../dto/request/concert.dto");
const artist_entity_1 = require("../../entity/artist.entity");
const concert_entity_1 = require("../../entity/concert.entity");
const director_entity_1 = require("../../entity/director.entity");
const image_entity_1 = require("../../entity/image.entity");
const price_enity_1 = require("../../entity/price.enity");
const seat_category_1 = require("../../entity/seat.category");
const seat_entity_1 = require("../../entity/seat.entity");
const show_time_entity_1 = require("../../entity/show.time.entity");
const genre_service_impl_1 = require("../../service/impl/genre.service.impl");
const uuid_1 = require("uuid");
const showtime_dto_1 = require("../../dto/request/showtime.dto");
const code_entities_enum_1 = require("../../entity/enum/code.entities.enum");
const genre_mapper_impl_1 = require("./genre.mapper.impl");
const sequelize_typescript_1 = require("sequelize-typescript");
let ConcertMapper = class ConcertMapper {
    constructor(sequelize, logger, genreService, genreMapper) {
        this.sequelize = sequelize;
        this.logger = logger;
        this.genreService = genreService;
        this.genreMapper = genreMapper;
        this.DATE_PATTERN = 'YYYY/MM/DD HH:mm:ss';
        this.TIMEZONE = 'Asia/Ho_Chi_Minh';
    }
    toEntities(dtos) {
        throw new Error('Method not implemented.');
    }
    toDto(entity) {
        const concertDto = new concert_dto_1.ConcertDto();
        concertDto.id = entity.id;
        concertDto.title = entity.title;
        concertDto.description = entity.description;
        concertDto.code = entity.code;
        if (entity.images) {
            const dtoImages = [];
            for (const image of entity.images) {
                const imageDto = image.url;
                dtoImages.push(imageDto);
            }
            concertDto.images = dtoImages;
        }
        if (entity.artists) {
            const dtoArtists = [];
            for (const artist of entity.artists) {
                const artistDto = artist.name;
                dtoArtists.push(artistDto);
            }
            concertDto.artists = dtoArtists;
        }
        if (entity.directors) {
            const dtoDirectors = [];
            for (const director of entity.directors) {
                const directorDto = director.name;
                dtoDirectors.push(directorDto);
            }
            concertDto.directors = dtoDirectors;
        }
        if (entity.showTimes) {
            const dtoShowTimes = [];
            const showTimes = entity.showTimes;
            for (const showTime of showTimes) {
                const startTime = showTime.startTime;
                const endTime = showTime.endTime;
                const showTimeDto = new showtime_dto_1.ShowtimeDto();
                showTimeDto.startTime = moment(startTime).format('YYYY/MM/DD HH:mm:ss');
                showTimeDto.endTime = moment(endTime).format('YYYY/MM/DD HH:mm:ss');
                dtoShowTimes.push(showTimeDto);
            }
            concertDto.showTimes = dtoShowTimes;
        }
        return concertDto;
    }
    async toEntity(dto) {
        const concert = new concert_entity_1.Concert();
        concert.id = dto.id ? dto.id : (0, uuid_1.v4)();
        concert.code = common_2.CodeGenerator.generateCode(code_entities_enum_1.CodeEntitiesEnum.CONCERT, concert.id);
        concert.title = dto.title;
        concert.description = dto.description;
        this.logger.log('Concert mapper field [genres]');
        const dtoGenres = dto.genres;
        const genres = [];
        for (const dtoGenre of dtoGenres) {
            const foundGenreDto = await this.genreService.findById(dtoGenre);
            genres.push(this.genreMapper.toEntity(foundGenreDto));
        }
        concert.genres = genres;
        this.logger.log('Concert mapper field [images]');
        const dtoImages = dto.images;
        const images = [];
        for (const dtoImage of dtoImages) {
            const image = new image_entity_1.Image();
            image.id = (0, uuid_1.v4)();
            image.url = dtoImage;
            image.concertId = concert.id;
            images.push(image);
        }
        concert.images = images;
        this.logger.log('Concert mapper field [showTimes]');
        const isShowTimesInPast = this.isShowTimesInPast(dto.showTimes);
        if (isShowTimesInPast) {
            throw new common_2.BadRequestException('Show times is invalid. Show times cannot be in the past');
        }
        const showTimes = [];
        const stringShowTimes = dto.showTimes;
        for (const stringShowTime of stringShowTimes) {
            const showTime = new show_time_entity_1.ShowTime();
            showTime.id = (0, uuid_1.v4)();
            showTime.concertId = concert.id;
            showTime.startTime = moment(stringShowTime.startTime, this.DATE_PATTERN)
                .tz(this.TIMEZONE)
                .toDate();
            showTime.endTime = moment(stringShowTime.endTime, this.DATE_PATTERN)
                .tz(this.TIMEZONE)
                .toDate();
            showTimes.push(showTime);
        }
        const isConcertDuplicated = await this.isShowTimesOfConcertDuplicated(dto.showTimes);
        if (isConcertDuplicated) {
            throw new common_2.ConflictException('Time slot conflict');
        }
        concert.showTimes = showTimes;
        this.logger.log('Concert mapper field [artists]');
        const dtoArtists = dto.artists;
        const artists = [];
        for (const dtoArtist of dtoArtists) {
            const artist = new artist_entity_1.Artist();
            artist.id = (0, uuid_1.v4)();
            artist.name = dtoArtist;
            artist.concertId = concert.id;
            artists.push(artist);
        }
        concert.artists = artists;
        this.logger.log('Concert mapper field [directors]');
        const dtoDirectors = dto.artists;
        const directors = [];
        for (const dtoDirector of dtoDirectors) {
            const director = new director_entity_1.Director();
            director.id = (0, uuid_1.v4)();
            director.name = dtoDirector;
            director.concertId = concert.id;
            directors.push(director);
        }
        concert.directors = directors;
        this.logger.log('Concert mapper field [concertSeats]');
        const seats = await seat_entity_1.Seat.findAll({ include: [seat_category_1.SeatCategory] });
        if (!seats || (seats && seats.length === 0)) {
            throw new common_2.NotFoundException('Seats not found');
        }
        concert.seats = seats;
        this.logger.log('Concert mapper field [prices]');
        const priceDtos = dto.prices;
        const prices = [];
        for (const priceDto of priceDtos) {
            const price = new price_enity_1.Price();
            price.id = (0, uuid_1.v4)();
            price.concertId = concert.id;
            price.seatCategoryId = priceDto.seatCategoryId;
            price.price = priceDto.price;
            prices.push(price);
        }
        concert.prices = prices;
        return concert;
    }
    toDtos(entities) {
        const dtoConcerts = [];
        for (const concert of entities) {
            const concertDto = this.toDto(concert);
            dtoConcerts.push(concertDto);
        }
        return dtoConcerts;
    }
    isShowTimesInPast(showTimes) {
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
    async isShowTimesOfConcertDuplicated(showTimes) {
        for (const showTime of showTimes) {
            const startTime = moment(showTime.startTime, this.DATE_PATTERN)
                .tz(this.TIMEZONE)
                .toDate();
            const endTime = moment(showTime.endTime, this.DATE_PATTERN)
                .tz(this.TIMEZONE)
                .toDate();
            const concerts = await this.sequelize.query(`SELECT *
           FROM checkConcertTimeDuplication(?, ?)`, {
                replacements: [startTime, endTime],
                model: concert_entity_1.Concert,
                mapToModel: true,
            });
            if (concerts.length > 0)
                return true;
        }
        return false;
    }
};
exports.ConcertMapper = ConcertMapper;
exports.ConcertMapper = ConcertMapper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize,
        common_2.LoggerFactory,
        genre_service_impl_1.GenreService,
        genre_mapper_impl_1.GenreMapper])
], ConcertMapper);
//# sourceMappingURL=concert.mapper.impl.js.map