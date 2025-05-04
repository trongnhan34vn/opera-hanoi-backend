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
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("common");
const dotenv = __importStar(require("dotenv"));
const process = __importStar(require("node:process"));
const path = __importStar(require("path"));
const auth_controller_1 = require("../controller/auth.controller");
const auth_service_1 = require("../service/auth.service");
const account_module_1 = require("./account.module");
const concert_module_1 = require("./concert.module");
const keycloak_module_1 = require("./keycloak.module");
const envFilePath = '../../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [common_2.HttpServiceModule, keycloak_module_1.KeycloakModule, account_module_1.AccountModule, concert_module_1.ConcertModule],
        providers: [
            auth_service_1.AuthService,
            common_2.HttpResponseFactory,
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('auth-service'),
            },
            {
                provide: common_2.IS3ServiceToken,
                useClass: common_2.S3Service,
            },
            {
                provide: common_2.AwsS3ClientFactory,
                useFactory: () => {
                    return (0, common_2.AwsS3ClientFactory)({
                        region: 'us-west-2',
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                        s3BucketName: process.env.AWS_S3_BUCKET_NAME,
                        cloudFrontDomain: process.env.AWS_CLOUDFRONT_DOMAIN
                    });
                }
            }
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, common_2.IS3ServiceToken],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map