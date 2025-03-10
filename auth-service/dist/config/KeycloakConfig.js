"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakConfig = void 0;
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const common_1 = require("@nestjs/common");
const KeycloakConsants_1 = require("../constants/KeycloakConsants");
let KeycloakConfig = class KeycloakConfig {
    static getKeycloakConfig() {
        return {
            authServerUrl: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
            realm: KeycloakConsants_1.KEYCLOAK_REALM,
            clientId: KeycloakConsants_1.KEYCLOAK_CLIENT_ID,
            secret: KeycloakConsants_1.KEYCLOAK_CLIENT_SECRET,
            bearerOnly: true,
            logLevels: ['verbose'],
            policyEnforcement: nest_keycloak_connect_1.PolicyEnforcementMode.PERMISSIVE,
            tokenValidation: nest_keycloak_connect_1.TokenValidation.ONLINE,
        };
    }
};
exports.KeycloakConfig = KeycloakConfig;
exports.KeycloakConfig = KeycloakConfig = __decorate([
    (0, common_1.Injectable)()
], KeycloakConfig);
//# sourceMappingURL=KeycloakConfig.js.map