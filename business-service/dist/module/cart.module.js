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
const common_lib_1 = require("common-lib");
const sequelize_1 = require("@nestjs/sequelize");
const cart_entity_1 = require("../entity/cart.entity");
const cart_item_entity_1 = require("../entity/cart.item.entity");
const cart_service_impl_1 = require("../service/impl/cart.service.impl");
const cart_item_service_impl_1 = require("../service/impl/cart.item.service.impl");
const cart_repository_impl_1 = require("../repository/impl/cart.repository.impl");
const cart_item_repository_impl_1 = require("../repository/impl/cart.item.repository.impl");
const cart_mapper_impl_1 = require("../mapper/impl/cart.mapper.impl");
const cart_item_mapper_impl_1 = require("../mapper/impl/cart.item.mapper.impl");
const cart_controller_1 = require("../controller/cart.controller");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_lib_1.LogModule,
            common_lib_1.HttpServiceModule,
            sequelize_1.SequelizeModule.forFeature([cart_entity_1.Cart, cart_item_entity_1.CartItem]),
        ],
        controllers: [cart_controller_1.CartController],
        providers: [
            cart_service_impl_1.CartService,
            cart_item_service_impl_1.CartItemService,
            cart_repository_impl_1.CartRepository,
            cart_mapper_impl_1.CartMapper,
            cart_item_mapper_impl_1.CartItemMapper,
            cart_item_repository_impl_1.CartItemRepository,
            common_lib_1.HttpResponseFactory,
            {
                provide: common_lib_1.LoggerFactory,
                useFactory: () => new common_lib_1.LoggerFactory('cart-service'),
            },
        ],
        exports: [cart_service_impl_1.CartService],
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map