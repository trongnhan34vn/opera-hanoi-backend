"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const http_content_type_1 = require("../../factory/enum/http.content.type");
const getInstance = (host, headers) => {
    if (!headers) {
        return axios_1.default.create({
            baseURL: host,
        });
    }
    const { token, apiKey, contentType } = headers;
    return axios_1.default.create({
        baseURL: host,
        headers: headers
            ? {
                Authorization: token ? token : '',
                'x-api-key': apiKey ? apiKey : '',
                'Content-Type': contentType ? contentType : http_content_type_1.HttpContentType.JSON,
            }
            : null,
    });
};
exports.getInstance = getInstance;
//# sourceMappingURL=instance.config.js.map