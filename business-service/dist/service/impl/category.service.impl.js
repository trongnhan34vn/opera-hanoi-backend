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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_impl_1 = require("../../repository/impl/category.repository.impl");
const common_lib_1 = require("common-lib");
const category_mapper_impl_1 = require("../../mapper/impl/category.mapper.impl");
const sequelize_typescript_1 = require("sequelize-typescript");
let CategoryService = class CategoryService {
    constructor(categoryRepository, logger, categoryMapper, sequelize) {
        this.categoryRepository = categoryRepository;
        this.logger = logger;
        this.categoryMapper = categoryMapper;
        this.sequelize = sequelize;
    }
    async save(dto) {
        const transaction = await this.sequelize.transaction();
        try {
            const category = this.categoryMapper.toEntity(dto);
            if (!dto.id) {
                const createdCategory = await this.categoryRepository.create(category, transaction);
                await transaction.commit();
                return createdCategory;
            }
            const updatedCategory = await this.categoryRepository.update(category, transaction);
            await transaction.commit();
            return updatedCategory;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async findAll() {
        return await this.categoryRepository.findAll();
    }
    async findById(id) {
        return await this.categoryRepository.findById(id);
    }
    async remove(id) {
        await this.categoryRepository.remove(id);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_impl_1.CategoryRepository,
        common_lib_1.LoggerFactory,
        category_mapper_impl_1.CategoryMapper,
        sequelize_typescript_1.Sequelize])
], CategoryService);
//# sourceMappingURL=category.service.impl.js.map