"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakModule = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("common");
const keycloak_service_1 = require("../service/keycloak.service");
let KeycloakModule = class KeycloakModule {
};
exports.KeycloakModule = KeycloakModule;
exports.KeycloakModule = KeycloakModule = __decorate([
    (0, common_1.Module)({
        imports: [common_2.HttpServiceModule],
        providers: [
            common_2.HttpResponseFactory,
            {
                provide: common_2.LoggerFactory,
                useFactory: () => new common_2.LoggerFactory('keycloak-service'),
            },
            keycloak_service_1.KeycloakService,
        ],
        exports: [keycloak_service_1.KeycloakService],
    })
], KeycloakModule);
//# sourceMappingURL=keycloak.module.js.map