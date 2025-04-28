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
exports.Zone = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const seat_entity_1 = require("./seat.entity");
const floor_entity_1 = require("./floor.entity");
let Zone = class Zone extends sequelize_typescript_1.Model {
};
exports.Zone = Zone;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Zone.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Zone.prototype, "label", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Zone.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Zone.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => floor_entity_1.Floor),
    __metadata("design:type", floor_entity_1.Floor)
], Zone.prototype, "floor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => seat_entity_1.Seat),
    __metadata("design:type", Array)
], Zone.prototype, "seats", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => floor_entity_1.Floor),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Zone.prototype, "floorId", void 0);
exports.Zone = Zone = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'zones',
    })
], Zone);
//# sourceMappingURL=zone.entity.js.map