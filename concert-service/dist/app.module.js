"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_lib_1 = require("common-lib");
const config_1 = require("@nestjs/config");
const path = require("node:path");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const KeycloakConsants_1 = require("./constants/KeycloakConsants");
const sequelize_1 = require("@nestjs/sequelize");
const core_1 = require("@nestjs/core");
const GlobalAuthGuard_1 = require("./config/GlobalAuthGuard");
const SkipAuthGuard_1 = require("./config/SkipAuthGuard");
const concert_entity_1 = require("./entity/concert.entity");
const category_entity_1 = require("./entity/category.entity");
const image_entity_1 = require("./entity/image.entity");
const seat_entity_1 = require("./entity/seat.entity");
const seat_category_entity_1 = require("./entity/seat.category.entity");
const concert_category_sub_entity_1 = require("./entity/sub/concert.category.sub.entity");
const concert_seat_category_sub_entity_1 = require("./entity/sub/concert.seat.category.sub.entity");
const concert_seat_sub_entity_1 = require("./entity/sub/concert.seat.sub.entity");
const show_time_entity_1 = require("./entity/show.time.entity");
const category_module_1 = require("./module/category.module");
const concert_module_1 = require("./module/concert.module");
const envFilePath = '../.env.dev';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            category_module_1.CategoryModule,
            concert_module_1.ConcertModule,
            common_lib_1.LogModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: path.resolve(__dirname, envFilePath),
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.register(common_lib_1.KeycloakConfig.getKeycloakConfig(KeycloakConsants_1.KEYCLOAK_SERVICE_URL, KeycloakConsants_1.KEYCLOAK_REALM || 'test', KeycloakConsants_1.KEYCLOAK_CLIENT_ID || 'test', KeycloakConsants_1.KEYCLOAK_CLIENT_SECRET)),
            common_lib_1.MiddlewareModule,
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: 'localhost',
                port: 5435,
                username: 'postgres',
                password: 'Nhantic1998@',
                database: 'concert_service_db',
                schema: 'concert_service_schema',
                models: [
                    concert_entity_1.Concert,
                    category_entity_1.Category,
                    image_entity_1.Image,
                    show_time_entity_1.ShowTime,
                    seat_entity_1.Seat,
                    seat_category_entity_1.SeatCategory,
                    concert_category_sub_entity_1.ConcertCategory,
                    concert_seat_category_sub_entity_1.ConcertSeatCategory,
                    concert_seat_sub_entity_1.ConcertSeat,
                ],
                define: {
                    timestamps: true,
                },
                autoLoadModels: true,
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            common_lib_1.HttpResponseFactory,
            {
                provide: common_lib_1.LoggerFactory,
                useFactory: () => new common_lib_1.LoggerFactory('default'),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: GlobalAuthGuard_1.GlobalAuthGuard,
            },
            nest_keycloak_connect_1.AuthGuard,
            nest_keycloak_connect_1.ResourceGuard,
            nest_keycloak_connect_1.RoleGuard,
            SkipAuthGuard_1.SkipAuthGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map