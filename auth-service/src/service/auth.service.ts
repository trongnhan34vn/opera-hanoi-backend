import { Injectable } from '@nestjs/common';
import {
  HttpHeaders,
  HttpMethod,
  HttpServiceFactory,
  Log,
  LoggerFactory,
  HttpContentType,
} from 'common-lib';
import { UserSignIn } from '../interface/user.interface';
import {
  KeycloakRequest,
  KeycloakTokenResponse,
} from '../interface/keycloak.interface';
import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_PROVIDER_TOKEN_URI_PATH,
  KEYCLOAK_SERVICE_URL,
} from '../constants/KeycloakConsants';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpServiceFactory,
    private readonly logger: LoggerFactory,
  ) {}

  /**
   * sign in
   * Call sign in API of Keycloak
   * @param userLogin
   * @return KeycloakToken
   */
  @Log()
  async signIn(userLogin: UserSignIn): Promise<KeycloakTokenResponse> {
    // call api Keycloak and get response
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
}
