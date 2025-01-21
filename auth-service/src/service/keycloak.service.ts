import { Injectable } from '@nestjs/common';
import {
  ErrorMessage,
  HttpContentType,
  HttpHeaders,
  HttpMethod,
  HttpServiceFactory,
  LoggerFactory,
  ResourceError,
} from 'common-lib';
import { UserSignIn, UserSignUp } from '../interface/user.interface';
import {
  KeycloakRequest,
  KeycloakTokenResponse,
  UserKeycloakRegistry,
} from '../interface/keycloak.interface';
import {
  KEYCLOAK_ADMIN_URI,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
  KEYCLOAK_SERVICE_ADMIN_PATH_URI,
  KEYCLOAK_SERVICE_URL,
} from '../constants/KeycloakConsants';

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
  async signIn(userLogin: UserSignIn): Promise<KeycloakTokenResponse> {
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

      const response = await this.httpService.call(
        HttpMethod.POST,
        KEYCLOAK_SERVICE_URL,
        KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
        keycloakRequest,
        headers,
      );
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
  async signUp(userSignUp: UserSignUp) {
    // 1. get admin access. sign in with admin account by keycloak api
    const token = await this.getAdminAccess();

    // 2. create user with admin access by keycloak api
    const isCreatedUser = await this.createUser(userSignUp, token);
    return true;
  }

  private async createUser(userSignUp: UserSignUp, token: string) {
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
      const response = await this.httpService.call(
        HttpMethod.POST,
        KEYCLOAK_SERVICE_URL,
        createUserKeycloakUrl,
        userRegistry,
        headers,
      );
      // response is null
      if (!response) {
        throw new ResourceError(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode(),
          'response from Keycloak is null',
        );
      }

      this.logger.log('Created User with Keycloak successfully');
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('End created user with Keycloak.');
    }
  }

  private async getAdminAccess() {
    this.logger.log('Start get admin access...');
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Pikachu123@';
    const userAdminSignIn: UserSignIn = {
      email: adminEmail,
      password: adminPassword,
    };

    // sign in keycloak to get admin access
    const response = await this.signIn(userAdminSignIn);

    // response from Keycloak is null
    if (!response) {
      throw new ResourceError(
        ErrorMessage.INTERNAL_SERVER_ERROR.getCode(),
        'response from Keycloak is null',
      );
    }

    this.logger.log('Get admin access successfully.');
    this.logger.log('End get admin access.');
    return 'Bearer ' + response['access_token'];
  }
}
