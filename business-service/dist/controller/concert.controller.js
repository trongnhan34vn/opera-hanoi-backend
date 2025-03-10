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
exports.ConcertController = void 0;
const common_1 = require("@nestjs/common");
const concert_service_impl_1 = require("../service/impl/concert.service.impl");
const common_lib_1 = require("common-lib");
const concert_dto_1 = require("../dto/request/concert.dto");
const SkipAuthGuardAnnotationConfig_1 = require("../config/SkipAuthGuardAnnotationConfig");
const pagination_dto_1 = require("../dto/request/pagination.dto");
let ConcertController = class ConcertController {
    constructor(concertService, httpResponseFactory) {
        this.concertService = concertService;
        this.httpResponseFactory = httpResponseFactory;
    }
    async findUpcomingConcerts(res, query) {
        const result = await this.concertService.findUpcomingConcerts(query);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.OK, common_lib_1.SuccessMessage.OK.getCode, `Query concert success. Total ${result.total} (record) (s)`, result.dtoConcerts);
    }
    async findConcertsByCategories(res, categoryId) {
        const result = await this.concertService.findByCategoryId(categoryId);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.OK, common_lib_1.SuccessMessage.OK.getCode, `Query concert success. Total ${result.count} (record) (s)`, result.concertDtos);
    }
    async findConcertsByShowTime(res, startTime, endTime) {
        const result = await this.concertService.findByShowTimes(startTime, endTime);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.OK, common_lib_1.SuccessMessage.OK.getCode, `Concert found with required showtime. Total ${result.count} (record) (s)`, result.concertDtos);
    }
    async findConcertById(res, id) {
        const concert = await this.concertService.findById(id);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.OK, common_lib_1.SuccessMessage.OK.getCode, 'Concert founded', concert);
    }
    async create(res, concertDto) {
        const concert = await this.concertService.create(concertDto);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.CREATED, common_lib_1.SuccessMessage.CREATED.getCode, `Concert created [${concert.id}]`, concert);
    }
    async bulkCreate(res, concertDtos) {
        for (const concertDto of concertDtos) {
            await this.concertService.create(concertDto);
        }
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.CREATED, common_lib_1.SuccessMessage.CREATED.getCode, `Concerts created`, null);
    }
};
exports.ConcertController = ConcertController;
__decorate([
    (0, common_1.Get)('/upcoming'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.Pagination]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findUpcomingConcerts", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findConcertsByCategories", null);
__decorate([
    (0, common_1.Get)('/schedule'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('startTime')),
    __param(2, (0, common_1.Query)('endTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findConcertsByShowTime", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findConcertById", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, concert_dto_1.ConcertDto]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/bulkCreate'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "bulkCreate", null);
exports.ConcertController = ConcertController = __decorate([
    (0, common_1.Controller)('/api/v1/business/concerts'),
    __metadata("design:paramtypes", [concert_service_impl_1.ConcertService,
        common_lib_1.HttpResponseFactory])
], ConcertController);
//# sourceMappingURL=concert.controller.js.map