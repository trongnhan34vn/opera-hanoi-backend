"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatCategoryMapper = void 0;
const common_1 = require("@nestjs/common");
const seat_category_dto_1 = require("../../dto/request/seat.category.dto");
let SeatCategoryMapper = class SeatCategoryMapper {
    toEntities(dtos) {
        throw new Error("Method not implemented.");
    }
    toDtos(entities) {
        const dtos = [];
        for (const entity of entities) {
            const dto = this.toDto(entity);
            dtos.push(dto);
        }
        return dtos;
    }
    toDto(entity) {
        const seatCategoryDto = new seat_category_dto_1.SeatCategoryDto();
        seatCategoryDto.id = entity.id;
        seatCategoryDto.name = entity.name;
        return seatCategoryDto;
    }
    toEntity(dto) {
        throw new Error("Method not implemented.");
    }
};
exports.SeatCategoryMapper = SeatCategoryMapper;
exports.SeatCategoryMapper = SeatCategoryMapper = __decorate([
    (0, common_1.Injectable)()
], SeatCategoryMapper);
//# sourceMappingURL=seat.category.mapper.impl.js.map