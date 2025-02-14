"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYCLOAK_ADMIN_URI = exports.KEYCLOAK_PROVIDER_ISSUE_URI = exports.KEYCLOAK_REALM = exports.KEYCLOAK_SERVICE_ADMIN_PATH_URI = exports.KEYCLOAK_CLIENT_SECRET = exports.KEYCLOAK_CLIENT_ID = exports.KEYCLOAK_PROVIDER_TOKEN_URI_PATH = exports.KEYCLOAK_SERVICE_URL = exports.KEYCLOAK_SERVICE_PORT = exports.KEYCLOAK_SERVICE_HOST = void 0;
const process = require("node:process");
const dotenv = require("dotenv");
const path = require("path");
const envFilePath = '../../../env/.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
exports.KEYCLOAK_SERVICE_HOST = process.env.KEYCLOAK_SERVICE_HOST;
exports.KEYCLOAK_SERVICE_PORT = process.env.KEYCLOAK_SERVICE_PORT;
exports.KEYCLOAK_SERVICE_URL = `http://${exports.KEYCLOAK_SERVICE_HOST}:${exports.KEYCLOAK_SERVICE_PORT}`;
exports.KEYCLOAK_PROVIDER_TOKEN_URI_PATH = process.env.KEYCLOAK_PROVIDER_TOKEN_PATH_URI;
exports.KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
exports.KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET
    ? process.env.KEYCLOAK_CLIENT_SECRET
    : 'HanoiOperaHouse';
exports.KEYCLOAK_SERVICE_ADMIN_PATH_URI = process.env.KEYCLOAK_ADMIN_PATH_URI;
exports.KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
exports.KEYCLOAK_PROVIDER_ISSUE_URI = process.env.KEYCLOAK_PROVIDER_ISSUE_URI;
exports.KEYCLOAK_ADMIN_URI = process.env.KEYCLOAK_ADMIN_URI;
//# sourceMappingURL=KeycloakConsants.js.map