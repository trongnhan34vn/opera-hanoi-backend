"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const Message_entity_1 = require("./Message.entity");
class ErrorMessage extends Message_entity_1.Message {
    static getMessageByStatus(status) {
        switch (status) {
            case 503:
                return this.SERVICE_UNAVAILABLE;
            case 404:
                return this.NOT_FOUND;
            case 500:
                return this.INTERNAL_SERVER_ERROR;
            case 400:
                return this.BAD_REQUEST;
            case 409:
                return this.CONFLICT;
            case 401:
                return this.UNAUTHORIZED;
            case 403:
                return this.FORBIDDEN;
        }
    }
}
exports.ErrorMessage = ErrorMessage;
ErrorMessage.NOT_FOUND = new ErrorMessage('ERR404', '404 Resource not found');
ErrorMessage.INTERNAL_SERVER_ERROR = new ErrorMessage('ERR500', '500 Internal Server Error');
ErrorMessage.BAD_REQUEST = new ErrorMessage('ERR400', '400 Bad Request');
ErrorMessage.CONFLICT = new ErrorMessage('ERR409', '409 Conflict');
ErrorMessage.UNAUTHORIZED = new ErrorMessage('ERR401', '401 Unauthorized');
ErrorMessage.FORBIDDEN = new ErrorMessage('ERR403', '403 Forbidden');
ErrorMessage.SERVICE_UNAVAILABLE = new ErrorMessage('ERR503', '503 Service Unavailable');
//# sourceMappingURL=ErrorMessage.entity.js.map