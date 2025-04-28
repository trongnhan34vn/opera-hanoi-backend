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
exports.SeatCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const symbol_1 = require("../constants/symbol");
let SeatCategoryController = class SeatCategoryController {
    constructor(seatCategoryService, httpResponseFactory) {
        this.seatCategoryService = seatCategoryService;
        this.httpResponseFactory = httpResponseFactory;
    }
    async findAll(res) {
        const seatCategories = await this.seatCategoryService.findAll();
        return this.httpResponseFactory.sendOKResponse(res, 'Seat Categories are founded', seatCategories);
    }
};
exports.SeatCategoryController = SeatCategoryController;
__decorate([
    (0, common_1.Get)('/'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeatCategoryController.prototype, "findAll", null);
exports.SeatCategoryController = SeatCategoryController = __decorate([
    (0, swagger_1.ApiTags)('seat-categories'),
    (0, common_1.Controller)('/api/v1/business/seat-categories'),
    __param(0, (0, common_1.Inject)(symbol_1.ISeatCateogoryServiceToken)),
    __metadata("design:paramtypes", [Object, common_2.HttpResponseFactory])
], SeatCategoryController);
//# sourceMappingURL=seat.category.controller.js.map