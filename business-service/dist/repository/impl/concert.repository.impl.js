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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("common");
const moment = require("moment-timezone");
const sequelize_2 = require("sequelize");
const artist_entity_1 = require("../../entity/artist.entity");
const concert_entity_1 = require("../../entity/concert.entity");
const director_entity_1 = require("../../entity/director.entity");
const price_enity_1 = require("../../entity/price.enity");
const genre_entity_1 = require("../../entity/genre.entity");
const image_entity_1 = require("../../entity/image.entity");
const show_time_entity_1 = require("../../entity/show.time.entity");
let ConcertRepository = class ConcertRepository {
    constructor(concertModel) {
        this.concertModel = concertModel;
    }
    async create(entity, transaction) {
        const createdConcert = await entity.save({ transaction });
        const imageCreations = entity.images.map((image) => image.get());
        const artistCreations = entity.artists.map((artist) => artist.get());
        const directorCreations = entity.directors.map((director) => director.get());
        const showTimeCreations = entity.showTimes.map((showTime) => showTime.get());
        const priceCreations = entity.prices.map((price) => price.get());
        await artist_entity_1.Artist.bulkCreate(artistCreations, { transaction });
        await director_entity_1.Director.bulkCreate(directorCreations, { transaction });
        await image_entity_1.Image.bulkCreate(imageCreations, { transaction });
        await show_time_entity_1.ShowTime.bulkCreate(showTimeCreations, { transaction });
        await price_enity_1.Price.bulkCreate(priceCreations, { transaction });
        await createdConcert.$add('artists', entity.artists, { transaction });
        await createdConcert.$add('directors', entity.directors, { transaction });
        await createdConcert.$add('images', entity.images, { transaction });
        await createdConcert.$add('showTimes', entity.showTimes, { transaction });
        await createdConcert.$add('prices', entity.prices, { transaction });
        await createdConcert.$add('genres', entity.genres, { transaction });
        await createdConcert.$add('seats', entity.seats, { transaction });
        return createdConcert;
    }
    async update(entity, transaction) {
        return await entity.update({ ...entity, updatedAt: new Date(Date.now()) }, { transaction });
    }
    async findById(id) {
        const concert = await this.concertModel.findOne({ where: { id } });
        if (!concert)
            throw new common_2.NotFoundException(`Concert not found with id [${id}]`);
        return concert;
    }
    async findByShowTimeWithInTwoWeeks(page) {
        const limit = page.size ?? 2;
        const currentPage = page.page ?? 1;
        const offset = (currentPage - 1) * limit;
        const result = await this.concertModel.findAndCountAll({
            include: [
                {
                    model: show_time_entity_1.ShowTime,
                    where: {
                        startTime: {
                            [sequelize_2.Op.between]: [
                                moment().tz('Asia/Ho_Chi_Minh').format(),
                                moment()
                                    .tz('Asia/Ho_Chi_Minh')
                                    .clone()
                                    .add(2, 'weeks')
                                    .format(),
                            ],
                        },
                    },
                    attributes: ['startTime', 'endTime'],
                },
                {
                    model: artist_entity_1.Artist,
                    attributes: ['name'],
                },
                {
                    model: director_entity_1.Director,
                    attributes: ['name'],
                },
            ],
            limit: limit,
            offset: offset,
        });
        return result;
    }
    async findByGenreId(genreId) {
        return await concert_entity_1.Concert.findAndCountAll({
            include: [
                {
                    model: genre_entity_1.Genre,
                    where: { id: genreId },
                    required: true,
                },
                {
                    model: image_entity_1.Image,
                    attributes: ['url'],
                },
                {
                    model: show_time_entity_1.ShowTime,
                    attributes: ['startTime', 'endTime'],
                },
            ],
            distinct: true,
        });
    }
    async findByShowTime(startStringTime, endStringTime) {
        const TIMEZONE = 'Asia/Ho_Chi_Minh';
        const TIME_PATTERN = 'yyyy/MM/dd HH:mm:ss';
        const startTime = moment(startStringTime, TIME_PATTERN)
            .tz(TIMEZONE)
            .toDate();
        const endTime = moment(endStringTime, TIME_PATTERN).tz(TIMEZONE).toDate();
        return await concert_entity_1.Concert.findAndCountAll({
            include: [
                {
                    model: show_time_entity_1.ShowTime,
                    where: {
                        startTime: {
                            [sequelize_2.Op.between]: [startTime, endTime],
                        },
                    },
                    required: true,
                },
                {
                    model: image_entity_1.Image,
                    attributes: ['url'],
                },
            ],
            distinct: true,
        });
    }
    async findAllConcertPagination(pagination) {
        const page = pagination.page ?? 1;
        const size = pagination.size ?? 5;
        const sortBy = pagination.sortBy ?? 'id';
        const orderBy = pagination.orderBy ?? 'ASC';
        const offset = (page - 1) * size;
        const limit = size;
        const { count, rows } = await this.concertModel.findAndCountAll({
            include: [
                {
                    model: show_time_entity_1.ShowTime,
                    attributes: ['startTime', 'endTime'],
                },
                {
                    model: artist_entity_1.Artist,
                    attributes: ['name'],
                },
                {
                    model: director_entity_1.Director,
                    attributes: ['name'],
                },
            ],
            limit,
            offset,
            order: [[sortBy, orderBy]],
        });
        return {
            items: count,
            pages: Math.ceil(count / size),
            currentPage: page,
            data: rows,
        };
    }
    async remove(id) {
        const concert = await this.findById(id);
        await concert.destroy();
    }
    async findAll() {
        return await this.concertModel.findAll();
    }
};
exports.ConcertRepository = ConcertRepository;
exports.ConcertRepository = ConcertRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(concert_entity_1.Concert)),
    __metadata("design:paramtypes", [Object])
], ConcertRepository);
//# sourceMappingURL=concert.repository.impl.js.map