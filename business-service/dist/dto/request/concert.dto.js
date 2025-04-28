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
exports.ConcertDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ConcertDto {
}
exports.ConcertDto = ConcertDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ConcertDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ConcertDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ example: ['Anh Duy Tồ'], description: 'Artist' }),
    __metadata("design:type", Array)
], ConcertDto.prototype, "artists", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ example: ['Anh Duy Tồ'], description: 'Director' }),
    __metadata("design:type", Array)
], ConcertDto.prototype, "directors", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Anh Duy Tồ', description: 'Title' }),
    __metadata("design:type", String)
], ConcertDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'Đây là chương trình của anh Duy tồ',
        description: 'description',
    }),
    __metadata("design:type", String)
], ConcertDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        example: ['7965d8fe-a144-47e7-90d9-e78cd7a54c1c', '38767a6d-fad6-4beb-ac0d-0a79e67ff428'],
        description: 'genres',
    }),
    __metadata("design:type", Array)
], ConcertDto.prototype, "genres", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ example: 'đây là ảnh', description: 'images' }),
    __metadata("design:type", Array)
], ConcertDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        example: [
            { startTime: '2025/04/14 12:00:00', endTime: '2025/04/14 14:00:00' },
        ],
        description: 'show time',
    }),
    __metadata("design:type", Array)
], ConcertDto.prototype, "showTimes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                seatCategoryId: '40a7b912-b9f3-43a3-a29a-07d6cd4ccdf1',
                priceValue: 1000000,
            },
            {
                seatCategoryId: '91d0db14-5aa9-4f96-b6e1-ac4c22942982',
                priceValue: 800000,
            },
            {
                seatCategoryId: '85bf58d1-8175-48a0-93a7-b25da7a2b66d',
                priceValue: 700000,
            },
            {
                seatCategoryId: '9bb22ffd-de50-4e86-b24b-cd17509566d3',
                priceValue: 500000,
            },
            {
                seatCategoryId: '70edc5c8-4c12-48b9-b72b-95dd63c6c184',
                priceValue: 200000,
            },
        ],
        description: 'prices',
    }),
    __metadata("design:type", Array)
], ConcertDto.prototype, "prices", void 0);
//# sourceMappingURL=concert.dto.js.map