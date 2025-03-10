"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAspectInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_service_1 = require("./logger.service");
let LogAspectInterceptor = class LogAspectInterceptor {
    constructor() {
        this.logger = new logger_service_1.LoggerFactory('log-aspect');
    }
    intercept(context, next) {
        const handler = context.getHandler();
        const methodName = handler.name;
        const startTime = Date.now();
        this.logger.log(`Logging started: ${methodName}`);
        return next.handle().pipe((0, operators_1.tap)(() => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            this.logger.log(`Logging finished: ${methodName} finished in ${duration}ms`);
        }), (0, rxjs_1.catchError)((error) => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            if (error.response) {
                this.logger.error('Error: ' + JSON.stringify(error.response.message));
            }
            this.logger.error(`Logging finished: ${methodName} failed after ${duration}ms with error: ${error.stack}.`);
            throw error;
        }));
    }
};
exports.LogAspectInterceptor = LogAspectInterceptor;
exports.LogAspectInterceptor = LogAspectInterceptor = __decorate([
    (0, common_1.Injectable)()
], LogAspectInterceptor);
//# sourceMappingURL=log.aspect.interceptor.js.map