"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMapper = void 0;
const category_dto_1 = require("../../dto/request/category.dto");
const category_entity_1 = require("../../entity/category.entity");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let CategoryMapper = class CategoryMapper {
    toDto(entity) {
        const categoryDto = new category_dto_1.CategoryDto();
        categoryDto.id = entity.id;
        categoryDto.description = entity.description;
        categoryDto.title = entity.title;
        return categoryDto;
    }
    toEntity(dto) {
        const category = new category_entity_1.Category();
        category.id = dto.id ? dto.id : (0, uuid_1.v4)();
        category.title = dto.title;
        category.description = dto.description;
        return category;
    }
};
exports.CategoryMapper = CategoryMapper;
exports.CategoryMapper = CategoryMapper = __decorate([
    (0, common_1.Injectable)()
], CategoryMapper);
//# sourceMappingURL=category.mapper.impl.js.map