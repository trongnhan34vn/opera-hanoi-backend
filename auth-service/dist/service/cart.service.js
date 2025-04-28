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
const ServiceConstant_1 = require("../constants/ServiceConstant");
const common_2 = require("common");
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
            const endpoint = {
                baseURL: ServiceConstant_1.BUSINESS_SERVICE_BASEURL,
                path: ServiceConstant_1.BUSINESS_SERVICE_PATH + ServiceConstant_1.BUSINESS_SERVICE_CREATE_CART_ENDPOINT,
            };
            const response = await this.httpService.call(endpoint, common_2.HttpMethod.POST, cart, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Error occurred when creating cart for user');
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
    __metadata("design:paramtypes", [common_2.HttpServiceFactory,
        common_2.LoggerFactory])
], CartService);
//# sourceMappingURL=cart.service.js.map