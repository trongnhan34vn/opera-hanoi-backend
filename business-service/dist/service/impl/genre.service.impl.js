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
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const genre_repository_impl_1 = require("../../repository/impl/genre.repository.impl");
const common_2 = require("common");
const genre_mapper_impl_1 = require("../../mapper/impl/genre.mapper.impl");
const sequelize_typescript_1 = require("sequelize-typescript");
let GenreService = class GenreService {
    constructor(genreRepository, logger, genreMapper, sequelize) {
        this.genreRepository = genreRepository;
        this.logger = logger;
        this.genreMapper = genreMapper;
        this.sequelize = sequelize;
    }
    async save(dto) {
        const transaction = await this.sequelize.transaction();
        try {
            const genre = this.genreMapper.toEntity(dto);
            if (!dto.id) {
                this.logger.log('Start create operation...');
                const createdgenre = await this.genreRepository.create(genre, transaction);
                await transaction.commit();
                const createdgenreDto = this.genreMapper.toDto(createdgenre);
                this.logger.log(`genre created [${createdgenre.id}]`);
                return createdgenreDto;
            }
            this.logger.log('Start update operation...');
            const updatedgenre = await this.genreRepository.update(genre, transaction);
            const updatedgenreDto = this.genreMapper.toDto(updatedgenre);
            this.logger.log(`genre updated [${updatedgenre.id}]`);
            await transaction.commit();
            return updatedgenreDto;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async findAllPagination(pagination) {
        return await this.genreRepository.findAllPagination(pagination);
    }
    async findAll() {
        return await this.genreRepository.findAll();
    }
    async findById(id) {
        return await this.genreRepository.findById(id);
    }
    async remove(id) {
        await this.genreRepository.remove(id);
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genre_repository_impl_1.GenreRepository,
        common_2.LoggerFactory,
        genre_mapper_impl_1.GenreMapper,
        sequelize_typescript_1.Sequelize])
], GenreService);
//# sourceMappingURL=genre.service.impl.js.map