import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  ConflictException,
  HttpErrorCode,
  KeycloakRoleEnum,
  NotFoundException,
  ResourceException,
} from 'common';
import { HttpContentType } from 'common/dist/enum/http.content.enum';
import {
  HttpEndpoint,
  HttpHeaders,
} from 'common/dist/factory/http.service.factory.interface';
import { HttpServiceFactory } from 'common/dist/factory/impl/http.service.factory.impl';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
  KEYCLOAK_SERVICE_ADMIN_PATH_URI,
  KEYCLOAK_SERVICE_URL,
} from '../constants/KeycloakConsants';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { KeycloakTokenResponse } from '../dto/response/KeycloakTokenResponse.dto';
import { RoleKC } from '../dto/response/RoleKC.dto';
import { UserKc } from '../dto/response/UserKc.dto';
import {
  Credential,
  KeycloakRequest,
  UserKeycloakRegistry,
} from '../interface/keycloak.interface';
import { ChangePasswordDto } from 'src/dto/request/change.password.dto';

@Injectable()
export class KeycloakService {
  constructor(
    private readonly httpService: HttpServiceFactory,
    private readonly logger: LoggerFactory,
  ) {}

  /**
   * Sign in with Keycloak API
   * @param userLogin
   * @return Promise<KeycloakTokenResponse>
   */
  async signIn(userLogin: UserSignInDto): Promise<KeycloakTokenResponse> {
    try {
      const grantType = 'password';
      const keycloakRequest: KeycloakRequest = {
        client_id: KEYCLOAK_CLIENT_ID,
        client_secret: KEYCLOAK_CLIENT_SECRET,
        username: userLogin.email,
        password: userLogin.password,
        grant_type: grantType,
      };

      const headers: HttpHeaders = {
        contentType: HttpContentType.FORM_URLENCODED,
      };

      const endpoint: HttpEndpoint = {
        baseURL: KEYCLOAK_SERVICE_URL,
        path: KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
      };

      const response = await this.httpService.post(
        KEYCLOAK_SERVICE_URL,
        KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
        headers,
        keycloakRequest,
      );
      // response is null
      if (!response) {
        throw new InternalServerErrorException(
          'Response from Keycloak is null',
        );
      }

      this.logger.log('Sign in with Keycloak successfully.');
      return response.data;
    } catch (error) {
      this.logger.error(error, error.stack);
      throw error;
    }
  }

