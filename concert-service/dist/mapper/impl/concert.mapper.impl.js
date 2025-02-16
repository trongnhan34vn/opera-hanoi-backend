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
const showtime_dto_1 = require("../../dto/request/showtime.dto");
const moment = require("moment-timezone");
let ConcertMapper = class ConcertMapper {
    constructor() { }
    toDto(entity) {
        const concertDto = new concert_dto_1.ConcertDto();
        concertDto.id = entity.id;
        concertDto.art = entity.art;
        concertDto.title = entity.title;
        concertDto.director = entity.director;
        concertDto.description = entity.description;
        if (entity.images) {
            const dtoImages = [];
            for (const image of entity.images) {
                const imageDto = image.url;
                dtoImages.push(imageDto);
            }
            concertDto.images = dtoImages;
        }
        if (entity.showTimes) {
            const dtoShowTime = [];
            const showTimes = entity.showTimes;
            for (const showTime of showTimes) {
                const startTime = showTime.startTime;
                const endTime = showTime.endTime;
                const showTimeDto = new showtime_dto_1.ShowtimeDto();
                showTimeDto.startTime = moment(startTime).format('YYYY/MM/DD HH:ss:mm');
                showTimeDto.endTime = moment(endTime).format('YYYY/MM/DD HH:ss:mm');
                dtoShowTime.push(showTimeDto);
            }
            concertDto.showTimes = dtoShowTime;
        }
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
    __metadata("design:paramtypes", [])
], ConcertMapper);
//# sourceMappingURL=concert.mapper.impl.js.map