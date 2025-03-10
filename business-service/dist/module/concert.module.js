"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertModule = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const sequelize_1 = require("@nestjs/sequelize");
const category_mapper_impl_1 = require("../mapper/impl/category.mapper.impl");
const concert_service_impl_1 = require("../service/impl/concert.service.impl");
const concert_mapper_impl_1 = require("../mapper/impl/concert.mapper.impl");
const concert_controller_1 = require("../controller/concert.controller");
const concert_entity_1 = require("../entity/concert.entity");
const category_module_1 = require("./category.module");
const concert_repository_impl_1 = require("../repository/impl/concert.repository.impl");
let ConcertModule = class ConcertModule {
};
exports.ConcertModule = ConcertModule;
exports.ConcertModule = ConcertModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_lib_1.LogModule,
            common_lib_1.HttpServiceModule,
            category_module_1.CategoryModule,
            sequelize_1.SequelizeModule.forFeature([concert_entity_1.Concert]),
        ],
        controllers: [concert_controller_1.ConcertController],
        providers: [
            concert_service_impl_1.ConcertService,
            concert_repository_impl_1.ConcertRepository,
            category_mapper_impl_1.CategoryMapper,
            concert_mapper_impl_1.ConcertMapper,
            common_lib_1.HttpResponseFactory,
            {
                provide: common_lib_1.LoggerFactory,
                useFactory: () => new common_lib_1.LoggerFactory('concert-service'),
            },
        ],
        exports: [concert_service_impl_1.ConcertService],
    })
], ConcertModule);
//# sourceMappingURL=concert.module.js.map