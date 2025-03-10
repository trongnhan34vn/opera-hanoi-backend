"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let SkipAuthGuard = class SkipAuthGuard {
    constructor(reflector, keycloakAuthGuard) {
        this.reflector = reflector;
        this.keycloakAuthGuard = keycloakAuthGuard;
    }
    async canActivate(context) {
        const handler = context.getHandler();
        const skipAuth = this.reflector.get('skipAuth', handler);
        if (skipAuth) {
            return true;
        }
        return this.keycloakAuthGuard.canActivate(context);
    }
};
exports.SkipAuthGuard = SkipAuthGuard;
exports.SkipAuthGuard = SkipAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        nest_keycloak_connect_1.AuthGuard])
], SkipAuthGuard);
//# sourceMappingURL=SkipAuthGuard.js.map