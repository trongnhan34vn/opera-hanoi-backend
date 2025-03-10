"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.LOG_METADATA_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.LOG_METADATA_KEY = 'log_metadata_key';
const Log = () => (0, common_1.SetMetadata)(exports.LOG_METADATA_KEY, true);
exports.Log = Log;
//# sourceMappingURL=log.aspect.config.js.map