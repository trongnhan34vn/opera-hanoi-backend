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
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const common_2 = require("common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const path = __importStar(require("node:path"));
const dotenv = __importStar(require("dotenv"));
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const keycloak_config_1 = require("./config/keycloak.config");
const account_module_1 = require("./module/account.module");
const keycloak_module_1 = require("./module/keycloak.module");
const concert_module_1 = require("./module/concert.module");
const auth_module_1 = require("./module/auth.module");
const envFilePath = '../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            account_module_1.AccountModule,
            keycloak_module_1.KeycloakModule,
            concert_module_1.ConcertModule,
            auth_module_1.AuthModule,
            common_2.LogModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: path.resolve(__dirname, envFilePath),
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.register(keycloak_config_1.KeycloakConfig.getKeycloakConfig()),
            common_2.MiddlewareModule,
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