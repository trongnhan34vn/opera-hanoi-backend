"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("common");
const symbol_1 = require("../constants/symbol");
const seat_category_controller_1 = require("../controller/seat.category.controller");
const seat_category_1 = require("../entity/seat.category");
const seat_category_mapper_impl_1 = require("../mapper/impl/seat.category.mapper.impl");
const seat_category_repository_impl_1 = require("../repository/impl/seat.category.repository.impl");
const seat_category_service_impl_1 = require("../service/impl/seat.category.service.impl");
let SeatCategoryModule = class SeatCategoryModule {
};
exports.SeatCategoryModule = SeatCategoryModule;
exports.SeatCategoryModule = SeatCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([seat_category_1.SeatCategory])],
        providers: [
            {
                provide: symbol_1.ISeatCategoryRepositoryToken,
                useClass: seat_category_repository_impl_1.SeatCategoryRepository,
            },
            {
                provide: symbol_1.ISeatCateogoryServiceToken,
                useClass: seat_category_service_impl_1.SeatCategoryService,
            },
            {
                provide: symbol_1.ISeatCategoryMapperToken,
                useClass: seat_category_mapper_impl_1.SeatCategoryMapper,
            },
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('seat-category-service'),
            },
            common_2.LoggerFactory,
            common_2.HttpResponseFactory,
        ],
        controllers: [seat_category_controller_1.SeatCategoryController],
        exports: [symbol_1.ISeatCateogoryServiceToken],
    })
], SeatCategoryModule);
//# sourceMappingURL=seat.category.module.js.map