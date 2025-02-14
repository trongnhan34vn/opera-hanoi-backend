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
exports.CategoryRepository = void 0;
const category_entity_1 = require("../../entity/category.entity");
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const common_lib_1 = require("common-lib");
const sequelize_1 = require("@nestjs/sequelize");
let CategoryRepository = class CategoryRepository {
    constructor(category, sequelize) {
        this.category = category;
        this.sequelize = sequelize;
    }
    async findAll() {
        return await this.category.findAll();
    }
    async create(entity, transaction) {
        return await entity.save({ transaction });
    }
    async update(entity, transaction) {
        return await entity.update({ ...entity, updatedAt: new Date(Date.now()) }, { transaction });
    }
    async findById(id) {
        const category = await this.category.findOne({ where: { id } });
        if (!category)
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `Category not found with id [${id}]`);
        return category;
    }
    async remove(id) {
        const category = await this.findById(id);
        await category.destroy();
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(category_entity_1.Category)),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize])
], CategoryRepository);
//# sourceMappingURL=category.repository.impl.js.map