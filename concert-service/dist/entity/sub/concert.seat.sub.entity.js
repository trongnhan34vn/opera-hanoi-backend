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
exports.ConcertSeat = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const concert_entity_1 = require("../concert.entity");
const seat_entity_1 = require("../seat.entity");
const seat_status_enum_1 = require("../enum/seat.status.enum");
let ConcertSeat = class ConcertSeat extends sequelize_typescript_1.Model {
};
exports.ConcertSeat = ConcertSeat;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], ConcertSeat.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => concert_entity_1.Concert),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], ConcertSeat.prototype, "concertId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => seat_entity_1.Seat),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], ConcertSeat.prototype, "seatId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('0', '1', '2', '3'),
    }),
    __metadata("design:type", Number)
], ConcertSeat.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], ConcertSeat.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], ConcertSeat.prototype, "updatedAt", void 0);
exports.ConcertSeat = ConcertSeat = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'concert_seats',
    })
], ConcertSeat);
//# sourceMappingURL=concert.seat.sub.entity.js.map