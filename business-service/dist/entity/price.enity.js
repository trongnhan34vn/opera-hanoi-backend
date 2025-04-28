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
exports.Price = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const seat_category_1 = require("./seat.category");
const concert_entity_1 = require("./concert.entity");
let Price = class Price extends sequelize_typescript_1.Model {
};
exports.Price = Price;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Price.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => concert_entity_1.Concert),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Price.prototype, "concertId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => seat_category_1.SeatCategory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Price.prototype, "seatCategoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Price.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Price.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Price.prototype, "updatedAt", void 0);
exports.Price = Price = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'prices',
    })
], Price);
//# sourceMappingURL=price.enity.js.map