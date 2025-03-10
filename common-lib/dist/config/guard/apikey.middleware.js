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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const ResourceException_error_1 = require("../../factory/error/ResourceException.error");
const ErrorMessage_entity_1 = require("../../factory/message/ErrorMessage.entity");
const config_1 = require("@nestjs/config");
let ApiKeyMiddleware = class ApiKeyMiddleware {
    constructor(configService) {
        this.configService = configService;
    }
    use(req, res, next) {
        const API_KEY_HEADER = 'x-api-key';
        const apiKey = req.headers[API_KEY_HEADER];
        const validApiKey = this.configService.get('API_KEY');
        const isValidApiKey = !apiKey || apiKey !== validApiKey;
        if (isValidApiKey) {
            throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.UNAUTHORIZED.getCode, ErrorMessage_entity_1.ErrorMessage.UNAUTHORIZED.getMessage, 'Unauthorized');
        }
        next();
    }
};
exports.ApiKeyMiddleware = ApiKeyMiddleware;
exports.ApiKeyMiddleware = ApiKeyMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiKeyMiddleware);
//# sourceMappingURL=apikey.middleware.js.map