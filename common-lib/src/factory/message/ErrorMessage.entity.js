"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const Message_entity_1 = require("./Message.entity");
class ErrorMessage extends Message_entity_1.Message {
}
exports.ErrorMessage = ErrorMessage;
ErrorMessage.NOT_FOUND = new ErrorMessage('ERR404', 'Resource not found');
ErrorMessage.INTERNAL_SERVER_ERROR = new ErrorMessage('ERR500', 'Internal Server Error');
ErrorMessage.BAD_REQUEST = new ErrorMessage('ERR400', 'Bad Request');
ErrorMessage.CONFLICT = new ErrorMessage('ERR409', 'Conflict');
ErrorMessage.UNAUTHORIZED = new ErrorMessage('ERR401', 'Unauthorized');
ErrorMessage.FORBIDDEN = new ErrorMessage('ERR403', 'Forbidden');
//# sourceMappingURL=ErrorMessage.entity.js.map