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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const common_2 = require("common");
const logger_factory_impl_1 = require("common/dist/factory/impl/logger.factory.impl");
const fs_1 = require("fs");
const jwt = __importStar(require("jsonwebtoken"));
const mime = __importStar(require("mime-types"));
const utils_1 = require("../uttil/utils");
const stream_1 = require("stream");
const uuid_1 = require("uuid");
const KeycloakTokenResponse_dto_1 = require("../dto/response/KeycloakTokenResponse.dto");
const account_service_1 = require("./account.service");
const cart_service_1 = require("./cart.service");
const keycloak_service_1 = require("./keycloak.service");
let AuthService = class AuthService {
    constructor(keycloakService, logger, accountService, cartService, s3Service) {
        this.keycloakService = keycloakService;
        this.logger = logger;
        this.accountService = accountService;
        this.cartService = cartService;
        this.s3Service = s3Service;
    }
    async signIn(userLogin) {
        try {
            return await this.keycloakService.signIn(userLogin);
        }
        catch (error) {
            this.logger.error(`Error occurred while signing in user [${userLogin.email}].`, error.stack);
            throw error;
        }
    }
    async createAdminAccount(accountDto) {
        const password = (0, utils_1.generatePassword)();
        try {
            const isCreated = await this.signUp({
                ...accountDto,
                password: password,
            });
            if (!isCreated)
                return false;
            const data = {
                username: accountDto.email,
                password: accountDto.password,
            };
            const header = 'Username,Password\n';
            const row = `${data.username},${data.password}`;
            const csvContent = header + row;
            const filename = 'credentials_' + (0, uuid_1.v4)();
            const path = 'src/credentials/' + filename;
            (0, common_2.writeCsvFile)(path, csvContent);
            const file = this.createMulterFileFromPath(path);
            const s3FilePath = 'credentials/' + filename;
            await this.s3Service.uploadFileToS3(file, s3FilePath);
            return true;
        }
        catch (error) {
            this.logger.error(`Error occurred while signing up user [${accountDto.email}].`, error.stack);
            await this.keycloakService.signUpTransaction(accountDto);
            throw error;
        }
    }
    createMulterFileFromPath(path) {
        const fileBuffer = (0, fs_1.readFileSync)(path);
        const mimeType = mime.lookup(path) || 'application/octet-stream';
        const fileName = path.split('/').pop() || 'unknown';
        const bufferStream = new stream_1.Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);
        const multerFile = {
            fieldname: 'file',
            originalname: fileName,
            encoding: '7bit',
            mimetype: mimeType,
            buffer: fileBuffer,
            size: fileBuffer.length,
            path: path,
            stream: bufferStream,
            filename: fileName,
            destination: 'src/credentials/',
        };
        return multerFile;
    }
    async signInAdmin(userLogin) {
        try {
            const response = await this.signIn(userLogin);
            const tokenResponse = (0, class_transformer_1.plainToInstance)(KeycloakTokenResponse_dto_1.KeycloakTokenResponse, response, {
                excludeExtraneousValues: true,
            });
            const accessToken = tokenResponse.accessToken;
            const decodedToken = jwt.decode(accessToken);
            const resourceAccess = decodedToken['resource_access'];
            if (!resourceAccess)
                throw new common_2.InternalServerException('Sign In Error', 'Internal Server Error! Sign In Error');
            const app = resourceAccess['hanoi-opera-app'];
            if (!app)
                throw new common_2.InternalServerException('Sign In Error', 'Internal Server Error! Sign In Error');
            const roles = app['roles'];
            if (!roles)
                throw new common_2.InternalServerException('Sign In Error', 'Internal Server Error! Sign In Error');
            let isAdmin = true;
            roles.forEach((role) => {
                if (role.includes('CustomerRole')) {
                    isAdmin = false;
                }
            });
            if (!isAdmin) {
                throw new common_2.ForbiddenException(`Account [${userLogin.email}] doesn't have permission login to this app`, 'Account has no permission');
            }
            tokenResponse.email = decodedToken['email'];
            return tokenResponse;
        }
        catch (error) {
            this.logger.error(`Error occurred while signing in admin account [${userLogin.email}]`, error);
            const errorResponse = error;
            const status = errorResponse.getStatus();
            const isUnauthorized = status === common_1.HttpStatus.UNAUTHORIZED;
            if (isUnauthorized) {
                throw new common_2.UnauthorizedException('Unauthorized', 'Invalid User Credential');
            }
            throw error;
        }
    }
    async signUp(userSignUp) {
        try {
            const createdUser = await this.keycloakService.signUp(userSignUp);
            const userId = await this.accountService.save({
                ...userSignUp,
                keycloakId: createdUser.id,
            });
            const { roles } = userSignUp;
            if (roles.size === 0) {
                await this.cartService.createCart(userId);
            }
            return true;
        }
        catch (error) {
            this.logger.error(`Error occurred while signing up user [${userSignUp.email}].`, error.stack);
            await this.keycloakService.signUpTransaction(userSignUp);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)(common_2.IS3ServiceToken)),
    __metadata("design:paramtypes", [keycloak_service_1.KeycloakService,
        logger_factory_impl_1.LoggerFactory,
        account_service_1.AccountService,
        cart_service_1.CartService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map