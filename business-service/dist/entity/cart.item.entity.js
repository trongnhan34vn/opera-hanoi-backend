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
exports.CartItem = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_entity_1 = require("./cart.entity");
const cart_item_status_enum_1 = require("./enum/cart.item.status.enum");
let CartItem = class CartItem extends sequelize_typescript_1.Model {
};
exports.CartItem = CartItem;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cart_entity_1.Cart),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], CartItem.prototype, "cartId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cart_entity_1.Cart),
    __metadata("design:type", cart_entity_1.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(cart_item_status_enum_1.CartItemStatusEnum)),
        defaultValue: cart_item_status_enum_1.CartItemStatusEnum.ACTIVE
    }),
    __metadata("design:type", String)
], CartItem.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], CartItem.prototype, "concertSeatId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], CartItem.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], CartItem.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], CartItem.prototype, "updatedAt", void 0);
exports.CartItem = CartItem = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'cart_items'
    })
], CartItem);
//# sourceMappingURL=cart.item.entity.js.map