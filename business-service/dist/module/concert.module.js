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
const common_2 = require("common");
const sequelize_1 = require("@nestjs/sequelize");
const genre_mapper_impl_1 = require("../mapper/impl/genre.mapper.impl");
const concert_service_impl_1 = require("../service/impl/concert.service.impl");
const concert_mapper_impl_1 = require("../mapper/impl/concert.mapper.impl");
const concert_controller_1 = require("../controller/concert.controller");
const concert_entity_1 = require("../entity/concert.entity");
const genre_module_1 = require("./genre.module");
const concert_repository_impl_1 = require("../repository/impl/concert.repository.impl");
let ConcertModule = class ConcertModule {
};
exports.ConcertModule = ConcertModule;
exports.ConcertModule = ConcertModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.LogModule,
            common_2.HttpServiceModule,
            genre_module_1.GenreModule,
            sequelize_1.SequelizeModule.forFeature([concert_entity_1.Concert]),
        ],
        controllers: [concert_controller_1.ConcertController],
        providers: [
            concert_service_impl_1.ConcertService,
            concert_repository_impl_1.ConcertRepository,
            genre_mapper_impl_1.GenreMapper,
            concert_mapper_impl_1.ConcertMapper,
            common_2.HttpResponseFactory,
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('concert-service'),
            },
        ],
        exports: [concert_service_impl_1.ConcertService],
    })
], ConcertModule);
//# sourceMappingURL=concert.module.js.map