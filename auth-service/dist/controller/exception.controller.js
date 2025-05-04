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
exports.ExceptionController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("common");
let ExceptionController = class ExceptionController {
    constructor(responseFactory) {
        this.responseFactory = responseFactory;
    }
    catch(error, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (error instanceof common_2.ResourceException) {
            const resourceError = error;
            const status = resourceError.getStatus();
            switch (status) {
                case 400:
                    return this.responseFactory.sendBadRequestErrorResponse(response, resourceError.getMessage, resourceError.getDetails);
                case 401:
                    return this.responseFactory.sendUnauthorizedErrorResponse(response, resourceError.getMessage, resourceError.getDetails);
                case 409:
                    return this.responseFactory.sendConflictErrorResponse(response, resourceError.getMessage, resourceError.getDetails);
                case 403:
                    return this.responseFactory.sendFobbidenErrorResponse(response, resourceError.getMessage, resourceError.getDetails);
                case 404:
                    return this.responseFactory.sendNotFoundErrorResponse(response, resourceError.getMessage, resourceError.getDetails);
                default:
                    return this.responseFactory.sendInternalServerErrorResponse(response, resourceError.getMessage, resourceError.getDetails);
            }
        }
        else {
            return this.responseFactory.sendInternalServerErrorResponse(response, error.name, error.message);
        }
    }
};
exports.ExceptionController = ExceptionController;
exports.ExceptionController = ExceptionController = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_2.HttpResponseFactory])
], ExceptionController);
//# sourceMappingURL=exception.controller.js.map