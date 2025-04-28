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
exports.CartMapper = void 0;
const common_1 = require("@nestjs/common");
const cart_dto_1 = require("../../dto/request/cart.dto");
const cart_entity_1 = require("../../entity/cart.entity");
const uuid_1 = require("uuid");
const symbol_1 = require("../../constants/symbol");
let CartMapper = class CartMapper {
    constructor(cartItemMapper) {
        this.cartItemMapper = cartItemMapper;
    }
    toDto(entity) {
        const cartDto = new cart_dto_1.CartDto();
        cartDto.id = entity.id;
        cartDto.userId = entity.userId;
        cartDto.cartItems = this.cartItemMapper.toDtos(entity.cartItems);
        return cartDto;
    }
    toEntity(dto) {
        const cart = new cart_entity_1.Cart();
        cart.id = dto.id ?? (0, uuid_1.v4)();
        cart.userId = dto.userId;
        cart.cartItems = this.cartItemMapper.toEntities(dto.cartItems);
        return cart;
    }
    toDtos(entities) {
        const cartDtos = [];
        for (const entity of entities) {
            const cartDto = this.toDto(entity);
            cartDtos.push(cartDto);
        }
        return cartDtos;
    }
    toEntities(dtos) {
        const carts = [];
        for (const dto of dtos) {
            const cart = this.toEntity(dto);
            carts.push(cart);
        }
        return carts;
    }
};
exports.CartMapper = CartMapper;
exports.CartMapper = CartMapper = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(symbol_1.ICartItemMapperToken)),
    __metadata("design:paramtypes", [Object])
], CartMapper);
//# sourceMappingURL=cart.mapper.impl.js.map