  /**
   * Sign up with Keycloak API
   * 1. get admin access
   * 2. create user
   * 3. find role
   * 4. find user created
   * 5. assign role
   * @param userSignUp
   * @return boolean
   */
  async signUp(userSignUp: UserSignUpDto): Promise<UserKc> {
    // 1. get admin access. sign in with admin account by keycloak api
    const token = await this.getAdminAccess();
    const response = await this.findMyClient(token);
    const myClient = response.id;
    try {
      // 2. create user with admin access by keycloak api
      await this.createUser(userSignUp, token);
      // 3. assign role
      await this.mappingRoleToUser(token, userSignUp, myClient);
      return await this.findUserByEmail(userSignUp.email, token);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Transaction for sign up process (Keycloak Server)
   * @param user
   * @param token
   * @private
   */
  public async signUpTransaction(user: UserSignUpDto) {
    this.logger.log('Start transaction for sign up process...');
    // get admin access
    const token = await this.getAdminAccess();
    // find user was created by email
    const createdUser: UserKc = await this.findUserByEmail(user.email, token);
    // delete user from Keycloak Server
    await this.deleteUser(createdUser, token);
    this.logger.log('End transaction.');
  }

  /**
   * Delete user in Keycloak Server
   * @param user
   * @param token
   * @private
   */
  private async deleteUser(user: UserKc, token: string) {
    try {
      this.logger.log(`Start delete user [${user.email}]...`);
      const endpointDeleteUser = `/users/${user.id}`;
      const pathDeleteUser =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointDeleteUser;

      const headers: HttpHeaders = {
        token,
      };

      const response = await this.httpService.delete(
        KEYCLOAK_SERVICE_URL,
        pathDeleteUser,
        headers,
      );

      if (!response) {
        throw new InternalServerErrorException(
          'Response from Keycloak is null',
        );
      }

      this.logger.log(`User [${user.email}] is deleted`);
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('End delete user.');
    }
  }

  /**
   * Create user in Keycloak Server
   * @param userSignUp
   * @param token
   * @private
   */
  private async createUser(userSignUp: UserSignUpDto, token: string) {
    try {
      this.logger.log('Start create user with Keycloak...');
      // init user registry
      const userRegistry: UserKeycloakRegistry = {
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

      const headers: HttpHeaders = {
        token: token,
      };
      const createUserKeycloakEndpoint = '/users';
      const createUserKeycloakUrl =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + createUserKeycloakEndpoint;

      const endpoint: HttpEndpoint = {
        baseURL: KEYCLOAK_SERVICE_URL,
        path: createUserKeycloakUrl,
      };

      const response = await this.httpService.post(
        KEYCLOAK_SERVICE_URL,
        createUserKeycloakUrl,
        headers,
        userRegistry,
      );
      // response is null
      if (!response) {
        throw new InternalServerErrorException(
          'Response from Keycloak is null',
        );
      }

      this.logger.log('Created User with Keycloak successfully');
      return response;
    } catch (error) {
      if (error instanceof ResourceException) {
        // User signed up is already existed
        const isConflict = error.errorCode === HttpErrorCode.CONFLICT;
        if (isConflict) {
          throw new ConflictException(
            `User [${userSignUp.email}] is already existed`,
          );
        }
      }
      // other cases
      throw error;
    } finally {
      this.logger.log('End created user with Keycloak.');
    }
  }

  /**
   * Mapping role to user (Keycloak Server)
   * @param token
   * @param userDto
   * @private
   */
  private async mappingRoleToUser(
    token: string,
    userDto: UserSignUpDto,
    myClient: string,
  ) {
    // 1. if roles of dto is empty or null => default assign role USER
    const roles = userDto.roles;
    let targetAssignRoles: RoleKC[] = [];
    const allRoles = (await this.findAllRoles(token, myClient)) as RoleKC[];

    // *************** IN PROGRESS *****************
    if (roles && roles.size !== 0) {
      const arrayRole = Array.from(roles);
      const filterRoles = allRoles.filter((role) =>
        arrayRole.includes(role.name),
      );
      targetAssignRoles = filterRoles;
    } else {
      const targetRoleDefaults = allRoles.filter(
        (role) =>
          role.name === KeycloakRoleEnum.CUSTOMER_ROLE ||
          role.name === KeycloakRoleEnum.CHANGE_SELF_PASSWORD_ROLE,
      );
      targetAssignRoles = targetRoleDefaults;
    }
    // *************** IN PROGRESS *****************

    // 2. find role => get id
    // 3. find user created by email => get id
    const userCreated = await this.findUserByEmail(userDto.email, token);
    // 4. assign role to user
    await this.assignRoleToUser(
      userCreated,
      targetAssignRoles,
      token,
      myClient,
    );
  }

  /**
   * Find all roles
   * @param token
   * @returns
   */
  public async findAllRoles(token: string, myClient: string) {
    try {
      this.logger.log('Start find all roles');

      const findAllRolesEndponit = `/clients/${myClient}/roles`;
      const urlFindRoleByNameKC =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + findAllRolesEndponit;
      const endpoint: HttpEndpoint = {
        baseURL: KEYCLOAK_SERVICE_URL,
        path: urlFindRoleByNameKC,
      };
      const headers: HttpHeaders = {
        token,
      };

      const response = await this.httpService.get(
        KEYCLOAK_SERVICE_URL,
        urlFindRoleByNameKC,
        headers,
      );

      // response from Keycloak is null
      if (!response) {
        throw new InternalServerErrorException(
          'Response from Keycloak is null',
        );
      }
      this.logger.log(`Roles founded`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Assign role to user
   * @param user
   * @param role
   * @param token
   * @private
   */
  private async assignRoleToUser(
    user: UserKc,
    roles: RoleKC[],
    token: string,
    myClient: string,
  ) {
    try {
      this.logger.log(`Start assign roles to user [${user.email}]`);
      const endpointAssignRoleToUser = `/users/${user.id}/role-mappings/clients/${myClient}`;
      const pathAssignRoleToUser =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointAssignRoleToUser;

      const headers: HttpHeaders = { token };

      const response = await this.httpService.post(
        KEYCLOAK_SERVICE_URL,
        pathAssignRoleToUser,
        headers,
        roles,
      );

      // response is null
      if (!response) {
        throw new InternalServerErrorException(
          'Response from Keycloak is null',
        );
      }

      this.logger.log(`Assign roles to user [${user.email}] successfully`);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Find user by email in Keycloak Server
   * @param email
   * @param token
   * @private
   */
  async findUserByEmail(email: string, token: string) {
    try {
      this.logger.log(`Start find user by email [${email}]...`);
      const endpointFindUserByEmail = `/users?email=${email}`;
      const urlFindUserByEmail =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointFindUserByEmail;
      const headers: HttpHeaders = {
        token,
      };

      const response = await this.httpService.get(
        KEYCLOAK_SERVICE_URL,
        urlFindUserByEmail,
        headers,
      );

      if (!response) {
        throw new InternalServerErrorException(
          'Response from Keycloak is null',
        );
      }
      this.logger.log(`User [${email}] founded`);
      return response.data[0];
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('End find user by email.');
    }
  }

  /**
   * Find all clients of Keycloak
   * @param token
   */
  public async findMyClient(token: string) {
    try {
      this.logger.log('Start find my client');
      const headers: HttpHeaders = { token };
      const endpointFindAllClients =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + '/clients';

      const response = await this.httpService.get(
        KEYCLOAK_SERVICE_URL,
        endpointFindAllClients,
        headers,
      );

      const clients = response.data;

      const myClient = clients.find(
        (client) => client.clientId === KEYCLOAK_CLIENT_ID,
      );
      if (!myClient)
        throw new NotFoundException('Client Not Found', 'Client Not Found');

      return myClient;
    } catch (error) {
      throw error;
    } finally {
      this.logger.log('End find my client');
    }
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    token: string,
    userId: string,
  ) {
    try {
      const changePasswordEndpoint = `/users/${userId}/reset-password`;
      const headers: HttpHeaders = { token };
      const credential: Credential = {
        value: changePasswordDto.newPassword,
        type: 'password',
      };
      await this.httpService.put(
        KEYCLOAK_SERVICE_URL,
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + changePasswordEndpoint,
        headers,
        credential,
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find role by role name in Keycloak Server
   * @param roleName
   * @param token
   * @private
   */
  private async findRoleByName(
    roleName: string,
    token: string,
  ): Promise<RoleKC> {
    try {
      this.logger.log(`Start find role [${roleName}]...`);
      const endpointFindRoleByNameKC = `/roles/${roleName}`;
      const urlFindRoleByNameKC =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointFindRoleByNameKC;
      const headers: HttpHeaders = {
        token,
      };

      const response = await this.httpService.get(
        KEYCLOAK_SERVICE_URL,
        urlFindRoleByNameKC,
        headers,
      );

      // response from Keycloak is null
      if (!response) {
        throw new InternalServerErrorException(
          'Response from Keycloak is null',
        );
      }
      this.logger.log(`Role [${roleName}] founded`);
      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('End find role.');
    }
  }

  /**
   * Get admin access by signing in admin account
   * @private
   * @return token
   */
  public async getAdminAccess() {
    this.logger.log('Start get admin access...');
    const adminEmail = 'root@gmail.com';
    const adminPassword = 'Pikachu123@';
    const userAdminSignIn: UserSignInDto = {
      email: adminEmail,
      password: adminPassword,
    };

    // sign in keycloak to get admin access
    const response = await this.signIn(userAdminSignIn);

    // response from Keycloak is null
    if (!response) {
      throw new InternalServerErrorException('Response from Keycloak is null');
    }

    this.logger.log('Get admin access successfully.');
    this.logger.log('End get admin access.');
    return 'Bearer ' + response['access_token'];
  }
}
