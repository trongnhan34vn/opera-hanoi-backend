"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const ApiResponse_entity_1 = require("./ApiResponse.entity");
class SuccessResponse extends ApiResponse_entity_1.ApiResponse {
    constructor(code, message, data) {
        super(code, message);
        this.data = data;
    }
    get getData() {
        return this.data;
    }
    set setData(data) {
        this.data = data;
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=SuccessResponse.entity.js.map