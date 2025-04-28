"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Module = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("common");
const symbol_1 = require("../constants/symbol");
const s3_controller_1 = require("../controller/s3.controller");
const s3_service_impl_1 = require("../service/impl/s3.service.impl");
let S3Module = class S3Module {
};
exports.S3Module = S3Module;
exports.S3Module = S3Module = __decorate([
    (0, common_1.Module)({
        controllers: [s3_controller_1.S3Controller],
        providers: [
            {
                provide: symbol_1.IS3ServiceToken,
                useClass: s3_service_impl_1.S3Service,
            },
            common_2.HttpResponseFactory,
            common_2.LoggerFactory,
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('s3-service'),
            },
        ],
        exports: [symbol_1.IS3ServiceToken],
    })
], S3Module);
//# sourceMappingURL=s3.module.js.map