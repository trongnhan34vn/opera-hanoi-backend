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
exports.HttpServiceFactory = void 0;
const http_method_enum_1 = require("../enum/http.method.enum");
const instance_config_1 = require("../../config/axios/instance.config");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../config/logger/logger.service");
const ResourceException_error_1 = require("../error/ResourceException.error");
const ErrorMessage_entity_1 = require("../message/ErrorMessage.entity");
const axios_1 = require("axios");
let HttpServiceFactory = class HttpServiceFactory {
    constructor(logger) {
        this.logger = logger;
    }
    async call(method, url, path, headers, data) {
        this.logger.log(`Start call api...`);
        this.logger.log(`url: [${url}];
      path: [${path}];
      method: [${method}];
      headers:[${headers}];
      data: [${data}];`);
        try {
            let response;
            switch (method) {
                case http_method_enum_1.HttpMethod.GET:
                    response = await (0, instance_config_1.getInstance)(url, headers).get(path);
                    break;
                case http_method_enum_1.HttpMethod.PATCH:
                    response = await (0, instance_config_1.getInstance)(url, headers).patch(path, data);
                    break;
                case http_method_enum_1.HttpMethod.POST:
                    response = await (0, instance_config_1.getInstance)(url, headers).post(path, data);
                    break;
                case http_method_enum_1.HttpMethod.PUT:
                    response = await (0, instance_config_1.getInstance)(url, headers).put(path, data);
                    break;
                case http_method_enum_1.HttpMethod.DELETE:
                    response = await (0, instance_config_1.getInstance)(url, headers).delete(path);
                    break;
                default:
                    throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.BAD_REQUEST.getCode, 'Method is invalid');
            }
            this.logger.log('Call API successfully.');
            return response;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                this.handleAxiosError(error);
            }
            throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, 'Unexpected error occurred');
        }
        finally {
            this.logger.log(`End call api.`);
        }
    }
    handleAxiosError(error) {
        const statusError = error.status;
        if (!statusError) {
            if (error.code === 'ECONNREFUSED') {
                throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.SERVICE_UNAVAILABLE.getCode, ErrorMessage_entity_1.ErrorMessage.SERVICE_UNAVAILABLE.getMessage, `Connect Refused (code:[${error.code}])`);
            }
            throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, ErrorMessage_entity_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'Error undefined');
        }
        this.logger.error(`Error occurred when calling API. ${error}. Response: ${JSON.stringify(error.response?.data)}.`);
        console.log('status common ------> ', statusError);
        console.log('error common ------> ', error);
        switch (statusError) {
            case 400:
                throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.BAD_REQUEST.getCode, error.message, error.response.data['message']);
            case 401:
                throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.UNAUTHORIZED.getCode, error.message, error.response.data['message'] ??
                    error.response.data['error_description']);
            case 403:
                throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.FORBIDDEN.getCode, error.message, error.response.data['message']);
            case 409:
                throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.CONFLICT.getCode, error.message, error.response.data['message']);
            case 404:
                throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.NOT_FOUND.getCode, error.message, error.response.data['message']);
            default:
                throw new ResourceException_error_1.ResourceException(ErrorMessage_entity_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, error.message, error.response.data['message']);
        }
    }
};
exports.HttpServiceFactory = HttpServiceFactory;
exports.HttpServiceFactory = HttpServiceFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerFactory])
], HttpServiceFactory);
//# sourceMappingURL=HttpServiceFactory.impl.js.map