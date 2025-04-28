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
const common_2 = require("common");
const symbol_1 = require("../constants/symbol");
const cart_dto_1 = require("../dto/request/cart.dto");
const cart_item_dto_1 = require("../dto/request/cart.item.dto");
let CartController = class CartController {
    constructor(cartService, carItemService, responseFactory) {
        this.cartService = cartService;
        this.carItemService = carItemService;
        this.responseFactory = responseFactory;
    }
    async createCart(res, cartDto) {
        const cart = await this.cartService.save(cartDto);
        return this.responseFactory.sendCreatedResponse(res, `Cart [${cart.id}] is created`, cart);
    }
    async addToCart(res, cartItemDto) {
        const createdCartItem = await this.carItemService.save(cartItemDto);
        return this.responseFactory.sendCreatedResponse(res, `Cart Item [${createdCartItem.id}] is created`, createdCartItem);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_dto_1.CartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "createCart", null);
__decorate([
    (0, common_1.Post)('/add-to-cart'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_item_dto_1.CartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('/api/v1/business/carts'),
    __param(0, (0, common_1.Inject)(symbol_1.ICartServiceToken)),
    __param(1, (0, common_1.Inject)(symbol_1.ICartItemServiceToken)),
    __metadata("design:paramtypes", [Object, Object, common_2.HttpResponseFactory])
], CartController);
//# sourceMappingURL=cart.controller.js.map