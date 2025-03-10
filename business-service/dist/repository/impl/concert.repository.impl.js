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
const concert_entity_1 = require("../../entity/concert.entity");
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const image_entity_1 = require("../../entity/image.entity");
const show_time_entity_1 = require("../../entity/show.time.entity");
const sequelize_typescript_1 = require("sequelize-typescript");
const category_entity_1 = require("../../entity/category.entity");
const moment_timezone_1 = require("moment-timezone");
let ConcertRepository = class ConcertRepository {
    constructor(concertModel, logger, sequelize) {
        this.concertModel = concertModel;
        this.logger = logger;
        this.sequelize = sequelize;
    }
    async create(entity, transaction) {
        const createdConcert = await entity.save({ transaction });
        const imageCreations = entity.images.map((image) => image.get());
        await image_entity_1.Image.bulkCreate(imageCreations, { transaction });
        const showTimeCreations = entity.showTimes.map((showTime) => showTime.get());
        await show_time_entity_1.ShowTime.bulkCreate(showTimeCreations, { transaction });
        await createdConcert.$add('images', entity.images, { transaction });
        await createdConcert.$add('categories', entity.categories, { transaction });
        await createdConcert.$add('showTimes', entity.showTimes, { transaction });
        return createdConcert;
    }
    async update(entity, transaction) {
        return await entity.update({ ...entity, updatedAt: new Date(Date.now()) }, { transaction });
    }
    async findById(id) {
        const concert = await this.concertModel.findOne({ where: { id } });
        if (!concert)
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `Concert not found with id [${id}]`);
        return concert;
    }
    async findByShowTimeWithInTwoWeeks(page) {
        const limit = page.size ?? 2;
        const currentPage = page.page ?? 1;
        const offset = (currentPage - 1) * limit;
        const total = await this.sequelize.query('select *\n' + 'from count_concerts_within_2_weeks();', { raw: true, type: sequelize_2.QueryTypes.SELECT });
        if (total.length <= 0) {
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, 'Count record errors');
        }
        const concerts = await this.sequelize.query('Select * from get_concerts_within_2_weeks(?, ?)', {
            replacements: [limit, offset],
            raw: true,
            type: sequelize_2.QueryTypes.SELECT,
        });
        return {
            total: total[0]['count_concerts_within_2_weeks'],
            page: currentPage,
            concerts,
        };
    }
    async findByCategoryId(categoryId) {
        return await concert_entity_1.Concert.findAndCountAll({
            include: [
                {
                    model: category_entity_1.Category,
                    where: { id: categoryId },
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
        const startTime = (0, moment_timezone_1.default)(startStringTime, TIME_PATTERN)
            .tz(TIMEZONE)
            .toDate();
        const endTime = (0, moment_timezone_1.default)(endStringTime, TIME_PATTERN).tz(TIMEZONE).toDate();
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
    __metadata("design:paramtypes", [Object, common_lib_1.LoggerFactory,
        sequelize_typescript_1.Sequelize])
], ConcertRepository);
//# sourceMappingURL=concert.repository.impl.js.map