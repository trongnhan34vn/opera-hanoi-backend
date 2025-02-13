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
exports.ConcertMapper = void 0;
const concert_dto_1 = require("../../dto/request/concert.dto");
const concert_entity_1 = require("../../entity/concert.entity");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const category_service_impl_1 = require("../../service/impl/category.service.impl");
let ConcertMapper = class ConcertMapper {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    toDto(entity) {
        const concertDto = new concert_dto_1.ConcertDto();
        concertDto.id = entity.id;
        concertDto.art = entity.art;
        concertDto.title = entity.title;
        concertDto.director = entity.director;
        concertDto.description = entity.description;
        return concertDto;
    }
    toEntity(dto) {
        const concert = new concert_entity_1.Concert();
        concert.id = dto.id ? dto.id : (0, uuid_1.v4)();
        concert.art = dto.art;
        concert.director = dto.director;
        concert.title = dto.title;
        concert.description = dto.description;
        return concert;
    }
};
exports.ConcertMapper = ConcertMapper;
exports.ConcertMapper = ConcertMapper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_service_impl_1.CategoryService])
], ConcertMapper);
//# sourceMappingURL=concert.mapper.impl.js.map