"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemMapper = void 0;
const common_1 = require("@nestjs/common");
const cart_item_dto_1 = require("../../dto/request/cart.item.dto");
const cart_item_entity_1 = require("../../entity/cart.item.entity");
const uuid_1 = require("uuid");
let CartItemMapper = class CartItemMapper {
    toDto(entity) {
        const cartItemDto = new cart_item_dto_1.CartItemDto();
        cartItemDto.id = entity.id;
        cartItemDto.price = entity.price;
        cartItemDto.concertSeatId = entity.concertSeatId;
        cartItemDto.cartId = entity.cartId;
        return cartItemDto;
    }
    toEntity(dto) {
        const cartItem = new cart_item_entity_1.CartItem();
        cartItem.id = dto.id ? dto.id : (0, uuid_1.v4)();
        cartItem.cartId = dto.cartId;
        cartItem.price = dto.price;
        cartItem.concertSeatId = dto.concertSeatId;
        return cartItem;
    }
    toDtos(entities) {
        const cartItemDtos = [];
        for (const entity of entities) {
            const cartItemDto = this.toDto(entity);
            cartItemDtos.push(cartItemDto);
        }
        return cartItemDtos;
    }
    toEntities(dtos) {
        const cartItems = [];
        for (const dto of dtos) {
            const cartItem = this.toEntity(dto);
            cartItems.push(cartItem);
        }
        return cartItems;
    }
};
exports.CartItemMapper = CartItemMapper;
exports.CartItemMapper = CartItemMapper = __decorate([
    (0, common_1.Injectable)()
], CartItemMapper);
//# sourceMappingURL=cart.item.mapper.impl.js.map