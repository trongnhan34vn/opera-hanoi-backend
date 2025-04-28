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
exports.S3Controller = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const symbol_1 = require("../constants/symbol");
let S3Controller = class S3Controller {
    constructor(s3Service, httpResponseFactory) {
        this.s3Service = s3Service;
        this.httpResponseFactory = httpResponseFactory;
    }
    async uploadS3Files(res, files) {
        const urls = await this.s3Service.uploadMultipleFilesToS3(files);
        return this.httpResponseFactory.sendOKResponse(res, 'Upload Multiple File Success', urls);
    }
};
exports.S3Controller = S3Controller;
__decorate([
    (0, common_1.Post)('/upload'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "uploadS3Files", null);
exports.S3Controller = S3Controller = __decorate([
    (0, common_1.Controller)('/api/v1/business/s3'),
    __param(0, (0, common_1.Inject)(symbol_1.IS3ServiceToken)),
    __metadata("design:paramtypes", [Object, common_2.HttpResponseFactory])
], S3Controller);
//# sourceMappingURL=s3.controller.js.map