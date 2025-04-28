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
exports.GenreRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("common");
const genre_entity_1 = require("../../entity/genre.entity");
let GenreRepository = class GenreRepository {
    constructor(genreModel) {
        this.genreModel = genreModel;
    }
    async findAll() {
        return await this.genreModel.findAll();
    }
    async create(entity, transaction) {
        return await entity.save({ transaction });
    }
    async update(entity, transaction) {
        const updateEntity = await this.findById(entity.get().id);
        updateEntity.isNewRecord = false;
        return await updateEntity.update({ ...entity.get(), updatedAt: new Date(Date.now()) }, { transaction });
    }
    async findAllPagination(pagination) {
        const page = pagination.page ?? 1;
        const size = pagination.size ?? 5;
        const sortBy = pagination.sortBy ?? 'id';
        const orderBy = pagination.orderBy ?? 'ASC';
        const offset = (page - 1) * size;
        const limit = size;
        const { count, rows } = await this.genreModel.findAndCountAll({
            limit,
            offset,
            order: [[sortBy, orderBy]],
        });
        return {
            items: count,
            pages: Math.ceil(count / size),
            currentPage: page,
            data: rows,
        };
    }
    async findById(id) {
        const Genre = await this.genreModel.findOne({ where: { id } });
        if (!Genre)
            throw new common_2.NotFoundException(`Genre not found with id [${id}]`);
        return Genre;
    }
    async remove(id) {
        const Genre = await this.findById(id);
        await Genre.destroy();
    }
};
exports.GenreRepository = GenreRepository;
exports.GenreRepository = GenreRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(genre_entity_1.Genre)),
    __metadata("design:paramtypes", [Object])
], GenreRepository);
//# sourceMappingURL=genre.repository.impl.js.map