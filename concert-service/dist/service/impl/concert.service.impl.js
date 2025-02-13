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
exports.ConcertService = void 0;
const common_1 = require("@nestjs/common");
const concert_repository_impl_1 = require("../../repository/impl/concert.repository.impl");
const concert_mapper_impl_1 = require("../../mapper/impl/concert.mapper.impl");
const common_lib_1 = require("common-lib");
const category_service_impl_1 = require("./category.service.impl");
const category_mapper_impl_1 = require("../../mapper/impl/category.mapper.impl");
const image_entity_1 = require("../../entity/image.entity");
const show_time_entity_1 = require("../../entity/show.time.entity");
const moment = require("moment-timezone");
const concert_seat_category_sub_entity_1 = require("../../entity/sub/concert.seat.category.sub.entity");
const sequelize_typescript_1 = require("sequelize-typescript");
const concert_seat_sub_entity_1 = require("../../entity/sub/concert.seat.sub.entity");
const seat_entity_1 = require("../../entity/seat.entity");
const uuid_1 = require("uuid");
let ConcertService = class ConcertService {
    constructor(concertRepository, concertMapper, categoryService, categoryMapper, logger, sequelize) {
        this.concertRepository = concertRepository;
        this.concertMapper = concertMapper;
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
        this.logger = logger;
        this.sequelize = sequelize;
    }
    async create(dto) {
        const transaction = await this.sequelize.transaction();
        try {
            const concert = await this.concertMapper.toEntity(dto);
            this.logger.log('Start create operation...');
            const categoryIds = dto.categories;
            const categories = [];
            for (const categoryId of categoryIds) {
                const categoryDto = await this.categoryService.findById(categoryId);
                const category = this.categoryMapper.toEntity(categoryDto);
                categories.push(category);
            }
            concert.categories = categories;
            this.logger.log('Set categories of concert');
            const imageUrls = dto.images;
            const images = [];
            for (const stringUrl of imageUrls) {
                const image = new image_entity_1.Image();
                image.id = (0, uuid_1.v4)();
                image.concertId = concert.id;
                image.url = stringUrl;
                image.concert = concert;
                images.push(image);
            }
            concert.images = images;
            this.logger.log('Set images of concert');
            const showTimes = [];
            const stringShowTimes = dto.showTimes;
            for (const stringShowTime of stringShowTimes) {
                const showTime = new show_time_entity_1.ShowTime();
                showTime.id = (0, uuid_1.v4)();
                showTime.concertId = concert.id;
                showTime.startTime = moment(stringShowTime.startTime, 'YYYY/MM/DD HH:mm:ss')
                    .tz('Asia/Ho_Chi_Minh')
                    .toDate();
                showTime.endTime = moment(stringShowTime.endTime, 'YYYY/MM/DD HH:mm:ss')
                    .tz('Asia/Ho_Chi_Minh')
                    .toDate();
                showTimes.push(showTime);
            }
            concert.showTimes = showTimes;
            this.logger.log('Set show times of concert');
            const createdConcert = await this.concertRepository.create(concert);
            const seatPrices = dto.seatCategoriesPrice;
            const concertSeatCategories = [];
            for (const seatPrice of seatPrices) {
                const concertSeatCategory = new concert_seat_category_sub_entity_1.ConcertSeatCategory();
                concertSeatCategory.id = (0, uuid_1.v4)();
                concertSeatCategory.concertId = concert.id;
                concertSeatCategory.seatCategoryId = seatPrice.seatCategoryId;
                concertSeatCategory.price = seatPrice.price;
                concertSeatCategories.push(concertSeatCategory.get());
            }
            await concert_seat_category_sub_entity_1.ConcertSeatCategory.bulkCreate(concertSeatCategories, {
                transaction,
            });
            this.logger.log('Set price of seat categories');
            const seats = await seat_entity_1.Seat.findAll();
            const concertSeats = [];
            for (const seat of seats) {
                const concertSeat = new concert_seat_sub_entity_1.ConcertSeat();
                concertSeat.id = (0, uuid_1.v4)();
                concertSeat.concertId = concert.id;
                concertSeat.seatId = seat.id;
                concertSeats.push(concertSeat.get());
            }
            await concert_seat_sub_entity_1.ConcertSeat.bulkCreate(concertSeats, { transaction });
            this.logger.log('Set amount of seat of concert');
            await transaction.commit();
            this.logger.log('Concert created!');
            return this.concertMapper.toDto(createdConcert);
        }
        catch (error) {
            await transaction.rollback();
            this.logger.error(error);
            throw error;
        }
    }
    save(dto) {
        throw new Error('Method not implemented.');
    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    remove(id) {
        throw new Error('Method not implemented.');
    }
};
exports.ConcertService = ConcertService;
exports.ConcertService = ConcertService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [concert_repository_impl_1.ConcertRepository,
        concert_mapper_impl_1.ConcertMapper,
        category_service_impl_1.CategoryService,
        category_mapper_impl_1.CategoryMapper,
        common_lib_1.LoggerFactory,
        sequelize_typescript_1.Sequelize])
], ConcertService);
//# sourceMappingURL=concert.service.impl.js.map