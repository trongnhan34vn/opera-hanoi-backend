"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFactoryImpl = void 0;
const ErrorResponse_entity_1 = require("../response/ErrorResponse.entity");
const SuccessResponse_entity_1 = require("../response/SuccessResponse.entity");
const common_1 = require("@nestjs/common");
let HttpResponseFactoryImpl = class ResponseFactoryImpl {
    sendErrorResponse(res, status, code, message, details) {
        const response = new ErrorResponse_entity_1.ErrorResponse(code, message, details);
        return res.status(status).json(response);
    }
    sendSuccessResponse(res, status, code, message, data) {
        const response = new SuccessResponse_entity_1.SuccessResponse(code, message, data);
        return res.status(status).json(response);
    }
};
exports.ResponseFactoryImpl = HttpResponseFactoryImpl;
exports.ResponseFactoryImpl = HttpResponseFactoryImpl = __decorate([
    (0, common_1.Injectable)()
], HttpResponseFactoryImpl);
//# sourceMappingURL=ResponseFactory.impl.js.map