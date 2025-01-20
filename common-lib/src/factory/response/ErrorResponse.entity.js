"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const ApiResponse_entity_1 = require("./ApiResponse.entity");
class ErrorResponse extends ApiResponse_entity_1.ApiResponse {
    constructor(code, message, details) {
        super(code, message);
        this.details = details;
    }
    get getDetails() {
        return this.details;
    }
    set setDetails(details) {
        this.details = details;
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=ErrorResponse.entity.js.map