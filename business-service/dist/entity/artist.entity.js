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
exports.Artist = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const concert_entity_1 = require("./concert.entity");
let Artist = class Artist extends sequelize_typescript_1.Model {
};
exports.Artist = Artist;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID
    }),
    __metadata("design:type", String)
], Artist.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], Artist.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Artist.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Artist.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => concert_entity_1.Concert),
    __metadata("design:type", concert_entity_1.Concert)
], Artist.prototype, "concert", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => concert_entity_1.Concert),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID
    }),
    __metadata("design:type", String)
], Artist.prototype, "concertId", void 0);
exports.Artist = Artist = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'artists'
    })
], Artist);
//# sourceMappingURL=artist.entity.js.map