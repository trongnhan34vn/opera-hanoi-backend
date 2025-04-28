"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const genre_controller_1 = require("../controller/genre.controller");
const genre_entity_1 = require("../entity/genre.entity");
const genre_mapper_impl_1 = require("../mapper/impl/genre.mapper.impl");
const genre_repository_impl_1 = require("../repository/impl/genre.repository.impl");
const genre_service_impl_1 = require("../service/impl/genre.service.impl");
const keycloak_config_1 = require("../config/keycloak.config");
let GenreModule = class GenreModule {
};
exports.GenreModule = GenreModule;
exports.GenreModule = GenreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.LogModule,
            common_2.HttpServiceModule,
            sequelize_1.SequelizeModule.forFeature([genre_entity_1.Genre]),
            nest_keycloak_connect_1.KeycloakConnectModule.register(keycloak_config_1.KeycloakConfig.getKeycloakConfig()),
        ],
        controllers: [genre_controller_1.GenreController],
        providers: [
            genre_service_impl_1.GenreService,
            genre_mapper_impl_1.GenreMapper,
            genre_repository_impl_1.GenreRepository,
            common_2.HttpResponseFactory,
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('genre-service'),
            },
        ],
        exports: [genre_service_impl_1.GenreService],
    })
], GenreModule);
//# sourceMappingURL=genre.module.js.map