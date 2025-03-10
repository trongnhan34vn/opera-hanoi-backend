"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceException = void 0;
class ResourceException extends Error {
    constructor(errorCode, message, details) {
        super(message);
        this.errorCode = errorCode;
        this.details = details;
    }
    toJson() {
        return {
            errorCode: this.errorCode,
            message: this.message,
        };
    }
    get getErrorCode() {
        return this.errorCode;
    }
    get getDetails() {
        return this.details;
    }
}
exports.ResourceException = ResourceException;
//# sourceMappingURL=ResourceException.error.js.map