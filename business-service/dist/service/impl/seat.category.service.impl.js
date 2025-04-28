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
exports.SeatCategoryService = void 0;
const common_1 = require("@nestjs/common");
const symbol_1 = require("../../constants/symbol");
let SeatCategoryService = class SeatCategoryService {
    constructor(seatCategoryRepository, seatCategoryMapper) {
        this.seatCategoryRepository = seatCategoryRepository;
        this.seatCategoryMapper = seatCategoryMapper;
    }
    async findAll() {
        const seatCategories = await this.seatCategoryRepository.findAll();
        return this.seatCategoryMapper.toDtos(seatCategories);
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    remove(id) {
        throw new Error('Method not implemented.');
    }
    save(dto) {
        throw new Error('Method not implemented.');
    }
};
exports.SeatCategoryService = SeatCategoryService;
exports.SeatCategoryService = SeatCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(symbol_1.ISeatCategoryRepositoryToken)),
    __param(1, (0, common_1.Inject)(symbol_1.ISeatCategoryMapperToken)),
    __metadata("design:paramtypes", [Object, Object])
], SeatCategoryService);
//# sourceMappingURL=seat.category.service.impl.js.map