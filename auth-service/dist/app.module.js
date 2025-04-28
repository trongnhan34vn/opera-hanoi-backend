"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_2 = require("common");
const auth_controller_1 = require("./controller/auth.controller");
const auth_module_1 = require("./module/auth.module");
const config_1 = require("@nestjs/config");
const path = __importStar(require("node:path"));
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const KeycloakConfig_1 = require("./config/KeycloakConfig");
const GlobalAuthGuard_1 = require("./config/GlobalAuthGuard");
const core_1 = require("@nestjs/core");
const SkipAuthGuard_1 = require("./config/SkipAuthGuard");
const concert_module_1 = require("./module/concert.module");
const auth_error_controller_1 = require("./controller/auth.error.controller");
const envFilePath = '../.env.local';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            concert_module_1.ConcertModule,
            common_2.LogModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: path.resolve(__dirname, envFilePath),
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.register(KeycloakConfig_1.KeycloakConfig.getKeycloakConfig()),
            common_2.MiddlewareModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [
            app_service_1.AppService,
            common_2.HttpResponseFactory,
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('default'),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: GlobalAuthGuard_1.GlobalAuthGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: auth_error_controller_1.AuthErrorController,
            },
            nest_keycloak_connect_1.AuthGuard,
            nest_keycloak_connect_1.ResourceGuard,
            nest_keycloak_connect_1.RoleGuard,
            SkipAuthGuard_1.SkipAuthGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map