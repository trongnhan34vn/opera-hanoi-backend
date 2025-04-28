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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("common");
const symbol_1 = require("../../constants/symbol");
const sequelize_typescript_1 = require("sequelize-typescript");
let CartService = class CartService {
    constructor(cartRepository, cartMapper, logger, sequelize) {
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.logger = logger;
        this.sequelize = sequelize;
    }
    async save(dto) {
        const transaction = await this.sequelize.transaction();
        const cart = this.cartMapper.toEntity(dto);
        try {
            if (!dto.id) {
                const createdCart = await this.cartRepository.create(cart, transaction);
                this.logger.log(`Cart [${createdCart.id}] is created`);
                return this.cartMapper.toDto(createdCart);
            }
            const updatedCart = await this.cartRepository.update(cart, transaction);
            this.logger.log(`Cart [${updatedCart.id}] is updated`);
            return this.cartMapper.toDto(updatedCart);
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        throw new Error('Method not implemented.');
    }
    async findById(id) {
        try {
            const cart = await this.cartRepository.findById(id);
            return this.cartMapper.toDto(cart);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        throw new Error('Method not implemented.');
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(symbol_1.ICartItemRepositoryToken)),
    __param(1, (0, common_1.Inject)(symbol_1.ICartMapperToken)),
    __metadata("design:paramtypes", [Object, Object, common_2.LoggerFactory,
        sequelize_typescript_1.Sequelize])
], CartService);
//# sourceMappingURL=cart.service.impl.js.map