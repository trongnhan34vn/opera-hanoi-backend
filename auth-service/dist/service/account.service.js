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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const ServiceConstant_1 = require("../constants/ServiceConstant");
const http_service_factory_impl_1 = require("common/dist/factory/impl/http.service.factory.impl");
const logger_factory_impl_1 = require("common/dist/factory/impl/logger.factory.impl");
const http_content_enum_1 = require("common/dist/enum/http.content.enum");
const common_2 = require("common");
let AccountService = class AccountService {
    constructor(httpService, logger) {
        this.httpService = httpService;
        this.logger = logger;
    }
    async save(userDto) {
        try {
            this.logger.log(`Start save user [${userDto.email}] to account service...`);
            const headers = {
                contentType: http_content_enum_1.HttpContentType.JSON,
                apiKey: ServiceConstant_1.API_KEY,
            };
            const endpoint = {
                baseURL: ServiceConstant_1.ACCOUNT_SERVICE_BASEURL,
                path: ServiceConstant_1.ACCOUNT_SERVICE_PATH + ServiceConstant_1.ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS,
            };
            const response = await this.httpService.call(endpoint, common_2.HttpMethod.POST, userDto, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from account-service is null');
            }
            const successResponse = response.data;
            const createdUser = successResponse.data;
            if (!createdUser) {
                throw new common_1.InternalServerErrorException('Data response from account-service is null');
            }
            this.logger.log(`Saved user [${userDto.email}] successfully!`);
            return createdUser.id;
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
        finally {
            this.logger.log('End saved user.');
        }
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_service_factory_impl_1.HttpServiceFactory,
        logger_factory_impl_1.LoggerFactory])
], AccountService);
//# sourceMappingURL=account.service.js.map