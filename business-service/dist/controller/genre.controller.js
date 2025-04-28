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
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const genre_service_impl_1 = require("../service/impl/genre.service.impl");
const common_2 = require("common");
const genre_dto_1 = require("../dto/request/genre.dto");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const pagination_dto_1 = require("../dto/request/pagination.dto");
let GenreController = class GenreController {
    constructor(genreService, httpResponseFactory) {
        this.genreService = genreService;
        this.httpResponseFactory = httpResponseFactory;
    }
    async findAll(res) {
        const genres = await this.genreService.findAll();
        return this.httpResponseFactory.sendOKResponse(res, 'Genres are founded', genres);
    }
    async findAllPagination(res, query) {
        const genres = await this.genreService.findAllPagination(query);
        return this.httpResponseFactory.sendOKResponse(res, 'Genres are founded', genres);
    }
    async findById(res, genreId) {
        const genre = await this.genreService.findById(genreId);
        return this.httpResponseFactory.sendOKResponse(res, 'Genre founded', genre);
    }
    async save(res, genreDto) {
        const genre = await this.genreService.save(genreDto);
        return this.httpResponseFactory.sendCreatedResponse(res, 'Genre saved', genre);
    }
    async delete(res, genreId) {
        await this.genreService.remove(genreId);
        return this.httpResponseFactory.sendOKResponse(res, `Genre ${genreId} is removed`, null);
    }
    async update(res, genreDto) {
        const updatedGenre = await this.genreService.save(genreDto);
        return this.httpResponseFactory.sendOKResponse(res, `Genre [${updatedGenre.id}] is updated`, updatedGenre);
    }
};
exports.GenreController = GenreController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/page'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.Pagination]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findAllPagination", null);
__decorate([
    (0, common_1.Get)('/:genreId'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('genreId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, genre_dto_1.GenreDto]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "save", null);
__decorate([
    (0, common_1.Delete)('/:genreId'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('genreId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, genre_dto_1.GenreDto]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "update", null);
exports.GenreController = GenreController = __decorate([
    (0, common_1.Controller)('/api/v1/business/genres'),
    (0, common_1.UseGuards)(nest_keycloak_connect_1.AuthGuard, nest_keycloak_connect_1.RoleGuard),
    __metadata("design:paramtypes", [genre_service_impl_1.GenreService,
        common_2.HttpResponseFactory])
], GenreController);
//# sourceMappingURL=genre.controller.js.map