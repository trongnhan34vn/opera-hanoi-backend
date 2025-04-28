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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const symbol_1 = require("../../constants/symbol");
const sequelize_typescript_1 = require("sequelize-typescript");
let CartItemService = class CartItemService {
    constructor(cartItemRepository, cartItemMapper, sequelize) {
        this.cartItemRepository = cartItemRepository;
        this.cartItemMapper = cartItemMapper;
        this.sequelize = sequelize;
    }
    async save(dto) {
        try {
            const transaction = await this.sequelize.transaction();
            const cartItem = this.cartItemMapper.toEntity(dto);
            if (!dto.id) {
                const createdCartItem = await this.cartItemRepository.create(cartItem, transaction);
                return this.cartItemMapper.toDto(createdCartItem);
            }
            const updatedCart = await this.cartItemRepository.update(cartItem, transaction);
            return this.cartItemMapper.toDto(updatedCart);
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        const cartItems = await this.cartItemRepository.findAll();
        return this.cartItemMapper.toDtos(cartItems);
    }
    async findById(id) {
        const cartItem = await this.cartItemRepository.findById(id);
        return this.cartItemMapper.toDto(cartItem);
    }
    async remove(id) {
        await this.cartItemRepository.remove(id);
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(symbol_1.ICartItemRepositoryToken)),
    __param(1, (0, common_1.Inject)(symbol_1.ICartMapperToken)),
    __metadata("design:paramtypes", [Object, Object, sequelize_typescript_1.Sequelize])
], CartItemService);
//# sourceMappingURL=cart.item.service.impl.js.map