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
const cart_repository_impl_1 = require("../../repository/impl/cart.repository.impl");
const cart_mapper_impl_1 = require("../../mapper/impl/cart.mapper.impl");
const common_lib_1 = require("common-lib");
const sequelize_typescript_1 = require("sequelize-typescript");
let CartService = class CartService {
    constructor(cartRepository, cartMapper, logger, sequelize) {
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.logger = logger;
        this.sequelize = sequelize;
    }
    save(dto) {
        throw new Error('Method not implemented.');
    }
    async create(dto) {
        const transaction = await this.sequelize.transaction();
        try {
            const cart = this.cartMapper.toEntity(dto);
            const entity = await this.cartRepository.create(cart, transaction);
            this.logger.log(`Cart created [${entity.id}]`);
            await transaction.commit();
            return entity;
        }
        catch (error) {
            await transaction.rollback();
            this.logger.error(error);
            throw error;
        }
    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    remove(id) {
        throw new Error('Method not implemented.');
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_impl_1.CartRepository,
        cart_mapper_impl_1.CartMapper,
        common_lib_1.LoggerFactory,
        sequelize_typescript_1.Sequelize])
], CartService);
//# sourceMappingURL=cart.service.impl.js.map