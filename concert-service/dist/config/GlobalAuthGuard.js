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
exports.GlobalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let GlobalAuthGuard = class GlobalAuthGuard {
    constructor(reflector, authGuard, resourceGuard, roleGuard) {
        this.reflector = reflector;
        this.authGuard = authGuard;
        this.resourceGuard = resourceGuard;
        this.roleGuard = roleGuard;
    }
    async canActivate(context) {
        const handler = context.getHandler();
        const skipAuth = this.reflector.get('skipAuth', handler);
        if (skipAuth) {
            return true;
        }
        const authResult = await this.authGuard.canActivate(context);
        if (!authResult)
            return false;
        const resourceResult = await this.resourceGuard.canActivate(context);
        if (!resourceResult)
            return false;
        return await this.roleGuard.canActivate(context);
    }
};
exports.GlobalAuthGuard = GlobalAuthGuard;
exports.GlobalAuthGuard = GlobalAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        nest_keycloak_connect_1.AuthGuard,
        nest_keycloak_connect_1.ResourceGuard,
        nest_keycloak_connect_1.RoleGuard])
], GlobalAuthGuard);
//# sourceMappingURL=GlobalAuthGuard.js.map