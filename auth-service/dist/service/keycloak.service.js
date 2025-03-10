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
exports.KeycloakService = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const KeycloakConsants_1 = require("../constants/KeycloakConsants");
let KeycloakService = class KeycloakService {
    constructor(httpService, logger) {
        this.httpService = httpService;
        this.logger = logger;
    }
    async signIn(userLogin) {
        try {
            const grantType = 'password';
            const keycloakRequest = {
                client_id: KeycloakConsants_1.KEYCLOAK_CLIENT_ID,
                client_secret: KeycloakConsants_1.KEYCLOAK_CLIENT_SECRET,
                username: userLogin.email,
                password: userLogin.password,
                grant_type: grantType,
            };
            const headers = {
                contentType: common_lib_1.HttpContentType.FORM_URLENCODED,
            };
            const response = await this.httpService.call(common_lib_1.HttpMethod.POST, KeycloakConsants_1.KEYCLOAK_SERVICE_URL, KeycloakConsants_1.KEYCLOAK_PROVIDER_TOKEN_URI_PATH, headers, keycloakRequest);
            if (!response) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'response from Keycloak is null');
            }
            this.logger.log('Sign in with Keycloak successfully.');
            return response.data;
        }
        catch (error) {
            this.logger.error(error, error.stack);
            throw error;
        }
    }
    async signUp(userSignUp) {
        const token = await this.getAdminAccess();
        try {
            await this.createUser(userSignUp, token);
            await this.mappingRoleToUser(token, userSignUp);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async signUpTransaction(user) {
        this.logger.log('Start transaction for sign up process...');
        const token = await this.getAdminAccess();
        const createdUser = await this.findUserByEmail(user.email, token);
        await this.deleteUser(createdUser, token);
        this.logger.log('End transaction.');
    }
    async deleteUser(user, token) {
        try {
            this.logger.log(`Start delete user [${user.email}]...`);
            const endpointDeleteUser = `/users/${user.id}`;
            const pathDeleteUser = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointDeleteUser;
            const headers = {
                token,
            };
            const response = await this.httpService.call(common_lib_1.HttpMethod.DELETE, KeycloakConsants_1.KEYCLOAK_SERVICE_URL, pathDeleteUser, headers);
            if (!response) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'response from Keycloak is null');
            }
            this.logger.log(`User [${user.email}] is deleted`);
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
        finally {
            this.logger.log('End delete user.');
        }
    }
    async createUser(userSignUp, token) {
        try {
            this.logger.log('Start create user with Keycloak...');
            const userRegistry = {
                email: userSignUp.email,
                firstName: userSignUp.firstName,
                lastName: userSignUp.lastName,
                enabled: true,
                credentials: [
                    {
                        type: 'password',
                        value: userSignUp.password,
                    },
                ],
            };
            const headers = {
                token: token,
            };
            const createUserKeycloakEndpoint = '/users';
            const createUserKeycloakUrl = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + createUserKeycloakEndpoint;
            const response = await this.httpService.call(common_lib_1.HttpMethod.POST, KeycloakConsants_1.KEYCLOAK_SERVICE_URL, createUserKeycloakUrl, headers, userRegistry);
            if (!response) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'response from Keycloak is null');
            }
            this.logger.log('Created User with Keycloak successfully');
            return response;
        }
        catch (error) {
            if (error instanceof common_lib_1.ResourceException) {
                const isConflict = error.getErrorCode === common_lib_1.ErrorMessage.CONFLICT.getCode;
                if (isConflict) {
                    throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.CONFLICT.getCode, common_lib_1.ErrorMessage.CONFLICT.getMessage, `User [${userSignUp.email}] is already existed`);
                }
            }
            throw error;
        }
        finally {
            this.logger.log('End created user with Keycloak.');
        }
    }
    async mappingRoleToUser(token, userDto) {
        const roles = userDto.roles;
        if (roles && roles.size !== 0) {
            return;
        }
        const defaultRole = 'USER';
        const role = await this.findRoleByName(defaultRole, token);
        const userCreated = await this.findUserByEmail(userDto.email, token);
        await this.assignRoleToUser(userCreated, role, token);
    }
    async assignRoleToUser(user, role, token) {
        try {
            this.logger.log(`Start assign role [${role.getName}] to user [${user.email}]`);
            const endpointAssignRoleToUser = `/users/${user.id}/role-mappings/realm`;
            const pathAssignRoleToUser = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointAssignRoleToUser;
            const headers = { token };
            const roles = [];
            roles.push(role);
            const response = await this.httpService.call(common_lib_1.HttpMethod.POST, KeycloakConsants_1.KEYCLOAK_SERVICE_URL, pathAssignRoleToUser, headers, roles);
            if (!response) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'response from Keycloak is null');
            }
            this.logger.log(`Assign role [${role.name}] to user [${user.email}] successfully`);
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async findUserByEmail(email, token) {
        try {
            this.logger.log(`Start find user by email [${email}]...`);
            const endpointFindUserByEmail = `/users?email=${email}`;
            const urlFindUserByEmail = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointFindUserByEmail;
            const headers = {
                token,
            };
            const response = await this.httpService.call(common_lib_1.HttpMethod.GET, KeycloakConsants_1.KEYCLOAK_SERVICE_URL, urlFindUserByEmail, headers);
            if (!response) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'response from Keycloak is null');
            }
            this.logger.log(`User [${email}] founded`);
            return response.data[0];
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
        finally {
            this.logger.log('End find user by email.');
        }
    }
    async findRoleByName(roleName, token) {
        try {
            this.logger.log(`Start find role [${roleName}]...`);
            const endpointFindRoleByNameKC = `/roles/${roleName}`;
            const urlFindRoleByNameKC = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointFindRoleByNameKC;
            const headers = {
                token,
            };
            const response = await this.httpService.call(common_lib_1.HttpMethod.GET, KeycloakConsants_1.KEYCLOAK_SERVICE_URL, urlFindRoleByNameKC, headers);
            if (!response) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'response from Keycloak is null');
            }
            this.logger.log(`Role [${roleName}] founded`);
            return response.data;
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
        finally {
            this.logger.log('End find role.');
        }
    }
    async getAdminAccess() {
        this.logger.log('Start get admin access...');
        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'Pikachu123@';
        const userAdminSignIn = {
            email: adminEmail,
            password: adminPassword,
        };
        const response = await this.signIn(userAdminSignIn);
        if (!response) {
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, 'response from Keycloak is null');
        }
        this.logger.log('Get admin access successfully.');
        this.logger.log('End get admin access.');
        return 'Bearer ' + response['access_token'];
    }
};
exports.KeycloakService = KeycloakService;
exports.KeycloakService = KeycloakService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_lib_1.HttpServiceFactory,
        common_lib_1.LoggerFactory])
], KeycloakService);
//# sourceMappingURL=keycloak.service.js.map