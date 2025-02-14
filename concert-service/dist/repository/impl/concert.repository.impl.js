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
const image_entity_1 = require("../../entity/image.entity");
const show_time_entity_1 = require("../../entity/show.time.entity");
let ConcertRepository = class ConcertRepository {
    constructor(concertModel, logger) {
        this.concertModel = concertModel;
        this.logger = logger;
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
    __metadata("design:paramtypes", [Object, common_lib_1.LoggerFactory])
], ConcertRepository);
//# sourceMappingURL=concert.repository.impl.js.map