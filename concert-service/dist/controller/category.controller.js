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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_impl_1 = require("../service/impl/category.service.impl");
const common_lib_1 = require("common-lib");
const SkipAuthGuardAnnotationConfig_1 = require("../config/SkipAuthGuardAnnotationConfig");
const category_dto_1 = require("../dto/request/category.dto");
let CategoryController = class CategoryController {
    constructor(categoryService, httpResponseFactory) {
        this.categoryService = categoryService;
        this.httpResponseFactory = httpResponseFactory;
    }
    async findAll(res) {
        const categories = await this.categoryService.findAll();
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.OK, common_lib_1.SuccessMessage.OK.getCode, 'Categories are founded', categories);
    }
    async findById(res, categoryId) {
        const category = await this.categoryService.findById(categoryId);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.OK, common_lib_1.SuccessMessage.OK.getCode, 'Category founded', category);
    }
    async save(res, categoryDto) {
        const category = await this.categoryService.save(categoryDto);
        return this.httpResponseFactory.sendSuccessResponse(res, common_1.HttpStatus.CREATED, common_lib_1.SuccessMessage.CREATED.getCode, 'Category saved', category);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)('/categories'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/categories/:categoryId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('/categories'),
    (0, SkipAuthGuardAnnotationConfig_1.SkipAuth)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.CategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "save", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('/api/v1/concert'),
    __metadata("design:paramtypes", [category_service_impl_1.CategoryService,
        common_lib_1.HttpResponseFactory])
], CategoryController);
//# sourceMappingURL=category.controller.js.map