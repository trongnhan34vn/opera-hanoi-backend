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
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const path = require("node:path");
const process = require("node:process");
const dotenv = require("dotenv");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const keycloak_config_1 = require("./config/keycloak.config");
const artist_entity_1 = require("./entity/artist.entity");
const concert_entity_1 = require("./entity/concert.entity");
const director_entity_1 = require("./entity/director.entity");
const floor_entity_1 = require("./entity/floor.entity");
const genre_entity_1 = require("./entity/genre.entity");
const image_entity_1 = require("./entity/image.entity");
const room_entity_1 = require("./entity/room.entity");
const seat_category_1 = require("./entity/seat.category");
const seat_entity_1 = require("./entity/seat.entity");
const show_time_entity_1 = require("./entity/show.time.entity");
const concert_genre_sub_entity_1 = require("./entity/sub/concert.genre.sub.entity");
const concert_seat_sub_entity_1 = require("./entity/sub/concert.seat.sub.entity");
const zone_entity_1 = require("./entity/zone.entity");
const concert_module_1 = require("./module/concert.module");
const genre_module_1 = require("./module/genre.module");
const seat_category_module_1 = require("./module/seat.category.module");
const s3_module_1 = require("./module/s3.module");
const cart_module_1 = require("./module/cart.module");
const cart_entity_1 = require("./entity/cart.entity");
const cart_item_entity_1 = require("./entity/cart.item.entity");
const price_enity_1 = require("./entity/price.enity");
const envFilePath = '../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            genre_module_1.GenreModule,
            concert_module_1.ConcertModule,
            seat_category_module_1.SeatCategoryModule,
            cart_module_1.CartModule,
            s3_module_1.S3Module,
            common_2.LogModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: path.resolve(__dirname, envFilePath),
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.register(keycloak_config_1.KeycloakConfig.getKeycloakConfig()),
            common_2.MiddlewareModule,
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.BUSINESS_SERVICE_DB_HOST,
                port: Number.parseInt(process.env.BUSINESS_SERVICE_DB_PORT ?? '5432'),
                username: process.env.BUSINESS_SERVICE_DB_USERNAME,
                password: process.env.BUSINESS_SERVICE_DB_PASSWORD,
                database: process.env.BUSINESS_SERVICE_DB_DATABASE,
                schema: process.env.BUSINESS_SERVICE_DB_SCHEMA,
                models: [
                    artist_entity_1.Artist,
                    director_entity_1.Director,
                    concert_entity_1.Concert,
                    cart_entity_1.Cart,
                    cart_item_entity_1.CartItem,
                    genre_entity_1.Genre,
                    image_entity_1.Image,
                    show_time_entity_1.ShowTime,
                    concert_genre_sub_entity_1.ConcertGenre,
                    seat_entity_1.Seat,
                    floor_entity_1.Floor,
                    price_enity_1.Price,
                    seat_category_1.SeatCategory,
                    room_entity_1.Room,
                    zone_entity_1.Zone,
                    concert_seat_sub_entity_1.ConcertSeat,
                ],
                define: {
                    timestamps: true,
                },
                dialectOptions: {
                    useUTC: false,
                    dateStrings: true,
                },
                autoLoadModels: true,
                synchronize: true,
                timezone: '+07:00',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            common_2.HttpResponseFactory,
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('default'),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: common_2.GlobalAuthGuard,
            },
            nest_keycloak_connect_1.AuthGuard,
            nest_keycloak_connect_1.ResourceGuard,
            nest_keycloak_connect_1.RoleGuard,
            common_2.SkipAuthGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map