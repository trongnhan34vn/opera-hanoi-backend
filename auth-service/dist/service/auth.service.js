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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const keycloak_service_1 = require("./keycloak.service");
const UserSignUp_dto_1 = require("../dto/request/UserSignUp.dto");
const UserSignIn_dto_1 = require("../dto/request/UserSignIn.dto");
const account_service_1 = require("./account.service");
const cart_service_1 = require("./cart.service");
const jwt = __importStar(require("jsonwebtoken"));
const KeycloakTokenResponse_dto_1 = require("../dto/response/KeycloakTokenResponse.dto");
const class_transformer_1 = require("class-transformer");
let AuthService = class AuthService {
    constructor(keycloakService, logger, accountService, cartService) {
        this.keycloakService = keycloakService;
        this.logger = logger;
        this.accountService = accountService;
        this.cartService = cartService;
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
    async signInAdmin(userLogin) {
        try {
            const response = await this.signIn(userLogin);
            const tokenResponse = (0, class_transformer_1.plainToInstance)(KeycloakTokenResponse_dto_1.KeycloakTokenResponse, response, {
                excludeExtraneousValues: true,
            });
            const accessToken = tokenResponse.accessToken;
            const decodedToken = jwt.decode(accessToken);
            const realmAccess = decodedToken['realm_access'];
            const roles = realmAccess['roles'];
            let isAdmin = false;
            roles.forEach((role) => {
                if (role.includes('ADMIN')) {
                    isAdmin = true;
                }
            });
            if (!isAdmin) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.UNAUTHORIZED.getCode, common_lib_1.ErrorMessage.UNAUTHORIZED.getMessage, 'Account is unauthorized');
            }
            tokenResponse.email = decodedToken['email'];
            return tokenResponse;
        }
        catch (error) {
            this.logger.error('Error occurred while signing in admin account', error);
            throw error;
        }
    }
    async signUp(userSignUp) {
        try {
            await this.keycloakService.signUp(userSignUp);
            const userId = await this.accountService.save(userSignUp);
            await this.cartService.createCart(userId);
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
__decorate([
    (0, common_lib_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSignIn_dto_1.UserSignInDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signIn", null);
__decorate([
    (0, common_lib_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSignUp_dto_1.UserSignUpDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signUp", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [keycloak_service_1.KeycloakService,
        common_lib_1.LoggerFactory,
        account_service_1.AccountService,
        cart_service_1.CartService])
], AuthService);
//# sourceMappingURL=auth.service.js.map