"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log4jsConfig = void 0;
exports.log4jsConfig = {
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'coloured',
                pattern: '[%d{yyyy-MM-dd HH:mm:ss}] [%p] [%c] - %m',
            },
        },
        file: {
            type: 'file',
            filename: 'logs/app.log',
            layout: {
                type: 'basic',
                pattern: '[%d{yyyy-MM-dd HH:mm:ss}] [%p] [%c] - %m',
            },
        },
    },
    categories: {
        default: { appenders: ['out', 'file'], level: 'info' },
        service: { appenders: ['out', 'file'], level: 'info' },
    },
};
//# sourceMappingURL=log4js.config.js.map