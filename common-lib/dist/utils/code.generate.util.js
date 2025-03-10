"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerator = void 0;
const bs58_1 = __importDefault(require("bs58"));
class CodeGenerator {
    static compressUUID(uuid) {
        const uuidBuffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
        const encoded = bs58_1.default.encode(uuidBuffer);
        return encoded.substring(0, 6);
    }
    static generateCode(prefix, uuid) {
        const shortCode = this.compressUUID(uuid);
        return `${prefix}-${shortCode.toUpperCase()}`;
    }
}
exports.CodeGenerator = CodeGenerator;
//# sourceMappingURL=code.generate.util.js.map