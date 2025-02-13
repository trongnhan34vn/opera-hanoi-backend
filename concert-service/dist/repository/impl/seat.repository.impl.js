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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatRepository = void 0;
const seat_entity_1 = require("../../entity/seat.entity");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const common_lib_1 = require("common-lib");
let SeatRepository = class SeatRepository {
    constructor(seatModel) {
        this.seatModel = seatModel;
    }
    async create(entity, transaction) {
        return await entity.save({ transaction });
    }
    async update(entity, transaction) {
        return entity.update({ ...entity, updatedAt: new Date(Date.now()) }, { transaction });
    }
    async findById(id) {
        const seat = await this.seatModel.findOne({ where: { id } });
        if (!seat) {
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `Seat not found with id [${id}]`);
        }
        return seat;
    }
    async remove(id) {
        const seat = await this.findById(id);
        await seat.destroy();
    }
    async findAll() {
        return await this.seatModel.findAll();
    }
};
exports.SeatRepository = SeatRepository;
exports.SeatRepository = SeatRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(seat_entity_1.Seat)),
    __metadata("design:paramtypes", [Object])
], SeatRepository);
//# sourceMappingURL=seat.repository.impl.js.map