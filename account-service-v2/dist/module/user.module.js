"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const user_controller_1 = require("../controller/user.controller");
const user_service_impl_1 = require("../service/user.service.impl");
const user_mapper_1 = require("../mapper/user.mapper");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../entity/user.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [common_lib_1.LogModule, common_lib_1.HttpServiceModule, sequelize_1.SequelizeModule.forFeature([user_entity_1.User])],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_impl_1.UserService,
            user_mapper_1.UserMapper,
            common_lib_1.HttpResponseFactory,
            {
                provide: common_lib_1.LoggerFactory,
                useFactory: () => new common_lib_1.LoggerFactory('user-service'),
            },
        ],
        exports: [user_service_impl_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map