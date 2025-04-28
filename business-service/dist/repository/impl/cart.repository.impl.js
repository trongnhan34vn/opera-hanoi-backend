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
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const cart_entity_1 = require("../../entity/cart.entity");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("common");
let CartRepository = class CartRepository {
    constructor(cartItemModel) {
        this.cartItemModel = cartItemModel;
    }
    async create(entity, transaction) {
        return await entity.save({ transaction });
    }
    async update(entity, transaction) {
        return await entity.update({ ...entity, updatedAt: new Date(Date.now()) }, { transaction });
    }
    async findById(id) {
        const cart = await this.cartItemModel.findOne({ where: { id } });
        if (!cart)
            throw new common_2.NotFoundException(`Cart [${id}] Not Found`);
        return cart;
    }
    async remove(id) {
        const cart = await this.findById(id);
        if (!cart)
            throw new common_2.NotFoundException(`Cart [${id}] Not Found`);
        await cart.destroy();
    }
    async findAll() {
        return await this.cartItemModel.findAll();
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cart_entity_1.Cart)),
    __metadata("design:paramtypes", [Object])
], CartRepository);
//# sourceMappingURL=cart.repository.impl.js.map