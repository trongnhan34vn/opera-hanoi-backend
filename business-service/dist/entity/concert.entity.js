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
const concert_status_enum_1 = require("./enum/concert.status.enum");
const genre_entity_1 = require("./genre.entity");
const image_entity_1 = require("./image.entity");
const price_enity_1 = require("./price.enity");
const seat_entity_1 = require("./seat.entity");
const show_time_entity_1 = require("./show.time.entity");
const concert_genre_sub_entity_1 = require("./sub/concert.genre.sub.entity");
const concert_seat_sub_entity_1 = require("./sub/concert.seat.sub.entity");
const artist_entity_1 = require("./artist.entity");
const director_entity_1 = require("./director.entity");
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
    (0, sequelize_typescript_1.HasMany)(() => artist_entity_1.Artist),
    __metadata("design:type", Array)
], Concert.prototype, "artists", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => director_entity_1.Director),
    __metadata("design:type", Array)
], Concert.prototype, "directors", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Concert.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Concert.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BLOB('long'),
    }),
    __metadata("design:type", String)
], Concert.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(concert_status_enum_1.ConcertStatusEnum)),
        defaultValue: concert_status_enum_1.ConcertStatusEnum.ON_SALE,
    }),
    __metadata("design:type", String)
], Concert.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Concert.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Concert.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => genre_entity_1.Genre, () => concert_genre_sub_entity_1.ConcertGenre),
    __metadata("design:type", Array)
], Concert.prototype, "genres", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => image_entity_1.Image),
    __metadata("design:type", Array)
], Concert.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => show_time_entity_1.ShowTime),
    __metadata("design:type", Array)
], Concert.prototype, "showTimes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => price_enity_1.Price),
    __metadata("design:type", Array)
], Concert.prototype, "prices", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => seat_entity_1.Seat, () => concert_seat_sub_entity_1.ConcertSeat),
    __metadata("design:type", Array)
], Concert.prototype, "seats", void 0);
exports.Concert = Concert = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'concerts',
    })
], Concert);
//# sourceMappingURL=concert.entity.js.map