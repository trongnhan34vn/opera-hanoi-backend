"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("common");
const SkipAuthGuardAnnotationConfig_1 = require("../config/SkipAuthGuardAnnotationConfig");
const UserSignIn_dto_1 = require("../dto/request/UserSignIn.dto");
const UserSignUp_dto_1 = require("../dto/request/UserSignUp.dto");
const auth_service_1 = require("../service/auth.service");
let AuthController = class AuthController {
    constructor(responseFactory, authService) {
        this.responseFactory = responseFactory;
        this.authService = authService;
    }
    async signIn(res, userSignInDto) {
        const response = await this.authService.signIn(userSignInDto);
        return this.responseFactory.sendOKResponse(res, 'Sign In successfully', response);
    }
    async signUp(res, userDto) {
        const response = await this.authService.signUp(userDto);
        return this.responseFactory.sendOKResponse(res, 'Sign Up successfully', response);
    }
    async signInAdmin(res, userDto) {
        const response = await this.authService.signInAdmin(userDto);
        return this.responseFactory.sendOKResponse(res, 'Sign in successfully', response);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/sign-in'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserSignIn_dto_1.UserSignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserSignUp_dto_1.UserSignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/sign-in-admin'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserSignIn_dto_1.UserSignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInAdmin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/api/v1/auth'),
    __metadata("design:paramtypes", [common_2.HttpResponseFactory,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map