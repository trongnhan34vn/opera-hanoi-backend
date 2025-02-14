"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const sequelize_1 = require("@nestjs/sequelize");
const category_mapper_impl_1 = require("../mapper/impl/category.mapper.impl");
const category_service_impl_1 = require("../service/impl/category.service.impl");
const category_controller_1 = require("../controller/category.controller");
const category_entity_1 = require("../entity/category.entity");
const category_repository_impl_1 = require("../repository/impl/category.repository.impl");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_lib_1.LogModule,
            common_lib_1.HttpServiceModule,
            sequelize_1.SequelizeModule.forFeature([category_entity_1.Category]),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [
            category_service_impl_1.CategoryService,
            category_mapper_impl_1.CategoryMapper,
            category_repository_impl_1.CategoryRepository,
            common_lib_1.HttpResponseFactory,
            {
                provide: common_lib_1.LoggerFactory,
                useFactory: () => new common_lib_1.LoggerFactory('category-service'),
            },
        ],
        exports: [category_service_impl_1.CategoryService],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map