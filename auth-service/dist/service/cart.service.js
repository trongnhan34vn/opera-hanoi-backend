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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const ServiceConstant_1 = require("../constants/ServiceConstant");
let CartService = class CartService {
    constructor(httpService, logger) {
        this.httpService = httpService;
        this.logger = logger;
    }
    async createCart(userId) {
        try {
            this.logger.log(`Start create cart for user [${userId}]`);
            const cart = {
                userId,
            };
            const headers = {
                apiKey: ServiceConstant_1.API_KEY,
            };
            const response = await this.httpService.call(common_lib_1.HttpMethod.POST, ServiceConstant_1.CONCERT_SERVICE_BASEURL, ServiceConstant_1.CONCERT_SERVICE_PATH + ServiceConstant_1.CONCERT_SERVICE_CREATE_CART_ENDPOINT, headers, cart);
            if (!response) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'Error occurred when creating cart for user');
            }
            this.logger.log('Cart created');
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_lib_1.HttpServiceFactory,
        common_lib_1.LoggerFactory])
], CartService);
//# sourceMappingURL=cart.service.js.map