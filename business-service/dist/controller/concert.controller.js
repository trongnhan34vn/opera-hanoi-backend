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
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const concert_dto_1 = require("../dto/request/concert.dto");
const pagination_dto_1 = require("../dto/request/pagination.dto");
const concert_service_impl_1 = require("../service/impl/concert.service.impl");
let ConcertController = class ConcertController {
    constructor(concertService, httpResponseFactory) {
        this.concertService = concertService;
        this.httpResponseFactory = httpResponseFactory;
    }
    async findUpcomingConcerts(res, query) {
        const result = await this.concertService.findUpcomingConcerts(query);
        return this.httpResponseFactory.sendOKResponse(res, `Query concert success. Total ${result.count} (record) (s)`, result.rows);
    }
    async findConcertsByCategories(res, categoryId) {
        const result = await this.concertService.findByGenreId(categoryId);
        return this.httpResponseFactory.sendOKResponse(res, `Query concert success. Total ${result.count} (record) (s)`, result.concertDtos);
    }
    async findAllConcertPagination(res, query) {
        const response = await this.concertService.findAllConcertPagination(query);
        return this.httpResponseFactory.sendOKResponse(res, `Concerts are founded. Total ${response.items} (record) (s)`, response);
    }
    async findConcertsByShowTime(res, startTime, endTime) {
        const result = await this.concertService.findByShowTimes(startTime, endTime);
        return this.httpResponseFactory.sendOKResponse(res, `Concert found with required showtime. Total ${result.count} (record) (s)`, result.concertDtos);
    }
    async create(res, concertDto) {
        const concert = await this.concertService.create(concertDto);
        return this.httpResponseFactory.sendCreatedResponse(res, `Concert created [${concert.id}]`, concert);
    }
    async bulkCreate(res, concertDtos) {
        for (const concertDto of concertDtos) {
            await this.concertService.create(concertDto);
        }
        return this.httpResponseFactory.sendCreatedResponse(res, `Concerts created`, null);
    }
    async findConcertById(res, id) {
        const concert = await this.concertService.findById(id);
        return this.httpResponseFactory.sendOKResponse(res, 'Concert founded', concert);
    }
};
exports.ConcertController = ConcertController;
__decorate([
    (0, common_1.Get)('/upcoming'),
    (0, common_2.SkipAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get Upcoming Concert',
        schema: {
            example: {
                message: 'Query concert success. Total 1 (record) (s)',
                code: 'SUC200',
                data: [
                    {
                        id: '0ab6da17-34d8-4de4-9cf5-a796b4abe11e',
                        code: 'CON-2KJIBB',
                        title: 'Anh Duy Tồ',
                        description: '[String Buffer]',
                        status: 'On Sale',
                        createdAt: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
                        updatedAt: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
                        showTimes: [
                            {
                                startTime: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
                                endTime: 'YYYY-MM-ddTHH:mm:ss.SSSZ',
                            },
                        ],
                        artists: [
                            {
                                name: 'Anh Duy Tồ'
                            }
                        ],
                        directors: [
                            {
                                name: 'Anh Duy Tồ'
                            }
                        ],
                    },
                ],
            },
        },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.Pagination]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findUpcomingConcerts", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_2.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findConcertsByCategories", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.Pagination]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findAllConcertPagination", null);
__decorate([
    (0, common_1.Get)('/schedule'),
    (0, common_2.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('startTime')),
    __param(2, (0, common_1.Query)('endTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findConcertsByShowTime", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_2.SkipAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Create Concert',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, concert_dto_1.ConcertDto]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/bulkCreate'),
    (0, common_2.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "bulkCreate", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findConcertById", null);
exports.ConcertController = ConcertController = __decorate([
    (0, swagger_1.ApiTags)('concerts'),
    (0, common_1.Controller)('/api/v1/business/concerts'),
    __metadata("design:paramtypes", [concert_service_impl_1.ConcertService,
        common_2.HttpResponseFactory])
], ConcertController);
//# sourceMappingURL=concert.controller.js.map