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
exports.AuthErrorController = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
let AuthErrorController = class AuthErrorController {
    constructor(responseFactory) {
        this.responseFactory = responseFactory;
    }
    catch(error, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (error instanceof common_lib_1.ResourceException) {
            const resourceError = error;
            const status = this.getStatus(error);
            return this.responseFactory.sendErrorResponse(response, status, resourceError.getErrorCode, resourceError.message, resourceError.details);
        }
        return this.responseFactory.sendErrorResponse(response, error['status'] ??
            this.getStatus(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode), this.getErrorMessage(error['status']).getCode, this.getErrorMessage(error['status']).getMessage, error.message);
    }
    getErrorMessage(status) {
        switch (status) {
            case 503:
                return common_lib_1.ErrorMessage.SERVICE_UNAVAILABLE;
            case 404:
                return common_lib_1.ErrorMessage.NOT_FOUND;
            case 400:
                return common_lib_1.ErrorMessage.BAD_REQUEST;
            case 409:
                return common_lib_1.ErrorMessage.CONFLICT;
            case 401:
                return common_lib_1.ErrorMessage.UNAUTHORIZED;
            case 403:
                return common_lib_1.ErrorMessage.FORBIDDEN;
            default:
                return common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR;
        }
    }
    getStatus(error) {
        const code = error.getErrorCode;
        switch (code) {
            case common_lib_1.ErrorMessage.SERVICE_UNAVAILABLE.getCode:
                return common_1.HttpStatus.SERVICE_UNAVAILABLE;
            case common_lib_1.ErrorMessage.BAD_REQUEST.getCode:
                return common_1.HttpStatus.BAD_REQUEST;
            case common_lib_1.ErrorMessage.UNAUTHORIZED.getCode:
                return common_1.HttpStatus.UNAUTHORIZED;
            case common_lib_1.ErrorMessage.CONFLICT.getCode:
                return common_1.HttpStatus.CONFLICT;
            case common_lib_1.ErrorMessage.FORBIDDEN.getCode:
                return common_1.HttpStatus.FORBIDDEN;
            case common_lib_1.ErrorMessage.NOT_FOUND.getCode:
                return common_1.HttpStatus.NOT_FOUND;
            default:
                return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
};
exports.AuthErrorController = AuthErrorController;
exports.AuthErrorController = AuthErrorController = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_lib_1.HttpResponseFactory])
], AuthErrorController);
//# sourceMappingURL=auth.error.controller.js.map