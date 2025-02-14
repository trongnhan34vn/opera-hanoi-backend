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
exports.SeatCategory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const seat_category_enum_1 = require("./enum/seat.category.enum");
const concert_entity_1 = require("./concert.entity");
const concert_seat_category_sub_entity_1 = require("./sub/concert.seat.category.sub.entity");
let SeatCategory = class SeatCategory extends sequelize_typescript_1.Model {
};
exports.SeatCategory = SeatCategory;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], SeatCategory.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: (0, sequelize_1.ENUM)(...Object.values(seat_category_enum_1.SeatCategoryName)),
    }),
    __metadata("design:type", String)
], SeatCategory.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], SeatCategory.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], SeatCategory.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => concert_entity_1.Concert, () => concert_seat_category_sub_entity_1.ConcertSeatCategory),
    __metadata("design:type", Array)
], SeatCategory.prototype, "concerts", void 0);
exports.SeatCategory = SeatCategory = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'seat_categories',
    })
], SeatCategory);
//# sourceMappingURL=seat.category.entity.js.map