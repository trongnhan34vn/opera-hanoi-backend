import { Injectable } from '@nestjs/common';
import {
  ErrorMessage,
  HttpContentType,
  HttpHeaders,
  HttpMethod,
  HttpServiceFactory,
  LoggerFactory,
  ResourceException,
} from 'common-lib';
import {
  KeycloakRequest,
  KeycloakTokenResponse,
  UserKeycloakRegistry,
} from '../interface/keycloak.interface';
import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
  KEYCLOAK_SERVICE_ADMIN_PATH_URI,
  KEYCLOAK_SERVICE_URL,
} from '../constants/KeycloakConsants';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { RoleKC } from '../dto/response/RoleKC.dto';
import { UserKc } from '../dto/response/UserKc.dto';

@Injectable()
export class KeycloakService {
  constructor(
    private readonly httpService: HttpServiceFactory,
    private readonly logger: LoggerFactory,
  ) {}

  /**
   * sign in with keycloak api
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

      const response = await this.httpService.call<KeycloakTokenResponse>(
        HttpMethod.POST,
        KEYCLOAK_SERVICE_URL,
        KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
        headers,
        keycloakRequest,
      );
      // response is null
      if (!response) {
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
          'response from Keycloak is null',
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
   * sign up with keycloak api
   * 1. get admin access
   * 2. create user
   * 3. find role
   * 4. find user created
   * 5. assign role
   * @param userSignUp
   * @return boolean
   */
  async signUp(userSignUp: UserSignUpDto) {
    // 1. get admin access. sign in with admin account by keycloak api
    const token = await this.getAdminAccess();

    // 2. create user with admin access by keycloak api
    await this.createUser(userSignUp, token);
    await this.mappingRoleToUser(token, userSignUp);
    // 3. assign role
    return true;
  }

  /**
   * create user with keycloak api
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
      const response = await this.httpService.call<boolean>(
        HttpMethod.POST,
        KEYCLOAK_SERVICE_URL,
        createUserKeycloakUrl,
        headers,
        userRegistry,
      );
      // response is null
      if (!response) {
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
          'response from Keycloak is null',
        );
      }

      this.logger.log('Created User with Keycloak successfully');
      return response;
    } catch (error) {
      if (error instanceof ResourceException) {
        // User signed up is already existed
        const isConflict = error.getErrorCode === ErrorMessage.CONFLICT.getCode;
        if (isConflict) {
          throw new ResourceException(
            ErrorMessage.CONFLICT.getCode,
            ErrorMessage.CONFLICT.getMessage,
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
   * mapping role to user
   * @param token
   * @param userDto
   * @private
   */
  private async mappingRoleToUser(token: string, userDto: UserSignUpDto) {
    // 1. if roles of dto is empty or null => default assign role USER
    const roles = userDto.roles;
    // *************** IN PROGRESS *****************
    if (roles && roles.size !== 0) {
      console.log('sign up with specified role');
      return;
    }
    // *************** IN PROGRESS *****************

    const defaultRole = 'USER';
    // 2. find role => get id
    const role = await this.findRoleByName(defaultRole, token);
    // 3. find user created by email => get id
    const userCreated = await this.findUserByEmail(userDto.email, token);
    // 4. assign role to user
    await this.assignRoleToUser(userCreated, role, token);
  }

  /**
   * assign role to user
   * @param user
   * @param role
   * @param token
   * @private
   */
  private async assignRoleToUser(user: UserKc, role: RoleKC, token) {
    try {
      this.logger.log(
        `Start assign role [${role.getName}] to user [${user.email}]`,
      );
      const endpointAssignRoleToUser = `/users/${user.id}/role-mappings/realm`;
      const pathAssignRoleToUser =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointAssignRoleToUser;

      const headers: HttpHeaders = { token };

      const roles: RoleKC[] = [];
      roles.push(role);

      const response = await this.httpService.call<boolean>(
        HttpMethod.POST,
        KEYCLOAK_SERVICE_URL,
        pathAssignRoleToUser,
        headers,
        roles,
      );

      // response is null
      if (!response) {
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
          'response from Keycloak is null',
        );
      }

      this.logger.log(
        `Assign role [${role.name}] to user [${user.email}] successfully`,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Find user by email
   * @param email
   * @param token
   * @private
   */
  private async findUserByEmail(email: string, token) {
    try {
      this.logger.log(`Start find user by email [${email}]...`);
      const endpointFindUserByEmail = `/users?email=${email}`;
      const urlFindUserByEmail =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointFindUserByEmail;
      const headers: HttpHeaders = {
        token,
      };

      const response = await this.httpService.call<UserKc>(
        HttpMethod.GET,
        KEYCLOAK_SERVICE_URL,
        urlFindUserByEmail,
        headers,
      );

      if (!response) {
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
          'response from Keycloak is null',
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
   * Find role Keycloak by role name
   * @param roleName
   * @param token
   * @private
   */
  private async findRoleByName(roleName: string, token): Promise<RoleKC> {
    try {
      this.logger.log(`Start find role [${roleName}]...`);
      const endpointFindRoleByNameKC = `/roles/${roleName}`;
      const urlFindRoleByNameKC =
        KEYCLOAK_SERVICE_ADMIN_PATH_URI + endpointFindRoleByNameKC;
      const headers: HttpHeaders = {
        token,
      };

      const response = await this.httpService.call<RoleKC>(
        HttpMethod.GET,
        KEYCLOAK_SERVICE_URL,
        urlFindRoleByNameKC,
        headers,
      );

      // response from Keycloak is null
      if (!response) {
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
          'response from Keycloak is null',
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
   * get admin access by signing in admin account
   * @private
   * @return token
   */
  private async getAdminAccess() {
    this.logger.log('Start get admin access...');
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Pikachu123@';
    const userAdminSignIn: UserSignInDto = {
      email: adminEmail,
      password: adminPassword,
    };

    // sign in keycloak to get admin access
    const response = await this.signIn(userAdminSignIn);

    // response from Keycloak is null
    if (!response) {
      throw new ResourceException(
        ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
        ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
        'response from Keycloak is null',
      );
    }

    this.logger.log('Get admin access successfully.');
    this.logger.log('End get admin access.');
    return 'Bearer ' + response['access_token'];
  }
}
