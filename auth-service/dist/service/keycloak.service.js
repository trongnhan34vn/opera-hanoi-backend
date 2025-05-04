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
const KeycloakConsants_1 = require("../constants/KeycloakConsants");
const http_service_factory_impl_1 = require("common/dist/factory/impl/http.service.factory.impl");
const logger_factory_impl_1 = require("common/dist/factory/impl/logger.factory.impl");
const http_content_enum_1 = require("common/dist/enum/http.content.enum");
const http_method_enum_1 = require("common/dist/enum/http.method.enum");
const common_2 = require("common");
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
                contentType: http_content_enum_1.HttpContentType.FORM_URLENCODED,
            };
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: KeycloakConsants_1.KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.POST, keycloakRequest, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from Keycloak is null');
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
            return await this.findUserByEmail(userSignUp.email, token);
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
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: pathDeleteUser,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.DELETE, null, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from Keycloak is null');
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
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: createUserKeycloakUrl,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.POST, userRegistry, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from Keycloak is null');
            }
            this.logger.log('Created User with Keycloak successfully');
            return response;
        }
        catch (error) {
            if (error instanceof common_2.ResourceException) {
                const isConflict = error.errorCode === common_2.HttpErrorCode.CONFLICT;
                if (isConflict) {
                    throw new common_2.ConflictException(`User [${userSignUp.email}] is already existed`);
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
        let targetAssignRoles = [];
        const allRoles = (await this.findAllRoles(token));
        const defaultRole = 'CustomerRole';
        const targetRoleDefault = await this.findRoleByName(defaultRole, token);
        if (roles && roles.size !== 0) {
            const arrayRole = Array.from(roles);
            const filterRoles = allRoles.filter((role) => arrayRole.includes(role.name));
            targetAssignRoles = filterRoles;
        }
        else {
            targetAssignRoles.push(targetRoleDefault);
        }
        const userCreated = await this.findUserByEmail(userDto.email, token);
        await this.assignRoleToUser(userCreated, targetAssignRoles, token);
    }
    async findAllRoles(token) {
        try {
            this.logger.log('Start find all roles');
            const myClient = await this.findMyClient(token);
            const findAllRolesEndponit = `/clients/${myClient.id}/roles`;
            const urlFindRoleByNameKC = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + findAllRolesEndponit;
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: urlFindRoleByNameKC,
            };
            const headers = {
                token,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.GET, null, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from Keycloak is null');
            }
            this.logger.log(`Roles founded`);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async assignRoleToUser(user, roles, token) {
        try {
            this.logger.log(`Start assign roles to user [${user.email}]`);
            const endpointAssignRoleToUser = `/users/${user.id}/role-mappings/realm`;
            const pathAssignRoleToUser = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointAssignRoleToUser;
            const headers = { token };
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: pathAssignRoleToUser,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.POST, roles, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from Keycloak is null');
            }
            this.logger.log(`Assign roles to user [${user.email}] successfully`);
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
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: urlFindUserByEmail,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.GET, null, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from Keycloak is null');
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
    async findMyClient(token) {
        try {
            this.logger.log('Start find my client');
            const headers = { token };
            const endpointFindAllClients = KeycloakConsants_1.KEYCLOAK_SERVICE_ADMIN_PATH_URI + '/clients';
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: endpointFindAllClients,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.GET, null, headers);
            const clients = response.data;
            const myClient = clients.find((client) => client.clientId === KeycloakConsants_1.KEYCLOAK_CLIENT_ID);
            if (!myClient)
                throw new common_2.NotFoundException('Client Not Found', 'Client Not Found');
            return myClient;
        }
        catch (error) {
            throw error;
        }
        finally {
            this.logger.log('End find my client');
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
            const endpoint = {
                baseURL: KeycloakConsants_1.KEYCLOAK_SERVICE_URL,
                path: urlFindRoleByNameKC,
            };
            const response = await this.httpService.call(endpoint, http_method_enum_1.HttpMethod.GET, null, headers);
            if (!response) {
                throw new common_1.InternalServerErrorException('Response from Keycloak is null');
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
            throw new common_1.InternalServerErrorException('Response from Keycloak is null');
        }
        this.logger.log('Get admin access successfully.');
        this.logger.log('End get admin access.');
        return 'Bearer ' + response['access_token'];
    }
};
exports.KeycloakService = KeycloakService;
exports.KeycloakService = KeycloakService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_service_factory_impl_1.HttpServiceFactory,
        logger_factory_impl_1.LoggerFactory])
], KeycloakService);
//# sourceMappingURL=keycloak.service.js.map