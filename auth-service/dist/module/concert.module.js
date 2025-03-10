"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertModule = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const cart_service_1 = require("../service/cart.service");
let ConcertModule = class ConcertModule {
};
exports.ConcertModule = ConcertModule;
exports.ConcertModule = ConcertModule = __decorate([
    (0, common_1.Module)({
        imports: [common_lib_1.HttpServiceModule],
        providers: [
            common_lib_1.HttpResponseFactory,
            {
                provide: common_lib_1.LoggerFactory,
                useFactory: () => new common_lib_1.LoggerFactory('cart-service'),
            },
            cart_service_1.CartService,
        ],
        exports: [cart_service_1.CartService],
    })
], ConcertModule);
//# sourceMappingURL=concert.module.js.map