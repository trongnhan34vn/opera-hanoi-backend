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
exports.KeycloakTokenResponse = void 0;
const class_transformer_1 = require("class-transformer");
class KeycloakTokenResponse {
}
exports.KeycloakTokenResponse = KeycloakTokenResponse;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'access_token' }),
    __metadata("design:type", String)
], KeycloakTokenResponse.prototype, "accessToken", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'refresh_token' }),
    __metadata("design:type", String)
], KeycloakTokenResponse.prototype, "refreshToken", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'expires_in' }),
    __metadata("design:type", Number)
], KeycloakTokenResponse.prototype, "expiresIn", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'refresh_expires_in' }),
    __metadata("design:type", Number)
], KeycloakTokenResponse.prototype, "refreshExpiresIn", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'token_type' }),
    __metadata("design:type", String)
], KeycloakTokenResponse.prototype, "tokenType", void 0);
//# sourceMappingURL=KeycloakTokenResponse.dto.js.map