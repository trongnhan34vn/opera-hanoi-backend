"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("common");
const symbol_1 = require("../constants/symbol");
const cart_controller_1 = require("../controller/cart.controller");
const cart_entity_1 = require("../entity/cart.entity");
const cart_item_entity_1 = require("../entity/cart.item.entity");
const cart_item_mapper_impl_1 = require("../mapper/impl/cart.item.mapper.impl");
const cart_mapper_impl_1 = require("../mapper/impl/cart.mapper.impl");
const cart_item_repository_impl_1 = require("../repository/impl/cart.item.repository.impl");
const cart_repository_impl_1 = require("../repository/impl/cart.repository.impl");
const cart_item_service_impl_1 = require("../service/impl/cart.item.service.impl");
const cart_service_impl_1 = require("../service/impl/cart.service.impl");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([cart_entity_1.Cart, cart_item_entity_1.CartItem])],
        providers: [
            {
                provide: symbol_1.ICartRepositoryToken,
                useClass: cart_repository_impl_1.CartRepository,
            },
            {
                provide: symbol_1.ICartServiceToken,
                useClass: cart_service_impl_1.CartService,
            },
            {
                provide: symbol_1.ICartMapperToken,
                useClass: cart_mapper_impl_1.CartMapper,
            },
            {
                provide: symbol_1.ICartItemRepositoryToken,
                useClass: cart_item_repository_impl_1.CartItemRepository,
            },
            {
                provide: symbol_1.ICartItemServiceToken,
                useClass: cart_item_service_impl_1.CartItemService,
            },
            {
                provide: symbol_1.ICartItemMapperToken,
                useClass: cart_item_mapper_impl_1.CartItemMapper,
            },
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('cart-service'),
            },
            common_2.HttpResponseFactory,
        ],
        controllers: [cart_controller_1.CartController],
        exports: [symbol_1.ICartItemServiceToken, symbol_1.ICartServiceToken],
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map