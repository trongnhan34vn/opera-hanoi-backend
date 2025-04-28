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
const common_2 = require("common");
const moment = require("moment-timezone");
const sequelize_typescript_1 = require("sequelize-typescript");
const concert_entity_1 = require("../../entity/concert.entity");
const concert_mapper_impl_1 = require("../../mapper/impl/concert.mapper.impl");
const concert_repository_impl_1 = require("../../repository/impl/concert.repository.impl");
let ConcertService = class ConcertService {
    constructor(concertRepository, concertMapper, logger, sequelize) {
        this.concertRepository = concertRepository;
        this.concertMapper = concertMapper;
        this.logger = logger;
        this.sequelize = sequelize;
        this.DATE_PATTERN = 'YYYY/MM/DD HH:mm:ss';
        this.TIMEZONE = 'Asia/Ho_Chi_Minh';
    }
    async create(dto) {
        const transaction = await this.sequelize.transaction();
        try {
            const concert = await this.concertMapper.toEntity(dto);
            this.logger.log('Start create operation...');
            const createdConcert = await this.concertRepository.create(concert, transaction);
            await transaction.commit();
            this.logger.log(`Concert created id [${createdConcert.id}]`);
            return this.concertMapper.toDto(createdConcert);
        }
        catch (error) {
            await transaction.rollback();
            this.logger.error(error);
            throw error;
        }
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
    async findUpcomingConcerts(page) {
        try {
            const result = await this.concertRepository.findByShowTimeWithInTwoWeeks(page);
            return result;
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async findByGenreId(genreId) {
        try {
            const result = await this.concertRepository.findByGenreId(genreId);
            const concerts = result.rows;
            const concertDtos = this.concertMapper.toDtos(concerts);
            this.logger.log('Concert founded');
            return { ...result, concertDtos };
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async findByShowTimes(startStringTime, endStringTime) {
        try {
            const result = await this.concertRepository.findByShowTime(startStringTime, endStringTime);
            const concertDtos = this.concertMapper.toDtos(result.rows);
            this.logger.log('Concert founded');
            return { ...result, concertDtos };
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async findAllConcertPagination(page) {
        return await this.concertRepository.findAllConcertPagination(page);
    }
    save(dto) {
        throw new Error('Method not implemented.');
    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    async findById(id) {
        try {
            const concert = await this.concertRepository.findById(id);
            return this.concertMapper.toDto(concert);
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
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
        common_2.LoggerFactory,
        sequelize_typescript_1.Sequelize])
], ConcertService);
//# sourceMappingURL=concert.service.impl.js.map