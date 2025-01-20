"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(code, message) {
        this.code = code;
        this.message = message;
        const nowTime = Date.now();
        const date = new Date(nowTime);
        this.timestamp = date.toISOString();
    }
    get getCode() {
        return this.code;
    }
    get getMessage() {
        return this.message;
    }
    set setCode(code) {
        this.code = code;
    }
    set setMessage(message) {
        this.message = message;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.entity.js.map