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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const cart_dto_1 = require("../dto/request/cart.dto");
const cart_service_impl_1 = require("../service/impl/cart.service.impl");
const cart_item_dto_1 = require("../dto/request/cart.item.dto");
const SkipAuthGuardAnnotationConfig_1 = require("../config/SkipAuthGuardAnnotationConfig");
const cart_item_service_impl_1 = require("../service/impl/cart.item.service.impl");
let CartController = class CartController {
    constructor(cartService, cartItemService, httpResponseFactory) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.httpResponseFactory = httpResponseFactory;
    }
    async createCart(res, cartDto) {
        const cart = await this.cartService.create(cartDto);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.CREATED, common_lib_1.SuccessMessage.CREATED.getCode, `New cart is created [${cart.id}]`, cart);
    }
    async addToCart(res, cartItemDto) {
        const cartItem = await this.cartItemService.addToCart(cartItemDto);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.CREATED, common_lib_1.SuccessMessage.CREATED.getCode, `Added to cart [${cartItem.id}]`, cartItem);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('/'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_dto_1.CartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "createCart", null);
__decorate([
    (0, common_1.Post)('/add-to-cart'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_item_dto_1.CartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('/api/v1/business/carts'),
    __metadata("design:paramtypes", [cart_service_impl_1.CartService,
        cart_item_service_impl_1.CartItemService,
        common_lib_1.HttpResponseFactory])
], CartController);
//# sourceMappingURL=cart.controller.js.map