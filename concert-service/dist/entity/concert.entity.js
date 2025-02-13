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
exports.Concert = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_entity_1 = require("./category.entity");
const concert_category_sub_entity_1 = require("./sub/concert.category.sub.entity");
const image_entity_1 = require("./image.entity");
const show_time_entity_1 = require("./show.time.entity");
const seat_entity_1 = require("./seat.entity");
const concert_seat_sub_entity_1 = require("./sub/concert.seat.sub.entity");
const seat_category_entity_1 = require("./seat.category.entity");
const concert_seat_category_sub_entity_1 = require("./sub/concert.seat.category.sub.entity");
let Concert = class Concert extends sequelize_typescript_1.Model {
};
exports.Concert = Concert;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Concert.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Concert.prototype, "art", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Concert.prototype, "director", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Concert.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Concert.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Concert.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Concert.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => category_entity_1.Category, () => concert_category_sub_entity_1.ConcertCategory),
    __metadata("design:type", Array)
], Concert.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => image_entity_1.Image),
    __metadata("design:type", Array)
], Concert.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => show_time_entity_1.ShowTime),
    __metadata("design:type", Array)
], Concert.prototype, "showTimes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => seat_entity_1.Seat, () => concert_seat_sub_entity_1.ConcertSeat),
    __metadata("design:type", Array)
], Concert.prototype, "seats", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => seat_category_entity_1.SeatCategory, () => concert_seat_category_sub_entity_1.ConcertSeatCategory),
    __metadata("design:type", Array)
], Concert.prototype, "seatCategories", void 0);
exports.Concert = Concert = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'concerts',
    })
], Concert);
//# sourceMappingURL=concert.entity.js.map