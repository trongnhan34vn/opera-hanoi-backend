"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreMapper = void 0;
const genre_dto_1 = require("../../dto/request/genre.dto");
const genre_entity_1 = require("../../entity/genre.entity");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const common_2 = require("common");
const code_entities_enum_1 = require("../../entity/enum/code.entities.enum");
let GenreMapper = class GenreMapper {
    toDtos(entities) {
        throw new Error('Method not implemented.');
    }
    toEntities(dtos) {
        throw new Error('Method not implemented.');
    }
    toDto(entity) {
        const categoryDto = new genre_dto_1.GenreDto();
        categoryDto.id = entity.id;
        categoryDto.code = entity.code;
        categoryDto.description = entity.description;
        categoryDto.title = entity.title;
        return categoryDto;
    }
    toEntity(dto) {
        const category = new genre_entity_1.Genre();
        category.id = dto.id ? dto.id : (0, uuid_1.v4)();
        category.title = dto.title;
        category.code = common_2.CodeGenerator.generateCode(code_entities_enum_1.CodeEntitiesEnum.GENRE, category.id);
        category.description = dto.description;
        return category;
    }
};
exports.GenreMapper = GenreMapper;
exports.GenreMapper = GenreMapper = __decorate([
    (0, common_1.Injectable)()
], GenreMapper);
//# sourceMappingURL=genre.mapper.impl.js.map