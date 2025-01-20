"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessMessage = void 0;
const Message_entity_1 = require("./Message.entity");
class SuccessMessage extends Message_entity_1.Message {
    constructor(code, message) {
        super(code, message);
    }
}
exports.SuccessMessage = SuccessMessage;
SuccessMessage.CREATED = new SuccessMessage('SUC201', 'Resource created');
SuccessMessage.OK = new SuccessMessage('SUC200', 'OK');
SuccessMessage.NO_CONTENT = new SuccessMessage('SUC204', 'No Content');
//# sourceMappingURL=SuccessMessage.entity.js.map