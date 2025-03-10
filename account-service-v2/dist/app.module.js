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
const path = require("node:path");
const common_lib_1 = require("common-lib");
const KeycloakConfig_1 = require("./config/KeycloakConfig");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const GlobalAuthGuard_1 = require("./config/GlobalAuthGuard");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("./entity/user.entity");
const user_controller_1 = require("./controller/user.controller");
const SkipAuthGuard_1 = require("./config/SkipAuthGuard");
const user_module_1 = require("./module/user.module");
const process = require("node:process");
const envFilePath = '../.env.local';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            common_lib_1.LogModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: path.resolve(__dirname, envFilePath),
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.register(KeycloakConfig_1.KeycloakConfig.getKeycloakConfig()),
            common_lib_1.MiddlewareModule,
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.ACCOUNT_SERVICE_DB_HOST,
                port: Number.parseInt(process.env.ACCOUNT_SERVICE_DB_PORT ?? '5432'),
                username: process.env.ACCOUNT_SERVICE_DB_USERNAME,
                password: process.env.ACCOUNT_SERVICE_DB_PASSWORD,
                database: process.env.ACCOUNT_SERVICE_DB_DATABASE,
                schema: process.env.ACCOUNT_SERVICE_DB_SCHEMA,
                models: [user_entity_1.User],
                define: {
                    timestamps: true,
                },
                dialectOptions: {
                    useUTC: false,
                    dateStrings: true,
                },
                timezone: '+07:00',
                autoLoadModels: true,
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController],
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